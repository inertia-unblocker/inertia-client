import { NextApiRequest, NextApiResponse } from 'next';
import { sha256 } from 'js-sha256';
import { UserTable } from '@util/prisma/tables';

import validator from 'validator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ error: true, message: 'BAD_METHOD' });
		return;
	}

	const { usernameOrEmail, password } = req.body;

	if (!usernameOrEmail || !password) {
		res.status(400).json({ message: 'CREDS_NOT_PROVIDED' });
		return;
	}

	let user;
	if (validator.isEmail(usernameOrEmail)) user = await UserTable.getSingle('email', usernameOrEmail);
	else user = await UserTable.getSingle('username', usernameOrEmail);

	if (!user) {
		res.status(400).json({ err: true, message: 'USER_NOT_FOUND' });
		return;
	}

	const { password: hashedPass, salt, isVerified } = user;
	const hashedInput = sha256(`${password}${salt}`);

	if (hashedPass !== hashedInput) {
		res.status(400).json({ err: true, message: 'BAD_PASSWORD' });
		return;
	}

	if (!isVerified) {
		res.status(400).json({ err: true, message: 'EMAIL_NOT_VERIFIED' });
		return;
	}

	res.status(200).json({ err: false, token: user.token, uid: user.id });
}