import NextAuth from "next-auth";

import {User } from "@/types";
declare module "next-auth" {
    interface User {
        id: string;
        role: string;
        name: string;
        email: string;
        publicKey: string;
        privateKey: string;
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User & {
            id: string;
            role: string;
            name: string;
            email: string;
            publicKey: string;
            privateKey: string;
        };
        token: {
            id: string;
            role: string;
            name: string;
            email: string;
            publicKey: string;
            privateKey: string;
        };
    }
}
