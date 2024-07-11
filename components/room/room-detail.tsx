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
import { Slash, UserCheck2Icon } from "lucide-react";

// Auth
import { useSession } from "next-auth/react";

// Types
import { Room, User } from "@/types";

const RoomDetail = ({ room, owner }: { room: Room; owner: User }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    const [users, setUsers] = useState<User[]>([]);

    const { data, status } = useSession();

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            // Join the room
            if (status === "authenticated") {
                socket.emit("joinRoom", {
                    roomID: room.id,
                    user: data.user,
                });
            }

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
    }, []);

    const handleChooseWinner = () => {
        const winner = users[Math.floor(Math.random() * users.length)];

        alert("Winner: " + winner.name);
    };

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
        </div>
    );
};

export default RoomDetail;
