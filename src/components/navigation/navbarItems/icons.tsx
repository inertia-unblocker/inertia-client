import * as nextUI from '@nextui-org/react';
import { FaDiscord as DiscordIcon, FaGithub as GithubIcon } from 'react-icons/fa';
import { ThemeSwitch } from '../../theme/themeSwitch';

export function Icons({ hasThemeSwitch = false, size = 1.5, ...props }) {
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
		</nextUI.Grid.Container>
	);
}