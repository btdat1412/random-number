"use client";

import React, { FC } from "react";

import { SessionProvider } from "next-auth/react";

interface AuthSessionProviderProps {
    children: React.ReactNode;
}

const AuthSessionProvider: FC<AuthSessionProviderProps> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionProvider;
