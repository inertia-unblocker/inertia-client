import NextAuth from 'next-auth';

import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';

import { PrismaAdapter as Adapter } from '@next-auth/prisma-adapter';
import prisma from '@db/client';


export default NextAuth({
	adapter: Adapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLID as string,
			clientSecret: process.env.DISCORD_SECRET as string,
		}),
	],
	callbacks: {
		async session({ session, token, user }) {
			session.user = user;
			session.token = token;

			return session;
		}
	}
});