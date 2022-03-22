import * as nextUI from '@nextui-org/react';
import axios from 'axios';
import config from '@config';
import { useState, useEffect, useRef } from 'react';
import timezones from '@utils/datetime/timezones.json';

function isDST() {
	const today = new Date();
	let jan = new Date(today.getFullYear(), 0, 1);
	let jul = new Date(today.getFullYear(), 6, 1);
	let offset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	
	return today.getTimezoneOffset() < offset;
}

function convertTimeToTimeZone(time) {
	time = time.split(':');
	let hr = time[0];
	let mi = time[1];
	let sc = time[2];

	let tz = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2];
	let offset = 0;
	let offsetMin = 0;

	for (let i=0; i<timezones.length; i++) {
		if (timezones[i].abbr == tz) {
			offset = timezones[i].offset;
			break;
		}
	}

	if (offset.toString().endsWith('.5')) offsetMin = 30;
	if (offset.toString().endsWith('.75') /* *cough* NEPAL *cough* */) offsetMin = 45;
	Math.floor(offset);

	if (offset < 0) {
		hr = parseInt(hr);
		hr = hr + offset;

		mi = parseInt(mi);
		mi = mi - offsetMin;

		if (mi < 0) {
			mi = 60 + mi;
			hr = hr - 1;
		}
		
		if (hr < 0) {
			hr = hr + 24;
		}
	} else {
		hr = parseInt(hr);
		hr = hr + offset;

		mi = parseInt(mi);
		mi = mi + offsetMin;

		if (mi >= 60) {
			mi = mi - 60;
			hr = hr + 1;
		}

		if (hr >= 24) {
			hr = hr - 24;
		}
	}

	hr = hr.toString();
	mi = mi.toString();
	sc = sc.toString();

	if (hr.length == 1) hr = '0' + hr;
	if (mi.length == 1) mi = '0' + mi;
	if (sc.length == 1) sc = '0' + sc;

	let ap = '';
	if (hr > 12) {
		ap = ' PM';
		hr = hr - 12;
	} else if (hr < 12) {
		ap = ' AM';
	} else {
		ap = ' PM';
	}

	return `${hr}:${mi}${ap}`;
}

export function Analytics() {
	const [dataLoading, setDataLoading] = useState(true);
	const [analyticsData, setAnalyticsData] = useState('');

	useEffect(() => {
		const now = new Date();

		axios.post('/api/auth/login', {
			username: config.umamiUsername, 
			password: config.umamiPassword,
		}).then((res) => {
			let token = res.data.token;
			let statsParams: any = {
				start_at: new Date(now.toString().substring(0, 10)),
				end_at: now,
			};
			let pageviewsParams: any = {
				start_at: new Date(now.toString().substring(0, 10)),
				end_at: now,
				unit: 'hour',
				tz: 'America/New_York',
			};

			axios.defaults.headers.common['Authorization'] = `Bearer: ${token}`;

			axios.get('/api/websites') .then((res) => {
				let inertia_id = res.data.filter((ws) => ws.name.toLowerCase() == 'inertia')[0].website_id;


				axios.get(`/api/website/${inertia_id}/stats`, statsParams).then((res) => {
					let stats = res.data;


					axios.get(`/api/website/${inertia_id}/pageviews`, pageviewsParams).then((res) => {
						let pageviews = res.data;

						let data = {
							stats: stats,
							pageviews: pageviews
						};

						setAnalyticsData(JSON.stringify(data));
					}).catch((e) => {
						console.log(e);
					});
				}).catch((e) => {
					console.log(e);
				});
			}).catch((e) => {
				console.log(e);
			});
		}).catch((e) => {
			console.log(e);
		});
	}, []);

	useEffect(() => {
		if (analyticsData.length != 0) {
			setDataLoading(false);
		}
	}, [analyticsData]);



	let analyticsJSON: any = {
		stats: {
			bounces: <nextUI.Loading size="sm">Analytics Service (might) be down!</nextUI.Loading>,
			pageviews: <nextUI.Loading size="sm">Analytics Service (might) be down!</nextUI.Loading>,
			totaltime: <nextUI.Loading size="sm">Analytics Service (might) be down!</nextUI.Loading>,
			uniques: <nextUI.Loading size="sm">Analytics Service (might) be down!</nextUI.Loading>
		},
		pageviews: {
			sessions: [
				{t: '2022-03-22 5:00:00', y: <nextUI.Loading size="sm">Analytics Service (might) be down!</nextUI.Loading>}
			]
		}
	};
	if (!dataLoading) {
		analyticsJSON = analyticsData;
		analyticsJSON = JSON.parse(analyticsJSON);
	}

	let columns_daily = [
		{
			key: 'name',
			label: 'Today',
		},
		{
			key: 'value',
			label: '',
		}
	];
	let rows_daily = [
		{
			key: '1',
			name: 'Bounces',
			value: analyticsJSON.stats.bounces,
		},
		{
			key: '2',
			name: 'Pageviews',
			value: analyticsJSON.stats.pageviews,
		},
		{
			key: '3',
			name: 'Total Time',
			value: analyticsJSON.stats.totaltime,
		},
		{
			key: '4',
			name: 'Visitors',
			value: analyticsJSON.stats.uniques,
		}
	];

	let columns_hourly = [
		{
			key: 'time',
			label: 'Hourly',
		},
		{
			key: 'value',
			label: '',
		}
	];
	let rows_hourly = [
		
	];

	for (let i=0; i<analyticsJSON.pageviews.sessions.length; i++) {
		let arrayDate: any = convertTimeToTimeZone(analyticsJSON.pageviews.sessions[i].t.split(' ')[1]);
		let arrayValue = analyticsJSON.pageviews.sessions[i].y;

		rows_hourly.push({
			key: `${i+1}`,
			time: `${arrayDate}`,
			value: arrayValue,
		});
	}
	

	return (
		<nextUI.Card css={{display: 'inline-block', width: '45em', margin: '2em 0em 0em 1em', verticalAlign: 'top'}} hoverable bordered>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Analytics
				</nextUI.Text>
			</nextUI.Card.Header>
			
			<nextUI.Divider />

			<nextUI.Card.Body>
				<div>
					<nextUI.Table css={{width: '40em', height: '5em'}} bordered>
						<nextUI.Table.Header columns={columns_daily}>
							{(column) => (
								<nextUI.Table.Column key={column.key}>{column.label}</nextUI.Table.Column>
							)}
						</nextUI.Table.Header>
						<nextUI.Table.Body items={rows_daily}>
							{(item) => (
								<nextUI.Table.Row key={item.key}>
									{(columnKey) => <nextUI.Table.Cell>{item[columnKey]}</nextUI.Table.Cell>}
								</nextUI.Table.Row>
							)}
						</nextUI.Table.Body>
					</nextUI.Table>
				</div>

				<div style={{marginTop: '1em'}}>
					<nextUI.Table css={{width: '40em', height: '5em'}} bordered>
						<nextUI.Table.Header columns={columns_hourly}>
							{(column) => (
								<nextUI.Table.Column key={column.key}>{column.label}</nextUI.Table.Column>
							)}
						</nextUI.Table.Header>

						<nextUI.Table.Body items={rows_hourly}>
							{(item) => (
								<nextUI.Table.Row key={item.key}>
									{(columnKey) => <nextUI.Table.Cell>{item[columnKey]}</nextUI.Table.Cell>}
								</nextUI.Table.Row>
							)}
						</nextUI.Table.Body>
					</nextUI.Table>
				</div>
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}