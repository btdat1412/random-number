import React from "react";

// Components
import UserInfo from "@/components/user-info";

// Auth
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const UserInfoPage = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    {session?.user
                        ? `${session?.user.name}`
                        : "You are not logged in!"}
                </h1>
            </div>

            <UserInfo />

            <div className="flex flex-row space-x-4 rounded-lg border border-dashed p-4">
                {session?.user && <p className="">Your balance: $100</p>}
            </div>
        </div>
    );
};

export default UserInfoPage;
