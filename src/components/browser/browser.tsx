import * as nextUI from '@nextui-org/react';
import browserStyles from '@css/browser.module.css';
import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from 'react';
import { MdAdd, MdArrowBack, MdClose, MdHelp, MdRefresh } from 'react-icons/md';

export function InertiaBrowser() {
	const [cookie, _setCookies] = useCookies(['proxy', 'server']);
	const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement => input !== null && input.tagName === 'IFRAME';
	const serverUrl = 'http://localhost:5000';

	const [input, setInput] = useState('');
	const [currentTab, setCurrentTab] = useState(0);

	const [over10Tabs, isOver10Tabs] = useState(false);
	const [addWhenLoading, isAddWhenLoading] = useState(false);
	const [help, isHelp] = useState(false);

	const [tabs, setTabs] = useState([
		{
			id: 0,
			prevUrl: 'https://google.com',
			url: 'https://google.com',
		}
	]);

	function loading(is) {
		const loading = document.getElementById('loading');
		const reloadButton = document.getElementById('reload');

		if (is) {
			loading.style.display = 'inline-block';
			reloadButton.style.display = 'none';
		} else {
			loading.style.display = 'none';
			reloadButton.style.display = 'inline-block';
		}
	}

	function checkLoading() {
		const loading = document.getElementById('loading');

		if (loading.style.display === 'inline-block') return true;

		return false;
	}

	function handleInput(e) {
		e.preventDefault();

		let tabsCopy = [...tabs];
		let prevUrl = tabsCopy[currentTab].url;
		let url = input;

		loading(true);
		url = Agree(url);

		tabsCopy[currentTab].url = url;
		tabsCopy[currentTab].prevUrl = prevUrl;

		setTabs(tabsCopy);
		setInput(url);
	}

	function handleTabSwitch(e, tab) {
		setCurrentTab(tab);
		e.preventDefault();
	}

	function reloadPage(e) {
		e.preventDefault();
		const vport = document.getElementById(`viewport${currentTab}`);
		loading(true);

		if (isIFrame(vport)) vport.src = vport.src;
	}

	function goBack(e) {
		e.preventDefault();

		let tabsCopy = [...tabs];
		let prevUrl = tabsCopy[currentTab].prevUrl;
		let url = tabsCopy[currentTab].url;

		loading(true);

		tabsCopy[currentTab].url = prevUrl;
		tabsCopy[currentTab].prevUrl = url;

		setTabs(tabsCopy);
	}

	function addTab(e) {
		e.preventDefault();

		let tabsCopy = [...tabs];
		tabsCopy.push({
			id: tabsCopy.length,
			prevUrl: 'https://google.com',
			url: 'https://google.com',
		});

		if (checkLoading()) {
			isAddWhenLoading(true);
		} else if (tabs.length > 10) {
			isOver10Tabs(true);
		} else {
			loading(true);
			setTabs(tabsCopy);
			setCurrentTab(tabsCopy.length - 1);
		}
	}

	function closeTab(e, tab) {
		e.preventDefault();

		if (tab == currentTab && tabs.length > 1) {
			setCurrentTab(1);
		}

		let tabsCopy = [...tabs];

		let tabIndex = tabsCopy.findIndex(tabData => tabData.id == tab);
		tabsCopy.splice(tabIndex, 1);

		tabsCopy = tabsCopy.map((tabData, index) => {
			tabData.id = index;
			return tabData;
		});

		if (tabsCopy.length > 0) {
			handleTabSwitch(e, 0);
		} else {
			tabsCopy.push({
				id: tabsCopy.length,
				prevUrl: 'https://google.com',
				url: 'https://google.com',
			});
		}

		setTabs(tabsCopy);
	}

	const closeOver10Tabs = () => isOver10Tabs(false);
	const closeAddWhenLoading = () => isAddWhenLoading(false);
	const closeHelp = () => isHelp(false);


	// handle tab titles
	useEffect(() => {
		const vports = [...document.querySelectorAll('[name="viewport"]')];
		const titleVport = document.getElementById('titleViewport');

		function setTitle(id, titleGrabber) {
			const tabText = document.getElementById(`tabText${id}`);
			const url = tabs[id].url;
			const controller = new AbortController();
			const { signal } = controller;

			if (isIFrame(titleGrabber)) {
				titleGrabber.src = `${serverUrl}/getTitle.html?url=${url}&front=${new URL(window.location.href).origin}`;

				titleGrabber.addEventListener('load', () => {
					if (titleGrabber.contentDocument) {
						let title = titleGrabber.contentDocument.title;
						tabText.innerHTML = title;
						loading(false);
						controller.abort();
					}
				}, { signal });
			}
		}

		for (let i of vports) {
			i.addEventListener('load', () => {
				setTitle(parseInt(i.id.replace('viewport', '')), titleVport);
			}, { once: true });
		}
	});

	// handle preload styles
	useEffect(() => {
		const addTab = document.getElementById('addBtnSubElem').parentElement;

		function removeNextUI(elem: HTMLElement) {

			let badClasses = [...elem.classList].filter(className => className.includes('nextui'));
			badClasses.forEach(className => elem.classList.remove(className));

			elem.style.display = 'inline-block';
			elem.style.width = '3em';
			elem.style.height = '3em';
			elem.style.minWidth = '3em';
			elem.style.border = 'none';
			elem.style.borderRadius = '3px';
			elem.style.backgroundColor = 'transparent';

			const addBg = () => {
				const callerElem = document.getElementById('addBtnSubElem').parentElement;

				if (callerElem.id != 'addTab') {
					elem.style.transition = 'all .3s ease';
					callerElem.style.backgroundColor = '#282828';
				} else {
					callerElem.style.removeProperty('background-color');
					callerElem.style.removeProperty('transition');
					callerElem.removeEventListener('mouseover', this);
				}
			};

			const rmBg = () => {
				const callerElem = document.getElementById('addBtnSubElem').parentElement;

				if (callerElem.id != 'addTab') {
					elem.style.transition = 'all .3s ease';
					callerElem.style.backgroundColor = 'transparent';
				} else {
					callerElem.style.removeProperty('background-color');
					callerElem.style.removeProperty('transition');
					callerElem.removeEventListener('mouseout', this);
				}
			};


			elem.addEventListener('mouseover', addBg);
			elem.addEventListener('mouseout', rmBg);
		}

		if (addTab) {
			removeNextUI(addTab);
		} else {
			window.addEventListener('load', () => {
				removeNextUI(addTab);
			});
		}
	});

	// make space between tab title and close button
	useEffect(() => {
		const tabs = [...document.querySelectorAll('.tabText')].map(elem => elem.parentElement);

		for (let i of tabs) {
			i.style.justifyContent = 'space-between';
		}
	});

	// handle text length
	useEffect(() => {
		let tabNames = [...document.querySelectorAll<HTMLElement>('.tabText')];

		for (let i of tabNames) {
			i.style.overflow = 'hidden';
		}
	});

	// handle the strange bug
	useEffect(() => {
		const vport0 = document.getElementById('viewport0');

		if (isIFrame(vport0)) {
			if (currentTab > tabs.length - 1) {
				setCurrentTab(0);
			}
		}
	}, [setCurrentTab, currentTab, tabs]);

	const AddBtn = ({ ...props }) => {
		return (
			<button
				className={browserStyles.hoverableTab}

				onClick={addTab}
				style={{
					display: 'inline-block',
					width: '3em',
					height: '3em',
					minWidth: '3em',
					border: 'none',
					borderRadius: '3px',
				}}
				{...props}
			>
				<div id='addBtnSubElem' style={{ padding: '3px 0px 0px 1px' }} >
					<MdAdd size={'1.25em'} style={{ minHeight: '1.25em', minWidth: '1.25em' }} />
				</div>
			</button>
		);
	};

	const HelpBtn = ({ ...props }) => {
		return (
			<button
				className={browserStyles.hoverableTab}

				style={{
					display: 'inline-block',
					width: '3em',
					height: '3em',
					minWidth: '3em',
					border: 'none',
					borderRadius: '3px',
					float: 'right'
				}}
				{...props}
			>
				<div id='addBtnSubElem' style={{ padding: '3px 0px 0px 1px' }} >
					<MdHelp size={'1.25em'} style={{ minHeight: '1.25em', minWidth: '1.25em' }} />
				</div>
			</button>
		);
	};

	return (
		<>
			<nextUI.Card css={{ width: '100%', height: '15%', overflow: 'hidden', borderRadius: '0px' }} >
				<nextUI.Card.Header css={{ width: '100%', display: 'inline-block' }}>
					<div style={{ width: '100%', alignSelf: 'flex-start', display: 'inline-block' }}>
						<div style={{ float: 'left', display: 'flex', width: '100%' }}>
							{tabs.map((tab, index, array) => (
								<nextUI.Button key={index} className={currentTab == tab.id ? '' : browserStyles.hoverableTab} css={{ display: 'inline-block', marginRight: '1em', maxWidth: '17em', width: `calc(100% / ${array.length})`, height: '3em', borderRadius: '3px', backgroundColor: `${currentTab == tab.id ? 'auto' : 'transparent'}`, minWidth: '0em' }} id={`tab${index}`} onClick={(e) => handleTabSwitch(e, tab.id)}>
									<div className='tabText' id={`tabText${index}`} style={{ marginLeft: '1.5%', float: 'left' }}>Loading...</div>
									<nextUI.Button key={index} css={{ width: '2em', float: 'right', height: '2em', minWidth: '2em', backgroundColor: 'transparent' }} icon={<MdClose size={'1.25em'} />} onClick={(e) => closeTab(e, tab.id)} />
								</nextUI.Button>
							))}
							<AddBtn id={'addTab'} />
						</div>
					</div>
				</nextUI.Card.Header>

				<nextUI.Divider />

				<nextUI.Card.Body css={{ width: '100%', display: 'inline-block', overflow: 'hidden' }}>
					<div style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }} >

						<HelpBtn id={'helpBtn'} />
						<div style={{ width: '3em', height: '3em', alignItems: 'center', textAlign: 'center', marginRight: '1em', marginLeft: '1em' }}>
							<nextUI.Button className={browserStyles.hoverableTab} css={{ width: '100%', height: '100%', minWidth: '100%', backgroundColor: 'transparent', borderRadius: '3px' }} onClick={goBack}><MdArrowBack size={'1.25em'} style={{ minWidth: '1.25em' }} /></nextUI.Button>
						</div>

						<div style={{ width: '3em', height: '3em', alignItems: 'center', textAlign: 'center' }}>
							<nextUI.Loading color='secondary' css={{ width: '2em', display: 'inline-block', alignItems: 'center', textAlign: 'center', transform: 'translate(0%,25%)' }} id='loading' />
							<nextUI.Button className={browserStyles.hoverableTab} css={{ width: '100%', height: '100%', minWidth: '100%', backgroundColor: 'transparent', display: 'none', borderRadius: '3px' }} icon={<MdRefresh size={'1.25em'} />} id='reload' onClick={reloadPage} />
						</div>

						<form onSubmit={handleInput} style={{ width: '96%', marginLeft: '2em' }} >
							<nextUI.Input css={{ width: '100%' }} onChange={(e) => setInput(e.target.value)} placeholder='Search Google or Enter URL' bordered />
							<nextUI.Input css={{ display: 'none' }} type='submit' />
						</form>
					</div>
				</nextUI.Card.Body>
			</nextUI.Card>
			<div className={browserStyles.viewportContainer} style={{ width: '100%', height: '85%' }} >
				{tabs.map((tab, index) => (
					<>
						<iframe key={index} allow='fullscreen' className={browserStyles.viewport} id={`viewport${index}`} name='viewport' sandbox='allow-downloads-without-user-activation
							allow-downloads
							allow-forms
							allow-modals
							allow-orientation-lock
							allow-pointer-lock
							allow-popups
							allow-popups-to-escape-sandbox
							allow-presentation
							allow-same-origin
							allow-scripts
							allow-storage-access-by-user-activation
							allow-top-navigation
							allow-top-navigation-by-user-activation' src={`${serverUrl}?url=${tab.url}`}
							style={{ display: `${currentTab == index ? 'block' : 'none'}` }}>
						</iframe>
					</>
				))}

				<iframe id='titleViewport' style={{ display: 'none', width: '0px', height: '0px', visibility: 'hidden' }}></iframe>
			</div>

			<nextUI.Modal onClose={closeOver10Tabs} open={over10Tabs} closeButton>
				<nextUI.Modal.Header>
					<nextUI.Text h4>Oops, too many tabs!</nextUI.Text>
				</nextUI.Modal.Header>
				<nextUI.Modal.Body>
					<nextUI.Text>We limit the maximum amount of tabs to 10 because of scaling issues. We apologise for the inconvenience.</nextUI.Text>
				</nextUI.Modal.Body>
			</nextUI.Modal>

			<nextUI.Modal onClose={closeAddWhenLoading} open={addWhenLoading} closeButton>
				<nextUI.Modal.Header>
					<nextUI.Text h4>Please wait</nextUI.Text>
				</nextUI.Modal.Header>
				<nextUI.Modal.Body>
					<nextUI.Text>Please wait for the current tab to finish loading before opening a new one. We apologise for the inconvenience.</nextUI.Text>
				</nextUI.Modal.Body>
			</nextUI.Modal>

			<nextUI.Modal onClose={closeHelp} open={help} closeButton>
				<nextUI.Modal.Header>
					<nextUI.Text h4>Help and Info</nextUI.Text>
				</nextUI.Modal.Header>
				<nextUI.Modal.Body>
					<nextUI.Text>This is Inertia Browser, a browser PWA designed to be as functional as Chrome or Firefox while hiding your bowsing history</nextUI.Text>
				</nextUI.Modal.Body>
			</nextUI.Modal>
		</>
	);
}