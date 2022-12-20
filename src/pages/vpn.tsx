import fs from 'fs';
import path from 'path';

import { Collapse, styled, Text } from '@nextui-org/react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { Link } from '@components/link';
import { Premium } from '@components/layouts';
import { WinKey } from '@components/icons';

import styles from '@css/md.module.css';


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

	return (
		<Premium>
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