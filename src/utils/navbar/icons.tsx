import * as nextUI from '@nextui-org/react';
import { FaDiscord as DiscordIcon, FaGithub as GithubIcon} from 'react-icons/fa';

export function Icons() {
	return (
		<nextUI.Grid.Container gap={2}>
			<nextUI.Grid>
				<nextUI.Link href='https://discord.gg/r28EPhaMSx' css={{color: '$text'}}>
					<DiscordIcon size={'1.5em'} />
				</nextUI.Link>
			</nextUI.Grid>
			<nextUI.Grid>
				<nextUI.Link href='https://github.com/inertia-unblocker/' css={{color: '$text'}}>
					<GithubIcon size={'1.5em'} />
				</nextUI.Link>
			</nextUI.Grid>
		</nextUI.Grid.Container>
	);
}