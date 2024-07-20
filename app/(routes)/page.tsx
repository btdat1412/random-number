"use client";

// Auth
import { useSession } from "next-auth/react";
import { useWallet } from "../../components/walletContext";

const HomePage = () => {
    const { data: session } = useSession();

    const { balance, address } = useWallet();

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
                {session?.user && (
                    <div>
                        {address && (
                            <p>
                                Connected Address: <span>{address}</span>
                            </p>
                        )}
                        {balance && (
                            <p>
                                Balance: <span>{balance} ETH</span>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
