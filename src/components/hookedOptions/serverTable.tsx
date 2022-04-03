import config from '@config';
import * as nextUI from '@nextui-org/react';
import { useCookies } from 'react-cookie';

export const ServerTable: React.FC<Partial<nextUI.TableProps>> = ({ ...props }) => {
	const [cookie, setCookie] = useCookies();

	const handleServerChange = (server: string) => {
		if (server == 'all' || isNaN(parseInt(server))) {
			setCookie('server', 1);
		} else {
			setCookie('server', server);
		}
	};

	let tablecolor: string & ('primary' | 'secondary' | 'success' | 'warning' | 'error' ) = 'primary';
	if (cookie.proxy == 'ultraviolet') tablecolor = 'secondary';
	if (cookie.proxy == 'corrosion') tablecolor = 'success';
	if (cookie.proxy == 'alloy') tablecolor = 'warning';

	return (
		<nextUI.Table selectionMode='multiple' selectedKeys={cookie.server.toString()} onSelectionChange={(e) => handleServerChange(e.toString())} color={tablecolor} {...props}>
			<nextUI.Table.Header>
				<nextUI.Table.Column>Server ID</nextUI.Table.Column>
				<nextUI.Table.Column>Status</nextUI.Table.Column>
				<nextUI.Table.Column>Hoster</nextUI.Table.Column>
				<nextUI.Table.Column>URL</nextUI.Table.Column>
			</nextUI.Table.Header>
			<nextUI.Table.Body key="1">
				{config.servers[cookie.proxy].map((server, index) => 
					<nextUI.Table.Row key={(index+1).toString()}>
						<nextUI.Table.Cell>{server.id}</nextUI.Table.Cell>
						<nextUI.Table.Cell>{server.status}</nextUI.Table.Cell>
						<nextUI.Table.Cell>{server.hoster}</nextUI.Table.Cell>
						<nextUI.Table.Cell>{server.url}</nextUI.Table.Cell>
					</nextUI.Table.Row>
				)}
			</nextUI.Table.Body>
		</nextUI.Table>
	);
};