import * as nextUI from '@nextui-org/react';
import config from '@config';
import React from 'react';
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

	let tz = new Date().toLocaleTimeString('en-us', {timeZoneName:'short'}).split(' ')[2];
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
	const [loading, setLoading] = React.useState(true);
	const [data, setData] = React.useState('');

	const getData = async () => {
		let rawres = await fetch(config.analyticsDataServer);
		let json = await rawres.json();
		setData(JSON.stringify(json));
	};

	React.useEffect(() => {
		getData();
	});

	React.useEffect(() => {
		if (data.length > 0) setLoading(false);
	}, [data]);

	return (
		<nextUI.Card css={{display: 'inline-block', width: '40%', margin: '2em 0em 0em 1em', verticalAlign: 'top'}} hoverable bordered>
			<nextUI.Card.Header>
				<nextUI.Text css={{userSelect: 'none'}} h2>
					Analytics
				</nextUI.Text>
			</nextUI.Card.Header>
			
			<nextUI.Divider />

			<nextUI.Card.Body>
				{	
					loading ? (
						<nextUI.Loading />
					) : (
						<>
							<div>
								<nextUI.Table css={{width: '40em'}} bordered>
									<nextUI.Table.Header>
										{JSON.parse(data).columns_daily.map((column, index) => 
											<nextUI.Table.Column key={index+1}>{column.key}</nextUI.Table.Column>
										)}
									</nextUI.Table.Header>
									<nextUI.Table.Body>
										{JSON.parse(data).rows_daily.map((row) => 
											<nextUI.Table.Row key={row.key}>
												<nextUI.Table.Cell>{row.name}</nextUI.Table.Cell>
												<nextUI.Table.Cell>{row.value}</nextUI.Table.Cell>
											</nextUI.Table.Row>
										)}
									</nextUI.Table.Body>
								</nextUI.Table>
							</div>
							
							{(JSON.parse(data).rows_hourly.length > 0) ? (
								<div style={{marginTop: '1em'}}>
									<nextUI.Table css={{width: '40em'}} bordered>
										<nextUI.Table.Header>
											{JSON.parse(data).columns_hourly.map((column, index) => 
												<nextUI.Table.Column key={index+1}>{column.key}</nextUI.Table.Column>
											)}
										</nextUI.Table.Header>

										<nextUI.Table.Body items={JSON.parse(data).rows_hourly}>
											{JSON.parse(data).rows_hourly.map((row) => 
												<nextUI.Table.Row key={row.key}>
													<nextUI.Table.Cell>{row.time}</nextUI.Table.Cell>
													<nextUI.Table.Cell>{row.value}</nextUI.Table.Cell>
												</nextUI.Table.Row>
											)}
										</nextUI.Table.Body>
									</nextUI.Table>
								</div>
							) : (
								<></>
							)}
						</>
					)
				}
			</nextUI.Card.Body>
		</nextUI.Card>
	);
}