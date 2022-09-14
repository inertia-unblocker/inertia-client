import { NextApiRequest, NextApiResponse } from 'next';
import { UserTable } from '@util/prisma/tables';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ error: true, message: 'BAD_METHOD' });
		return;
	}

	const users = (await UserTable.getAll()).map(user => user.id);
	res.status(200).json({ error: false, users });
}