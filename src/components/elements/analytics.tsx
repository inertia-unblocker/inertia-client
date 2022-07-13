import * as nextUI from '@nextui-org/react';
import config from '@config';
import React from 'react';

export function Analytics() {
	const [loading, setLoading] = React.useState(true);
	const [data, setData] = React.useState('');

	const getData = async () => {
		let tz = new Intl.DateTimeFormat().resolvedOptions().timeZone;
		let rawres: any = '';
		try { rawres = await fetch(`${config.analyticsDataServer}?tz=${tz}`); } catch {
			setData(JSON.stringify({
				columns_daily: [
					{
						key: 'name',
						label: 'Today',
					},
					{
						key: 'value',
						label: '',
					}
				],
				rows_daily: [
					{
						key: '1',
						name: 'Error',
						value: 'Could not fetch data',
					},
				],
				columns_hourly: [
					{
						key: 'time',
						label: 'Hourly',
					},
					{
						key: 'value',
						label: '',
					}
				],
				rows_hourly: [
					{
						key: '1',
						time: 'Error',
						value: 'Could not fetch data',
					}
				]
			}));

			return;
		}
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
		<nextUI.Card css={{ margin: '2% 0% 0% 1%', verticalAlign: 'top', order: '4', width: '58%' }} variant='bordered' isHoverable>
			<nextUI.Card.Header>
				<nextUI.Text css={{ userSelect: 'none' }} h2>
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
								<nextUI.Table css={{ width: '40em' }} bordered>
									<nextUI.Table.Header>
										{JSON.parse(data).columns_daily.map((column, index) =>
											<nextUI.Table.Column key={index + 1}>{column.label}</nextUI.Table.Column>
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
								<div style={{ marginTop: '1em' }}>
									<nextUI.Table css={{ width: '40em' }} bordered>
										<nextUI.Table.Header>
											{JSON.parse(data).columns_hourly.map((column, index) =>
												<nextUI.Table.Column key={index + 1}>{column.label}</nextUI.Table.Column>
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