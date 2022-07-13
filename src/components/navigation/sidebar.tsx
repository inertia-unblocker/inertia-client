import * as nextUI from '@nextui-org/react';
import config from '@config';
import { useRouter } from 'next/router';
import { pagesFS } from './sidebarItems/pagesFS';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';

export function Sidebar({ ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	const currentPage: string = useRouter().pathname;

	useEffect(() => {
		const sideBar = [...document.querySelectorAll('.pageLink')].map(e => e.parentElement)[0];
		console.log(sideBar);

		if (sideBar) {
			console.log('navBar', sideBar);
			sideBar.style.marginTop = '3rem';
		}
	});

	function BackButton({ ...props }) {
		return (
			<nextUI.Col className='pageLink' {...props}>
				<nextUI.Text css={{ color: '#7a7b7c', marginLeft: '1.5em', userSelect: 'none' }} size={'1.5em'}>
					<nextUI.Link css={{ color: '#7a7b7c' }} href={`${config.prefix}/`} underline><BsChevronDoubleLeft /></nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>
		);
	}

	function PageLink({ url, name, ...props }) {
		return (
			<nextUI.Col {...props} className='pageLink'>
				<nextUI.Text css={{ color: '#7a7b7c', marginLeft: '1.5em', userSelect: 'none' }} size={'1.5em'}>
					• &nbsp; &nbsp; <nextUI.Link css={{ color: '#7a7b7c' }} href={url} underline>{name}</nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>
		);
	}

	let tree = pagesFS();

	for (let [key, _value] of Object.entries(tree)) {
		if (key != 'parent' && key != 'folderData') {
			if (tree[key].type == 'folder' && currentPage.startsWith(tree[key].url)) {
				return (
					<div style={{ width: '15em' }}>
						<BackButton />
						{tree[key].subpages.map((page, index) => {
							return (<PageLink key={index} name={page.title} url={page.url} />);
						})}
					</div>
				);
			}
		}
	}

	return (
		<div style={{ width: '15rem', marginTop: '3rem' }} {...props}>
			{tree.map((item, index) => {
				if (item.type == 'page') {
					return (
						<PageLink key={index} name={item.title} url={item.url} />
					);
				} else {
					return (
						<PageLink key={index} name={item.title} url={item.subpages[0].url} />
					);
				}
			})}
		</div>
	);
}