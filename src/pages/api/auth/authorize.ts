import { NextApiRequest, NextApiResponse } from 'next';
import { UserTable } from '@util/prisma/tables';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ error: true, message: 'BAD_METHOD' });
		return;
	}

	const { id } = req.body;
	const token = req.headers.authorization.split(' ')[1];

	if (!id || !token) {
		res.status(400).json({ message: 'CREDS_NOT_PROVIDED' });
		return;
	}

	const user = await UserTable.getSingle('id', id);

	if (!user) {
		res.status(400).json({ err: true, message: 'USER_NOT_FOUND' });
		return;
	}

	if (user.token !== token) {
		res.status(400).json({ err: true, message: 'BAD_TOKEN' });
		return;
	}

	res.status(200).json({ err: false, authorized: true });
}