/* eslint-disable no-unreachable */
import { NextApiRequest, NextApiResponse } from 'next';
import { UserTable } from '@util/prisma/tables';

import authorize from '@lib/api/authorize';
import hasPurchased from '@lib/api/hasPurchaced';
import parseBody from '@lib/api/parseBody';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ error: true, message: 'BAD_METHOD' });
		return;
	}

	const { id } = req.query;
	const { status } = parseBody(req.body) as { status: boolean };
	const token = req.headers.authorization.split(' ')[1];
	const proofOfPurchase = await hasPurchased(id as string, token);

	if (!proofOfPurchase) {
		res.status(400).json({ err: true, message: 'POP_NOT_IMPLEMENTED' });
		return;
	}

	if (!token) {
		res.status(400).json({ message: 'CREDS_NOT_PROVIDED' });
		return;
	}

	if (!(await authorize(id as string, token))) {
		res.status(400).json({ err: true, message: 'BAD_TOKEN' });
		return;
	}

	const user = await UserTable.getSingle('id', id);

	if (!user) {
		res.status(400).json({ err: true, message: 'USER_NOT_FOUND' });
		return;
	}

	if (user.hasInertiaPremium === status) {
		res.status(400).json({ err: true, message: 'ALREADY_SUBSCRIBED' });
		return;
	}

	await UserTable.updateSingle('id', id, { hasInertiaPremium: status });
}