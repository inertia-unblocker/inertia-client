import * as nextUI from '@nextui-org/react';

import { MdAdd, MdArrowBack, MdClose, MdOutlineHome, MdRefresh } from 'react-icons/md';
import { isIframe, isInput } from '../../../utils/elemCheck';
import { useEffect, useState } from 'react';

import { agreeURL } from '@utils/agreeURL';
import { useCookies } from 'react-cookie';
import { xor } from './xor';

import browserStyles from '@css/browser.module.css';


export function InertiaBrowser() {
	const [cookie, _setCookies] = useCookies(['proxy', 'server', 'host']);
	const [input, setInput] = useState('');
	const [currentTab, setCurrentTab] = useState(0);
	const [over10Tabs, isOver10Tabs] = useState(false);
	const [_loading, setLoadingState] = useState(false);
	const [tabs, setTabs] = useState([
		{
			id: 0,
			prevUrl: 'https://google.com',
			url: 'https://google.com',
		}
	]);

	const getTabById = (id: number) => tabs.find((tab) => tab.id === id);

	function setLoading(load: boolean) {
		const loadingButton = document.getElementById('loading');
		const reloadButton = document.getElementById('reload');

		if (load) {
			loadingButton.style.display = 'block';
			reloadButton.style.display = 'none';
		} else {
			loadingButton.style.display = 'none';
			reloadButton.style.display = 'block';
		}

		setLoadingState(load);
	}

	function handleInput(e) {
		e.preventDefault();

		let tabsCopy = [...tabs];
		let prevUrl = tabsCopy[currentTab].url;
		let url = input;

		setLoading(true);
		url = agreeURL(url);

		tabsCopy[currentTab].url = url;
		tabsCopy[currentTab].prevUrl = prevUrl;

		setTabs(tabsCopy);
		setInput(url);
	}

	function handleTabSwitch(e, tabID) {
		const searchBar = document.getElementById('searchBar');
		const newTab = getTabById(tabID);

		if (isInput(searchBar)) searchBar.value = newTab.url;

		// check if the viewport of the new tab is loaded
		let vport = document.getElementById(`viewport${tabID}`);
		if (isIframe(vport)) {
			if (vport.contentDocument.readyState === 'complete') {
				setLoading(false);
			} else {
				setLoading(true);
			}
		}

		setCurrentTab(tabID);
		e.preventDefault();
	}

	function reloadPage(e) {
		e.preventDefault();
		const vport = document.getElementById(`viewport${currentTab}`);
		setLoading(true);

		if (isIframe(vport)) vport.src = vport.src;
	}

	function goBack(e) {
		e.preventDefault();
		setLoading(true);

		let tabsCopy = [...tabs];
		[tabsCopy[currentTab].url, tabsCopy[currentTab].prevUrl] = [tabsCopy[currentTab].prevUrl, tabsCopy[currentTab].url];
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

		if (tabs.length > 10) {
			isOver10Tabs(true);
		} else {
			setLoading(true);
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

	const protocol = cookie.host.includes('localhost') ? 'http' : 'https';
	const closeOver10Tabs = () => isOver10Tabs(false);
	const goToMainPage = () => window.location.href = `${protocol}://${cookie.host}`;

	// Spacing between x-button and tab text
	useEffect(() => {
		const tabs = [...document.querySelectorAll('.tabText')].map(elem => elem.parentElement);

		for (let i of tabs) {
			i.style.justifyContent = 'space-between';
		}
	});

	// Handle many things
	useEffect(() => {
		const searchBar = document.getElementById('searchBar');

		for (let i of tabs) {
			let id = i.id;
			const vport = document.getElementById(`viewport${id}`);
			const tab = document.getElementById(`tabText${id}`);

			if (isIframe(vport)) {
				vport.addEventListener('load', () => {
					let currentURL = new xor().decode(vport.contentWindow.location.href.split('/ultraviolet/')[1]);

					if (i.url != currentURL) {
						i.prevUrl = [...i.url].join('');
						i.url = currentURL;
					}

					if (isInput(searchBar)) searchBar.value = i.url;
					tab.innerHTML = vport.contentWindow.document.title;
					setLoading(false);

					vport.contentWindow.addEventListener('beforeunload', () => {
						setLoading(true);
						tab.innerHTML = 'Loading...';
					});
				});
			}
		}
	});

	// when the reload button disappears
	useEffect(() => {
		const loadingCircle = document.getElementById('loading');
		const reloadButton = document.getElementById('reload');

		if (loadingCircle.style.display == 'none' && reloadButton.style.display == 'none') {
			reloadButton.style.display = 'inline-block';
		}
	});

	// when the styles of the add tab button go away
	useEffect(() => {
		const addTab = document.getElementById('placeholderChildElem').parentElement;

		function removeNextUI(elem) {

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
				const callerElem = document.getElementById('placeholderChildElem').parentElement;

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
				const callerElem = document.getElementById('placeholderChildElem').parentElement;

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

	const SvgBtn = ({ ...props }) => (
		<button
			className={browserStyles.hoverableBtn}

			style={{
				display: 'inline-block',
				width: '3rem',
				height: '3rem',
				minWidth: '3rem',
				borderRadius: '3px',
				border: 'none'
			}}
			{...props}
		/>
	);

	const AddBtn = ({ ...props }) => (
		<SvgBtn onClick={addTab} {...props}>
			<MdAdd size={'1.25em'} style={{ minHeight: '1.25em', minWidth: '1.25em', position: 'absolute', marginTop: '-.625rem', marginLeft: '-.625rem' }} />
			<div id='placeholderChildElem' />
		</SvgBtn>
	);

	const HomeBtn = ({ ...props }) => (
		<SvgBtn onClick={goToMainPage} {...props}>
			<MdOutlineHome size={'1.25rem'} style={{ minHeight: '1.25rem', minWidth: '1.25rem', position: 'absolute', marginTop: '-.625rem', marginLeft: '-.625rem' }} />
		</SvgBtn>
	);

	const BackBtn = ({ ...props }) => (
		<SvgBtn onClick={goBack} {...props}>
			<MdArrowBack size={'1.25rem'} style={{ minHeight: '1.25rem', minWidth: '1.25rem', position: 'absolute', marginTop: '-.625rem', marginLeft: '-.625rem' }} />
		</SvgBtn>
	);

	const ReloadBtn = ({ ...props }) => (
		<SvgBtn onClick={reloadPage} {...props}>
			<MdRefresh size={'1.25rem'} style={{ minHeight: '1.25rem', minWidth: '1.25rem', position: 'absolute', marginTop: '-.625rem', marginLeft: '-.625rem' }} />
		</SvgBtn>
	);

	return (
		<>
			<nextUI.Card css={{ width: '100%', height: '10rem', overflow: 'hidden', borderRadius: '0px' }} variant='flat'>
				<nextUI.Card.Header css={{ width: '100%', display: 'inline-block' }}>
					<div style={{ width: '100%', alignSelf: 'flex-start', display: 'inline-block' }}>
						<div style={{ float: 'left', display: 'flex', width: '100%' }}>
							{tabs.map((tab, index, array) => (
								<nextUI.Button key={index} bordered={currentTab == tab.id ? false : true} className={currentTab == tab.id ? '' : browserStyles.hoverableTab} css={{ display: 'inline-block', marginRight: '1rem', maxWidth: '17rem', width: `calc(100% / ${array.length})`, height: '3rem', borderRadius: '3px', backgroundColor: `${currentTab == tab.id ? 'auto' : 'transparent'}`, minWidth: '0rem' }} id={`tab${index}`} onClick={(e) => handleTabSwitch(e, tab.id)}>
									<div className='tabText' id={`tabText${index}`} style={{ marginLeft: '1.5%', float: 'left', overflow: 'hidden', color: '#fff' }}>Loading...</div>
									<nextUI.Button key={index} css={{ width: '2rem', float: 'right', height: '2rem', minWidth: '2rem', backgroundColor: 'transparent' }} icon={<MdClose size={'1.25rem'} />} onClick={(e) => closeTab(e, tab.id)} />
								</nextUI.Button>
							))}
							<AddBtn id='addTab'></AddBtn>
						</div>
					</div>
				</nextUI.Card.Header>

				<nextUI.Divider />

				<nextUI.Card.Body css={{ width: '100%', display: 'inline-block', overflow: 'hidden' }}>
					<div style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }} >

						<HomeBtn id='helpBtn' />
						<BackBtn id='backBtn' />

						<nextUI.Loading color='secondary' css={{ width: '2rem', display: 'inline-block', marginLeft: '1rem' }} id='loading' />
						<ReloadBtn id='reload' style={{ display: 'none', width: '3rem', height: '3rem', minWidth: '3rem', borderRadius: '3px', border: 'none' }} />

						<form onSubmit={handleInput} style={{ width: '94%', marginRight: '1rem', marginLeft: '1rem' }} >
							<nextUI.Input css={{ width: '100%' }} id='searchBar' onChange={(e) => setInput(e.target.value)} placeholder='Search Google or Enter URL' bordered />
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
							allow-top-navigation-by-user-activation' src={`${protocol}://${cookie.host}/ultraviolet/${new xor().encode(tab.url)}`} style={{ display: `${currentTab == index ? 'block' : 'none'}` }} />
					</>
				))}
			</div>

			<nextUI.Modal onClose={closeOver10Tabs} open={over10Tabs} closeButton>
				<nextUI.Modal.Header>
					<nextUI.Text h4>Oops, too many tabs!</nextUI.Text>
				</nextUI.Modal.Header>
				<nextUI.Modal.Body>
					<nextUI.Text>We limit the maximum amount of tabs to 10 because of performance issues. We apologise for the inconvenience.</nextUI.Text>
				</nextUI.Modal.Body>
			</nextUI.Modal>
		</>
	);
}