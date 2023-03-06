import fs from 'fs';
import path from 'path';

import { Card, Collapse, Divider, Input, styled, Text, Tooltip } from '@nextui-org/react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { Button } from '@components/button';
import { Link } from '@components/link';
import { Premium } from '@components/layouts';
import { WinKey } from '@components/icons';

import styles from '@css/md.module.css';


interface Device {
	name: string;
	id: string;
	psk: string;
}

function VPN({ guides }: any) {

	const MdxComponents = {
		Key: styled('kbd'),
		WinKey,
		a: (props: any) => <Link css={{ display: 'inline !important' }} {...props} />,
		p: (props: any) => <Text css={{ display: 'inline !important' }} {...props} />,
		li: (props: any) => <li className={styles.listitem} style={{ margin: '0 .5rem', lineHeight: '1.5rem' }} {...props} />,
		ul: (props: any) => <ul style={{ listStyle: 'circle' }} {...props} />,
		code: (props: any) => <code style={{ userSelect: 'text', whiteSpace: 'nowrap', lineHeight: '.5rem' }} {...props} />
	};

	const getAddedDevices = (): Device[] => {
		return [{
			name: 'test',
			psk: 'test',
			id: 'test',
		}, {
			name: 'test',
			psk: 'test',
			id: 'test',
		}, {
			name: 'test',
			psk: 'test',
			id: 'test',
		}];
	};

	const updateAddedDevice = (id: number, name: string) => {
		console.log(id, name);
	};

	return (
		<Premium>
			<Card css={{ margin: '1rem 2rem 0rem', width: 'calc(100% - 4rem)' }}>
				<Card.Header>
					<Text css={{ margin: '0' }} h3>&nbsp;&nbsp;1.&emsp;Add Devices</Text>
				</Card.Header>
			</Card>
			<div style={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-evenly'
			}}>
				{
					getAddedDevices().map(({ name, psk }, i) => {
						return (
							<div key={i} style={{
								display: 'flex',
							}}>
								<Card css={{
									margin: '1rem 0rem 0rem 0rem',
									width: '21rem',
									padding: '.75rem 1rem',
									display: 'flex',
									justifyContent: 'flex-start',
								}}>
									<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
										<Text>Device Name:</Text>
										<Input initialValue={name} size='xs' bordered></Input>
									</div>
									<div style={{ display: 'flex' }}>
										<Text css={{ flex: 1, width: 'fit-content' }}>PSK: {psk}</Text>
									</div>
								</Card>

								{
									i == getAddedDevices().length - 1 ? (
										<Button style={{
											width: '1.25rem',
											height: '1.25rem',
											justifyContent: 'center',
											alignItems: 'center',
											marginTop: '2.95rem',
											marginLeft: '.5rem',
										}} type='transparent'>
											<Text css={{ lineHeight: 'normal', marginBottom: '.25rem' }} size='$md'>+</Text>
										</Button>
									) : null
								}
							</div>
						);
					})
				}
			</div>
			<Card css={{ margin: '4rem 2rem 0rem', width: 'calc(100% - 4rem)' }}>
				<Card.Header>
					<Text css={{ margin: '0' }} h3>&nbsp;&nbsp;2.&emsp;Connect</Text>
				</Card.Header>
			</Card>

			<Collapse.Group css={{ margin: '1rem 2rem' }} splitted>
				<Collapse className={styles.collapse} title='Windows'>
					<MDXRemote {...guides.windows} components={MdxComponents} />
				</Collapse>

				<Collapse className={styles.collapse} title='Linux'>
					<MDXRemote {...guides.linux} components={MdxComponents} />
				</Collapse>

				<Collapse className={styles.collapse} title='Chromebook'>
					<MDXRemote {...guides.chromeos} components={MdxComponents} />
				</Collapse>

				<Collapse className={styles.collapse} title='Android'>
					<MDXRemote {...guides.android} components={MdxComponents} />
				</Collapse>
			</Collapse.Group>
		</Premium>
	);
}

export async function getStaticProps() {
	const guides = ['linux', 'android', 'chromeos', 'windows'];
	const files = guides.map(i => fs.readFileSync(path.join(process.cwd(), 'src', 'md', `vpn-${i}.mdx`), 'utf8'));

	files.forEach((file, filei) => {
		const matches: any[] = [];
		const replacedEnvs: string[] = [];

		for (let i = 0; i < file.length; i++)
			if (file[i] == '%')
				matches.push(i);

		matches.map((match, matchi) => {
			file = files[filei];

			if (matchi % 2 != 0) return;
			if (matchi + 1 >= matches.length) return;

			return file.substring(match, matches[matchi + 1] + 1);
		})
			.filter((item, pos, self) => self.indexOf(item) == pos)
			.filter(e => e)
			.forEach((item) => {
				item = item as string;
				files[filei] = files[filei].replaceAll(item, process.env[item.substring(1, item.length - 1)] as string);
			});
	});

	const mdx = await Promise.all(files.map(async file => await serialize(file)));
	const parsed = mdx.map((e, i) => ({ [guides[i]]: e })).reduce((a, b) => ({ ...a, ...b }));

	return { props: { guides: parsed } };
}

export default VPN;