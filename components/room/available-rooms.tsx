"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { Room } from "@/types";

// Components
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Services
import { createRoom } from "@/services/action";

// Assets
import { X, Plus, Slash } from "lucide-react";

const AvailableRooms = ({ allRooms }: { allRooms: Room[] }) => {
    const [rooms, setRooms] = useState(allRooms);
    // State to manage dialog visibility
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCreateRoom = async () => {
        try {
            const response = await createRoom();

            setRooms([...rooms, response.room]);
            setIsDialogOpen(true);
        } catch (error) {
            toast("Failed to create room. Please try again later.");
        }
    };

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
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">
                    {rooms.length === 0
                        ? "No room available"
                        : "Available rooms"}
                </h1>

                <Button onClick={handleCreateRoom}>
                    <Plus className="mr-2 h-5 w-5" />
                    New room
                </Button>
            </div>

            <Dialog open={isDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Room #{`${rooms[rooms.length - 1].id}`}{" "}
                            created successfully
                        </DialogTitle>
                    </DialogHeader>

                    <DialogClose
                        onClick={() => setIsDialogOpen(false)}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    <DialogFooter>
                        <Link
                            href={`/room/${rooms[rooms.length - 1].id}`}
                        >
                            <Button>
                                Go to room #
                                {`${rooms[rooms.length - 1].id}`}
                            </Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {rooms.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
                    {rooms.map((room) => (
                        <Link href={`/room/${room.id}`} key={room.id}>
                            <Card className="duration-200 ease-in-out hover:scale-110">
                                <CardHeader>
                                    <CardTitle>Room #{room.id}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableRooms;
