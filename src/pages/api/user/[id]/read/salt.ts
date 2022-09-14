import { NextApiRequest, NextApiResponse } from 'next';
import { UserTable } from '@util/prisma/tables';

import authByResetToken from '@lib/api/authorizeByResetToken';
import authorize from '@lib/api/authorize';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ error: true, message: 'BAD_METHOD' });
		return;
	}

	const { id } = req.query;
	const token = req.headers.authorization.split(' ')[1];
	const user = await UserTable.getSingle('id', id);

	if (!user) {
		res.status(400).json({ err: true, message: 'USER_NOT_FOUND' });
		return;
	}

	if (!token) {
		res.status(400).json({ message: 'CREDS_NOT_PROVIDED' });
		return;
	}

	if ((!(await authorize(id as string, token))) && (!(await authByResetToken(id as string, token)))) {
		res.status(400).json({ err: true, message: 'BAD_TOKEN' });
		return;
	}

	res.status(200).json({ err: false, salt: user.salt });
}