"use server";
import { prisma } from "@/lib/prisma";

// Parameter: id (type: number)
export const createRoom = async () => {
    const room = await prisma.room.create({
        // data: { id: id },
    });

    return {
        room,
    };
};
