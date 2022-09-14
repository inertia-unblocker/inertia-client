import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

if (typeof global.prisma == 'undefined') {
	global.prisma = new PrismaClient();
}

export default global.prisma;