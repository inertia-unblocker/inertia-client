import { Button, Card, Text } from '@nextui-org/react';
import { useTabs } from '@browser';

import styles from '@css/browser.module.css';

function InertiaBrowser() {
	const {
		getTab,
		addTab,
		removeTab,
		setTab,
		goBack,
		setActive,
		tabs
	} = useTabs();

	if (tabs.length == 0)
		addTab('https://google.com');

	return (
		<Card css={{ borderRadius: 0, padding: 0 }}>
			<Card.Body css={{ display: 'flex', flexDirection: 'row', padding: '.75rem' }}>
				{tabs.map((tab, i) => (
					<Card key={i} css={{
						background: '$primary',
						maxWidth: '15rem',
						height: '2rem',
						borderRadius: '.25rem',
						justifyContent: 'center',
					}} isPressable>
						<Text className={styles.tabTitle} size='$sm'>{tab.url}</Text>
					</Card>
				))}
			</Card.Body>
		</Card>
	);
}

export default InertiaBrowser;