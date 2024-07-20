"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { socket } from "@/lib/socket";

// Components
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

// Assets
import { Slash } from "lucide-react";

// Auth
import { useSession } from "next-auth/react";

// Types
import { Room, User } from "@/types";

// Context
import { ethers } from "ethers";
import { useWallet } from "../walletContext";

const RoomDetail = ({ room, owner }: { room: Room; owner: User }) => {
    const { contract, address } = useWallet();
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [users, setUsers] = useState<User[]>([]);
    const [winner, setWinner] = useState<string | null>(null);
    const { data, status } = useSession();

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        async function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            // Join the room only if not the owner
            if (status === "authenticated" && data?.user.id !== owner.id) {
                socket.emit("joinRoom", {
                    roomID: room.id,
                    user: data.user,
                });

                // Enter lottery contract if user is not the owner
                if (contract) {
                    await enterLottery();
                }
            }

            // // Fetch the current winner
            // if (contract) {
            //     const currentWinner = await contract.getWinner();
            //     setWinner(currentWinner);
            // }

            socket.io.engine.on("upgrade", (transport: any) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        function onUserJoined(message: string) {
            console.log(message);
        }

        function onUsersList(usersList: any) {
            setUsers(usersList.filter((user: any) => user.id !== owner.id));
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("userJoined", onUserJoined);
        socket.on("socketsList", onUsersList);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("userJoined", onUserJoined);
            socket.off("socketsList", onUsersList);
        };
    }, [status, room.id, data?.user.id, owner.id, contract]);

    const enterLottery = async () => {
        try {
            if (!contract) {
                throw new Error("Contract not initialized");
            }
            const tx = await contract.enter({
                value: ethers.parseEther("0.02"),
                gasLimit: 300000,
            });
            await tx.wait();
            console.log("Entered lottery successfully:", tx);
        } catch (error) {
            console.error("Error entering lottery:", error);
        }
    };

    const handleChooseWinner = async () => {
        try {
            if (!contract) {
                throw new Error("Contract not initialized");
            }
            const tx = await contract.pickWinner({
                gasLimit: 300000,
            });
            await tx.wait();

            // Fetch and set the winner address
            const winnerAddress = await contract.getWinner();
            setWinner(winnerAddress);
            console.log("Winner picked successfully:", winnerAddress);
            socket.emit("winnerChosen", {
                roomID: room.id,
                winner: winnerAddress,
            });
        } catch (error) {
            console.error("Error choosing winner:", error);
        }
    };

    useEffect(() => {
        socket.on("winnerChosen", ({ winner }) => {
            if (winner === address) {
                alert("You are the winner!");
            } else {
                alert("You lost, better luck next time!");
            }
        });

        return () => {
            socket.off("winnerChosen");
        };
    }, [address]);

    if (status === "unauthenticated") {
        return (
            <h1 className="text-lg font-semibold md:text-2xl">
                <Link href="/login" className="underline">
                    Login
                </Link>{" "}
                to join this room.
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
                        <BreadcrumbLink href="/room">Rooms</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbPage>Room #{room.id}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">
                    {room.name || `Room #${room.id}`}
                </h1>

                {data?.user.id === owner.id && (
                    <Button onClick={handleChooseWinner}>Choose winner</Button>
                )}
            </div>

            <div className="rounded-lg border border-dashed p-4">
                <p>Status: {isConnected ? "connected" : "disconnected"}</p>
                <p>Transport: {transport}</p>

                <Separator className="my-4" />
            </div>

            <div className="rounded-lg border border-dashed p-4">
                {users.map((user, index) => (
                    <div key={index}>{user.name}</div>
                ))}
            </div>

            {winner && (
                <div className="rounded-lg border border-dashed p-4">
                    <p>Winner: {winner}</p>
                </div>
            )}
        </div>
    );
};

export default RoomDetail;
