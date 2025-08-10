// lib/auth.ts
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb-client-promise';
import connect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
	adapter: MongoDBAdapter(clientPromise),
	session: { strategy: 'jwt' } as const,
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password)
					return null;
				await connect();
				const user = await User.findOne({
					email: credentials.email,
				});
				if (!user || !user.passwordHash) return null;
				const isValid = await bcrypt.compare(
					credentials.password,
					user.passwordHash,
				);
				if (!isValid) return null;
				return {
					id: user._id.toString(),
					name: user.name,
					email: user.email,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, token }: any) {
			if (token?.sub) session.user.id = token.sub;
			return session;
		},
	},
};
