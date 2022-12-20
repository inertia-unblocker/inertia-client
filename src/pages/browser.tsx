/* eslint-disable @next/next/no-img-element */
import { FormEvent, useEffect, useState } from 'react';

import { Card, FormElement, Input, Loading, Text } from '@nextui-org/react';
import { MdArrowBack, MdHome, MdMenu, MdRefresh } from 'react-icons/md';

import { Tab, TabManager, TabType } from '@browser';
import { Button } from '@components/button';
import { client } from '@utils/checks';
import { xor } from '@utils/proxy';

import styles from '@css/browser.module.css';


function InertiaBrowser() {
	const [tabs, setTabs] = useState<TabType[]>([]);
	const tabman = new TabManager(tabs, setTabs);

	const withIFrame = (id: string, cb: (el: HTMLIFrameElement, ...args: any[]) => void) => {
		return (...args: any[]) => {
			const el = document.getElementById(id) as HTMLIFrameElement;

			if (el) cb(el, ...args);
		};
	};

	const clientOnly = (cb: (...args: any[]) => void) => {
		return (...args: any[]) => {
			if (client) cb(...args);
		};
	};

	// event listeners!

	/**
	 * Update the shown tab's title, icon, and loading state onload
	 */
	useEffect(() => {
		withIFrame(`vport-${tabman.shown}`, (vport) => {
			vport.onload = () => {
				tabman.update(parseFloat(vport.id.split('-')[1]), {
					title: vport.contentDocument?.title ?? 'Untitled',
					icon: vport.contentDocument?.querySelector('link[rel="icon"]')?.getAttribute('href') ?? '/default-fav.svg',
					loading: false
				});
			};
		})();
	});

	/**
	 * Update the shown tab's title, icon, and loading state
	 * when the reload button is clicked
	 */
	const onReload = clientOnly(
		withIFrame(`vport-${tabman.shown}`, (vport) => {
			tabman.update(tabman.shown ?? 0, {
				loading: true
			});

			vport.contentWindow?.location.reload();
		})
	);

	/**
	 * vport management on tab add
	 */
	tabman.on('added', clientOnly((tab) => {
		const vports = [...document.querySelectorAll('.vport') as NodeListOf<HTMLIFrameElement>];

		vports.forEach((vport) => {
			vport.style.display = 'none';
		});

		withIFrame(`vport-${tab.id}`, (vport) => {
			vport.style.display = 'block';
			vport.src = tab.url;
		})();
	}));

	/**
	 * vport management on tab set active
	 */
	tabman.on('shown', clientOnly((id) => {
		const vports = [...document.querySelectorAll('.vport') as NodeListOf<HTMLIFrameElement>];

		vports.forEach((vport) => {
			vport.style.display = 'none';
		});

		withIFrame(`vport-${id}`, (vport) => {
			vport.style.display = 'block';
		})();
	}));

	/**
	 * go back
	 */
	const onGoBack = () => {
		tabman.rollback(tabman.shown ?? 0);
	};

	/**
	 * input submit
	 */
	const onInputSubmit = (e: FormEvent<FormElement>) => {
		tabman.update(tabman.shown ?? 0, {
			url: e.currentTarget.value
		});
	};

	return (
		<>
			<title>Inertia Browser</title>
			<Card css={{ borderRadius: 0, padding: 0 }}>
				<Card.Body css={{ display: 'flex', flexDirection: 'row', padding: '.75rem', height: '3.5rem', alignItems: 'center' }}>
					{tabs.map((tab, i) => (
						<Tab key={i} manager={tabman} tab={tab} />
					))}
					<Button onClick={(e) => {
						tabman.add('https://google.com/');
					}} style={{
						width: '1.25rem',
						height: '1.25rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}} type='transparent'>
						<Text css={{ lineHeight: 'normal' }} size='$md'>+</Text>
					</Button>
				</Card.Body>

				<Card.Divider />

				<Card.Footer css={{
					height: '2.75rem'
				}}>
					<Button onClick={onGoBack} style={{
						width: '1.25rem',
						height: '1.25rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}} type='transparent'>
						<MdArrowBack />
					</Button>

					{
						tabman.get(tabman.shown ?? 0)?.loading ? (
							<Loading css={{
								marginLeft: '.75rem'
							}} size='xs' />
						) : (
							<Button onClick={onReload} style={{
								width: '1.25rem',
								height: '1.25rem',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginLeft: '.5rem'
							}} type='transparent'>
								<MdRefresh />
							</Button>
						)
					}

					<Button style={{
						width: '1.25rem',
						height: '1.25rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginLeft: '.5rem'
					}} type='transparent'>
						<MdHome />
					</Button>

					<Input css={{
						width: '100%',
						marginLeft: '1rem'
					}} initialValue={
						tabman.get(tabman.shown ?? 0)?.url ?? ''
					} onSubmit={onInputSubmit} placeholder='Search with Google or enter address' size='xs' bordered />

					<Button style={{
						width: '1.25rem',
						height: '1.25rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginLeft: '.75rem'
					}} type='transparent'>
						<MdMenu />
					</Button>
				</Card.Footer>
			</Card>

			{tabs.map((tab, i) => (
				<iframe key={i} className='vport' id={`vport-${tab.id}`} src={`/ultraviolet/${xor.encode(tab.url)}`} style={{
					width: '100%',
					height: 'calc(100vh - 3.85rem)',
					border: 'none',
				}}></iframe>
			))}
		</>
	);
}

export default InertiaBrowser;