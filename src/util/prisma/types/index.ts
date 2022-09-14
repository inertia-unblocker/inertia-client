export type PrismaTable = {
	schemaname: 'public' | 'private';
	tablename: string;
	tableowner: string;
	tablespace: string;
	hasindexes: boolean;
	hasrules: boolean;
	hastriggers: boolean;
	rowsecurity: string | boolean;
};

export type PrismaUserCreate = {
	email: string;
	username: string;
	password: string;
}

export type PrismaUserUpdate = {
	email?: string;
	username?: string;
	password?: string;
	hasInertiaPremium?: boolean;
	isVerified?: boolean;
	resetToken?: string;
	icon?: string;
}

export type PrismaUser = {
	id: string;
	email: string;
	username: string;
	salt: string;
	token: string;
	resetToken: string;
	password: string;
	hasInertiaPremium: boolean;
	isVerified: boolean;
	icon: string;
}

export type userUniques = 'id' | 'email' | 'username' | 'token';
export type userNonUniques = 'hasInertiaPremium';