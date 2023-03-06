import { Device } from '@prisma/client';
import nc from 'next-connect';
import prisma from '@db/client';

import type { NextApiRequest, NextApiResponse } from 'next';

const router = nc<NextApiRequest, NextApiResponse>({
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method ${req.method} not allowed` });
	}
});

router.post(async (req, res) => {
	const { userId, deviceName } = req.body;

	if (!userId || !deviceName) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	const session = await prisma.session.findUnique({
		where: {
			sessionToken: req.cookies.token
		}
	});

	if (!session || session.userId !== userId) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const device = await prisma.device.create({
		data: {
			deviceName,
			userId
		}
	});

	return res.status(200).json({ device });
});


router.get(async (req, res) => {
	const { deviceId, userId } = req.query;
	const token = req.cookies.token;

	if (!deviceId) {
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

	const device: Device | null = await prisma.device.findUnique({
		where: {
			id: deviceId as string
		}
	});

	if (!device) {
		return res.status(404).json({ error: 'Device not found' });
	}

	return res.status(200).json({ device });
});

router.delete(async (req, res) => {
	const { deviceId, userId } = req.query;
	const token = req.cookies.token;

	if (!deviceId) {
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

	const device = await prisma.device.delete({
		where: {
			id: deviceId as string
		}
	});

	return res.status(200).json({ device });
});

router.put(async (req, res) => {
	const { deviceId, userId, deviceName } = req.body;
	const token = req.cookies.token;

	if (!deviceId || !deviceName) {
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

	const device = await prisma.device.update({
		where: {
			id: deviceId
		},
		data: {
			deviceName
		}
	});

	return res.status(200).json({ device });
});

export default router;