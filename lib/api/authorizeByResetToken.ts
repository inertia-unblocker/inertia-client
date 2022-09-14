import { UserTable } from '@util/prisma/tables';

export default async function authByResetToken(id: string, token: string): Promise<boolean> {
	return token === (await UserTable.getSingle('id', id)).resetToken;
}