import * as nextUI from '@nextui-org/react';
import { FaDiscord as DiscordIcon, FaGithub as GithubIcon} from 'react-icons/fa';

export function Icons() {
	return (
		<nextUI.Grid.Container gap={2}>
			<nextUI.Grid>
				<nextUI.Tooltip content='Discord'>
					<nextUI.Link css={{color: '$text'}} href='https://discord.gg/r28EPhaMSx'>
						<DiscordIcon size={'1.5em'} />
					</nextUI.Link>
				</nextUI.Tooltip>
			</nextUI.Grid>
			<nextUI.Grid>
				<nextUI.Tooltip content='GitHub'>
					<nextUI.Link css={{color: '$text'}} href='https://github.com/inertia-unblocker/'>
						<GithubIcon size={'1.5em'} />
					</nextUI.Link>
				</nextUI.Tooltip>
			</nextUI.Grid>
		</nextUI.Grid.Container>
	);
}