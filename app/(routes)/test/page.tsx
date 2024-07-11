import React from "react";

import { socket } from "@/lib/socket";

import { Blockchain } from "@/services/blockchain";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const TestPage = async () => {
    const session = await getServerSession(authOptions);
    console.log('Message from test page: ',session);

    return (
        <div className="p-4 lg:p-6">
            <h1 className="text-lg font-semibold md:text-2xl">
                Feature testing route
            </h1>

            {session?.user ? (
                <h1 className="text-lg">Welcome back {session?.user.name}</h1>
            ) : (
                <h1 className="text-lg">You are unauthorized</h1>
            )}
        </div>
    );
};

export default TestPage;
