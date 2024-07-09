import Link from "next/link";

// Components
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Auth
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const HomePage = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    {session?.user
                        ? `Welcome to the game, ${session?.user.role === "admin" ? "Admin" : ""} ${session?.user.name}!`
                        : "Login to start playing our game!"}
                </h1>
            </div>

            <div className="flex flex-row space-x-4 rounded-lg border border-dashed p-4">
                {session?.user && <p className="">Your balance: $100</p>}
            </div>
        </div>
    );
};
export default HomePage;
