import { NextApiRequest, NextApiResponse } from 'next';
import { UserTable } from '@util/prisma/tables';


import authByPass from '@lib/api/authorizeByPassword';
import authorize from '@lib/api/authorize';
import parseBody from '@lib/api/parseBody';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'DELETE') {
		res.status(405).json({ error: true, message: 'BAD_METHOD' });
		return;
	}

	const { id } = req.query;
	const { password } = parseBody(req.body) as { password: string };
	const token = req.headers.authorization.split(' ')[1];

	if (!password || !token) {
		res.status(400).json({ message: 'CREDS_NOT_PROVIDED' });
		return;
	}

	if (!(await authorize(id as string, token))) {
		res.status(400).json({ err: true, message: 'BAD_TOKEN' });
		return;
	}

	if (!(await authByPass(id as string, password))) {
		res.status(400).json({ err: true, message: 'BAD_PASSWORD' });
		return;
	}

	await UserTable.deleteSingle('id', id);

	res.status(200).json({ err: false, message: 'USER_DELETED' });
}