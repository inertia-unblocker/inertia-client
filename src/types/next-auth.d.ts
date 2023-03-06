import NextAuth, { ISODateString, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		user: User,
		token: JWT,
		expires: ISODateString
	}
}