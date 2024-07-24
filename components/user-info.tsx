"use client";

import React from "react";

import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import { useSession } from "next-auth/react";

const UserInfo = () => {
    const { data } = useSession();
    console.log(data);

    return (
        <>
            <div className="space-y-2 rounded-lg border border-dashed p-4">
                <p>Email: {data?.user.email}</p>

                <p>Role: {data?.user.role}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="border-dashed border-green-500">
                    <CardHeader>
                        <CardTitle className="text-green-500">
                            Your Public key
                        </CardTitle>

                        <CardDescription>
                            This is your wallet address, you are free to share it
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="bg-accent p-2">
                            <code className="break-words">
                                {data?.user.publicKey}
                            </code>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-red-500">
                    <CardHeader>
                        <CardTitle className="text-red-500">
                            Your Private key
                        </CardTitle>

                        <CardDescription>
                            Do not share your private key to anyone!
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="bg-accent p-2">
                            <code className="break-words">
                                <code>{data?.user.privateKey}</code>
                            </code>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default UserInfo;
