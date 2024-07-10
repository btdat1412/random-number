import React from "react";
import Link from "next/link";

// Components
import UserInfo from "@/components/user-info";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Assets
import { Slash } from "lucide-react";

// Auth
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const UserInfoPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <h1 className="text-lg font-semibold md:text-2xl">
                You have to{" "}
                <Link href="/login" className="underline">
                    login
                </Link>{" "}
                first!
            </h1>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/me">Me</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    {session?.user.name}
                </h1>
            </div>

            <div className="space-y-2 rounded-lg border border-dashed p-4">
                <p>Your balance: $100</p>
            </div>

            <UserInfo />
        </div>
    );
};

export default UserInfoPage;
