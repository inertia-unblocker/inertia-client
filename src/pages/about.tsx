import fs from 'fs';
import path from 'path';

import { Card, Collapse, Divider, Text } from '@nextui-org/react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import styles from '@css/md.module.css';


function Changelog({ changelogs }: any) {
	const MdxComponents = {
		p: (props: any) => <Text {...props} />,
		li: (props: any) => <li className={styles.listitem} style={{ margin: '0 .5rem', lineHeight: '1.5rem' }} {...props} />,
		ul: (props: any) => <ul className={styles.list} {...props} />,
		code: (props: any) => <code style={{ userSelect: 'text', whiteSpace: 'nowrap', lineHeight: '.5rem' }} {...props} />
	};

	return (
		<Card css={{ width: 'calc(100% - 4rem)', margin: '1rem 2rem 0rem' }}>
			<Card.Header>
				<Text css={{ userSelect: 'none', margin: 0 }} h2>
					Changelog
				</Text>
			</Card.Header>
			<Divider />
			<Card.Body>
				<Collapse.Group bordered>
					<Collapse title='Inertia Client v1.3.0'>

					</Collapse>

					<Collapse title='Inertia Client v1.2.0'>
						<MDXRemote {...changelogs['1.2.0']} components={MdxComponents} />
					</Collapse>

					<Collapse title='Inertia Client v1.1.0'>
						<MDXRemote {...changelogs['1.1.0']} components={MdxComponents} />
					</Collapse>

					<Collapse title='Inertia Client v1.0.0'>
						<MDXRemote {...changelogs['1.0.0']} components={MdxComponents} />
					</Collapse>
				</Collapse.Group>
			</Card.Body>
		</Card>
	);
}

export async function getStaticProps() {
	const changelogs = ['1.0.0', '1.1.0', '1.2.0'];
	const files = changelogs.map(i => fs.readFileSync(path.join(process.cwd(), 'src', 'md', `changelog-${i}.mdx`), 'utf8'));

	files.forEach((file, filei) => {
		const matches: any[] = [];

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
	const parsed = mdx.map((e, i) => ({ [changelogs[i]]: e })).reduce((a, b) => ({ ...a, ...b }));

	return { props: { changelogs: parsed } };
}

export default Changelog;