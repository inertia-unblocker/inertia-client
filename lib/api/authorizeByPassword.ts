import { sha256 } from 'js-sha256';
import { UserTable } from '@util/prisma/tables';

export default async function authByPass(id: string, password: string): Promise<boolean> {
	const { salt, password: hashedPass } = await UserTable.getSingle('id', id);

	return sha256(`${password}${salt}`) === hashedPass;
}