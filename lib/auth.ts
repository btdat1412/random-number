import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "pd.quocdat@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Find user in the database
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });
                if (!existingUser) {
                    return null;
                }

                // Check if password is correct
                const isPasswordMatch = await compare(
                    credentials.password,
                    existingUser.password,
                );
                if (!isPasswordMatch) {
                    return null;
                }

                return {
                    id: existingUser.id + "",
                    role: existingUser.role,
                    name: existingUser.name,
                    email: existingUser.email,
                    publicKey: existingUser.publicKey + "",
                    privateKey: existingUser.privateKey + "",
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // console.log("Message from lib/auth.ts", token, user);

            if (user) {
                return {
                    ...token,
                    role: user.role,
                    email: user.email,
                    publicKey: user.publicKey,
                    privateKey: user.privateKey,
                };
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                    email: token.email,
                    publicKey: token.publicKey,
                    privateKey: token.privateKey,
                },
            };
        },
    },
};
