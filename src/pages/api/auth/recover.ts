import { NextApiRequest, NextApiResponse } from 'next';
import { UserTable } from '@util/prisma/tables';

import cuid from 'cuid';
import Email from '@lib/email';
import parseBody from '@lib/api/parseBody';

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

	if (!user.isVerified) {
		res.status(400).json({ err: true, message: 'USER_NOT_VERIFIED' });
		return;
	}

	const token = cuid();
	await UserTable.updateSingle('id', user.id, { resetToken: token });

	const nodemail = new Email()
		.setRecipient(user.email)
		.setTitle('Password Reset')
		.setBody(`Click <a href="${process.env.HOST}/pwreset/${user.id}?token=${user.token}">here</a> to reset your password.`);

	await nodemail.send();

	res.status(200).json({ err: false, message: 'EMAIL_SENT' });
}