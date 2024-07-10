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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Assets
import { X, Plus, Slash } from "lucide-react";

// Services
import { createRoom } from "@/services/action";

// Auth
import { useSession } from "next-auth/react";

const AvailableRooms = ({ allRooms }: { allRooms: Room[] }) => {
    const [rooms, setRooms] = useState(allRooms);
    // State to manage dialog visibility
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // State to manage dialog content
    const [dialogContent, setDialogContent] = useState<{
        header: React.ReactNode;
        content: React.ReactNode;
        footer: React.ReactNode;
    }>({
        header: (
            <DialogHeader>
                <DialogTitle>
                    You have to login to create a new room!
                </DialogTitle>
            </DialogHeader>
        ),
        content: null,
        footer: (
            <DialogFooter>
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </DialogFooter>
        ),
    });

    const [userInput, setUserInput] = useState({
        roomName: "A room",
        roomMinimumBet: 100,
    });

    const { data, status } = useSession();

    const handleInputChange = (inputIdentifier: any, newValue: any) => {
        setUserInput((prevState) => {
            return {
                ...prevState,
                [inputIdentifier]: +newValue,
            };
        });
    };

    const handleOpenDialog = async () => {
        if (status === "unauthenticated") {
            setIsDialogOpen(true);
        } else {
            // Update the dialog content, then open the dialog
            setDialogContent({
                ...dialogContent,
                header: (
                    <DialogHeader>
                        <DialogTitle>Create new room</DialogTitle>
                    </DialogHeader>
                ),
                content: (
                    <>
                        <div>
                            <Label htmlFor="roomName">Room name</Label>
                            <Input
                                name="roomName"
                                type="text"
                                value={userInput.roomName}
                                onChange={(event) =>
                                    handleInputChange(
                                        "roomName",
                                        event.target.value,
                                    )
                                }
                            />
                        </div>

                        <div>
                            <Label htmlFor="roomMinimumBet">Minimum bet</Label>
                            <Input
                                name="roomMinimumBet"
                                type="number"
                                value={userInput.roomMinimumBet}
                                onChange={(event) =>
                                    handleInputChange(
                                        "roomMinimumBet",
                                        event.target.value,
                                    )
                                }
                            />
                        </div>
                    </>
                ),
                footer: (
                    <DialogFooter>
                        <Button onClick={handleCreateRoom}>Create room</Button>
                    </DialogFooter>
                ),
            });

            setIsDialogOpen(true);
        }
    };

    const handleCreateRoom = async () => {
        try {
            // Create a new room
            const response = await createRoom(
                Number(data?.user.id),
                userInput.roomName,
                userInput.roomMinimumBet,
            );
            console.log(response.room);

            // Update the rooms state with the new room
            setRooms([...rooms, response.room]);

            // Update the dialog content, then open the dialog
            setDialogContent({
                ...dialogContent,
                header: (
                    <DialogHeader>
                        <DialogTitle>
                            Room #{`${response.room.id}`} created successfully
                        </DialogTitle>
                    </DialogHeader>
                ),
                footer: (
                    <DialogFooter>
                        <Link href={`/room/${response.room.id}`}>
                            <Button>Go to room #{`${response.room.id}`}</Button>
                        </Link>
                    </DialogFooter>
                ),
            });
            setIsDialogOpen(true);
        } catch (error) {
            toast("Failed to create room. Please try again later.");
        }
        console.log(userInput);
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

                <Button onClick={handleOpenDialog}>
                    <Plus className="mr-2 h-5 w-5" />
                    New room
                </Button>
            </div>

            <Dialog open={isDialogOpen}>
                <DialogContent>
                    <DialogClose
                        onClick={() => setIsDialogOpen(false)}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    {dialogContent.header}
                    {dialogContent.content}
                    {dialogContent.footer}
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
