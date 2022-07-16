import * as nextUI from '@nextui-org/react';

import { FaDiscord as DiscordIcon, FaGithub as GithubIcon, FaServer as FaProxy } from 'react-icons/fa';
import { ThemeSwitch } from '../../theme/themeSwitch';
import { MProxy } from '@elements/mobileProxy'


interface IconProps extends nextUI.GridContainerProps {
	hasThemeSwitch?: boolean;
	hasProxySwitch?: boolean;
	size?: number;
}

export function Icons({ hasThemeSwitch = false, hasProxySwitch = false, size = 1.5, ...props }: IconProps) {
	return (
		<nextUI.Grid.Container gap={2} {...props}>
			<nextUI.Grid>
				<nextUI.Tooltip content='Discord'>
					<nextUI.Link css={{ color: '$text' }} href='https://discord.gg/r28EPhaMSx'>
						<DiscordIcon size={`${size}rem`} />
					</nextUI.Link>
				</nextUI.Tooltip>
			</nextUI.Grid>
			<nextUI.Grid>
				<nextUI.Tooltip content='GitHub'>
					<nextUI.Link css={{ color: '$text' }} href='https://github.com/inertia-unblocker/'>
						<GithubIcon size={`${size}rem`} />
					</nextUI.Link>
				</nextUI.Tooltip>
			</nextUI.Grid>
			{
				hasThemeSwitch ? (
					<nextUI.Grid css={{ marginLeft: '-.3rem' }} >
						<nextUI.Tooltip content='Theme'>
							<nextUI.Link css={{ color: '$text' }} >
								<ThemeSwitch size={size} iconOnly />
							</nextUI.Link>
						</nextUI.Tooltip>
					</nextUI.Grid>
				) : null
			}
			{
				hasProxySwitch ? (
					<nextUI.Grid>
						<nextUI.Tooltip content='Proxy Settings'>
							<MProxy />
						</nextUI.Tooltip>
					</nextUI.Grid>
				) : null
			}
		</nextUI.Grid.Container>
	);
}