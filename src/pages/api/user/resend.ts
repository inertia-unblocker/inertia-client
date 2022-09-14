import { NextApiRequest, NextApiResponse } from 'next';
import { UserTable } from '@util/prisma/tables';

import parseBody from '@lib/api/parseBody';
import request from '@lib/request';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).end({ err: true, message: 'BAD_METHOD' });
	}

	const { email } = parseBody(req.body) as { email: string };
	const user = await UserTable.getSingle('email', email);

	if (!user) {
		res.status(400).json({ err: true, message: 'USER_NOT_FOUND' });
		return;
	}

	if (user.isVerified) {
		res.status(400).json({ err: true, message: 'USER_ALREADY_VERIFIED' });
		return;
	}

	const response = await request('GET', `/api/user/${user.id}/verify/send`);

	if (response.err) {
		res.status(400).json({ err: true, message: response.message });
		return;
	}

	res.status(200).json({ err: false, message: 'EMAIL_RESENT' });
}