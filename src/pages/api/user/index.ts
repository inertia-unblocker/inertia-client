import { NextApiRequest, NextApiResponse } from 'next';
import { sha256 } from 'js-sha256';
import { UserTable } from '@util/prisma/tables';

import request from '@lib/request';
import validator from 'validator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ error: true, message: 'BAD_METHOD' });
		return;
	}

	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		res.status(400).json({ message: 'CREDS_NOT_PROVIDED' });
		return;
	}

	const userEmailCheck = await UserTable.getSingle('email', email);
	const userUsernameCheck = await UserTable.getSingle('username', username);

	if (userEmailCheck) {
		res.status(400).json({ err: true, message: 'EMAIL_EXISTS' });
		return;
	} else if (userUsernameCheck) {
		res.status(400).json({ err: true, message: 'USERNAME_EXISTS' });
		return;
	}

	if (!validator.isEmail(email)) {
		res.status(400).json({ err: true, message: 'BAD_EMAIL' });
		return;
	}

	const { id, token, salt } = await UserTable.create({
		email,
		username,
		password: 'abc'
	}).catch(e => {
		console.log(e);
		throw new Error('DATABASE_ERROR');
	});

	await UserTable.updateSingle('id', id, { password: sha256(`${password}${salt}`) });

	res.status(200).json({ err: false, id });
}