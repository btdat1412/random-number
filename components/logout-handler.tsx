"use client";

import React from "react";

import { signOut } from "next-auth/react";

const LogoutHandler = () => {
    return (
        <div
            onClick={() =>
                signOut({
                    redirect: true,
                    callbackUrl: "/",
                })
            }
            className="w-full"
        >
            Log out
        </div>
    );
};

export default LogoutHandler;
