import { Device } from '@prisma/client';
import nc from 'next-connect';
import prisma from '@db/client';

import type { NextApiRequest, NextApiResponse } from 'next';

const router = nc<NextApiRequest, NextApiResponse>({
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method ${req.method} not allowed` });
	}
});

router.get(async (req, res) => {
	const { userId } = req.query;
	const token = req.cookies.token;

	if (!userId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	const session = await prisma.session.findUnique({
		where: {
			sessionToken: token
		}
	});

	if (!session || session.userId !== userId) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const devices: Device[] = await prisma.device.findMany({
		where: {
			userId
		}
	});

	return res.status(200).json({ devices });
});