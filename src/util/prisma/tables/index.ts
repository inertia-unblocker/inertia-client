import * as PrismaTypes from '../types';
import prisma from '../client';

// a full CRUD wrapper that makes prisma easier to use
class User {
	table: string;

	constructor() {
		this.table = 'User';
	}

	/**
	 * 
	 * @param data Data for creating a new user
	 * @returns The user
	 */
	async create(data: PrismaTypes.PrismaUserCreate) {
		return await prisma.user.create({ data });
	}

	/**
	 * 
	 * @param by The value to search by
	 * @param value The value to search for
	 * @returns The user
	 */
	async getSingle(by: PrismaTypes.userUniques, value: any) {
		return await prisma.user.findUnique({ where: { [by]: value } });
	}


	/**
	 * 
	 * @param by The value to search by
	 * @param value The value to search for
	 * @returns Array of users found
	 */
	async getMultiple(by: PrismaTypes.userNonUniques, value: any) {
		return await prisma.user.findMany({ where: { [by]: value } });
	}

	/**
	 * 
	 * @returns Array of all users
	 */
	async getAll() {
		return await prisma.user.findMany();
	}

	/**
	 * 
	 * @param uniqueBy The **unique** value to search by
	 * @param value The value to search for
	 * @param data The data to update the user with
	 * @returns who knows. whatever the prisma function returns
	 */
	async updateSingle(uniqueBy: PrismaTypes.userUniques, value: any, data: PrismaTypes.PrismaUserUpdate) {
		return await prisma.user.update({ where: { [uniqueBy]: value }, data });
	}

	/**
	 * 
	 * @param userBy The value to search by
	 * @param value The value to search for
	 * @param data The data to update each user with
	 * @returns who knows. whatever the prisma function returns
	 */
	async updateMultiple(userBy: PrismaTypes.userNonUniques, value: any, data: PrismaTypes.PrismaUserUpdate) {
		return await prisma.user.updateMany({ where: { [userBy]: value }, data });
	}


	/**
	 * 
	 * @param uniqueBy The **unique** value to search by
	 * @param value The value to search for
	 * @returns who knows. whatever the prisma function returns
	 */
	async deleteSingle(uniqueBy: PrismaTypes.userUniques, value: any) {
		return await prisma.user.delete({ where: { [uniqueBy]: value } });
	}


	/**
	 * 
	 * @param userBy The value to search by
	 * @param value The value to search for
	 * @returns who knows. whatever the prisma function returns
	 */
	async deleteMultiple(userBy: PrismaTypes.userNonUniques, value: any) {
		return await prisma.user.deleteMany({ where: { [userBy]: value } });
	}
}

export type PrismaUserTable = User;
export const UserTable = new User();