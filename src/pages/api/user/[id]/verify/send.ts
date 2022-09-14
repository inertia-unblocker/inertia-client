import { NextApiRequest, NextApiResponse } from 'next';
import Email from '@lib/email';
import { UserTable } from '@util/prisma/tables';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).end({ err: true, message: 'BAD_METHOD' });
		return;
	}

	const { id } = req.query;
	const user = await UserTable.getSingle('id', id);

	if (!user) {
		res.status(400).json({ err: true, message: 'USER_NOT_FOUND' });
		return;
	}

	const email = new Email()
		.setTitle('Verify your email')
		.setBody(
			`<p>Click <a href="http://localhost:3000/verify/${id}?token=${user.token}">here</a> to verify your email.</p>`
		)
		.setRecipient(user.email);

	await email.send();

	res.status(200).json({ err: false, message: 'EMAIL_SENT' });
}