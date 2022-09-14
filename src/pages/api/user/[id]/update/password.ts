import { NextApiRequest, NextApiResponse } from 'next';
import { UserTable } from '@util/prisma/tables';

import authorize from '@lib/api/authorizeByResetToken';
import validator from 'validator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(405).json({ error: true, message: 'BAD_METHOD' });
		return;
	}

	const { id } = req.query as { id: string };
	const { password } = JSON.parse(req.body);
	const token = req.headers.authorization.split(' ')[1];
	const user = await UserTable.getSingle('id', id);

	if (!password || !token) {
		res.status(400).json({ message: 'CREDS_NOT_PROVIDED' });
		return;
	}

	if (!(await authorize(id, token))) {
		res.status(400).json({ err: true, message: 'BAD_TOKEN' });
		return;
	}

	if (!validator.isHash(password)) {
		res.status(400).json({ err: true, message: 'BAD_PASSWORD', ctx: 'Please dont send raw/plaintext passwords. Use your hash with sha256' });
		return;
	}

	if (!user) {
		res.status(400).json({ err: true, message: 'USER_NOT_FOUND' });
		return;
	}

	await UserTable.updateSingle('id', id, { password: password });
	res.status(200).json({ err: false });
}