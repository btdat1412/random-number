"use server";
import { prisma } from "@/lib/prisma";

export const getAllMembers = async () => {
    const members = await prisma.teamMember.findMany();

    return {
        members,
    };
};


export const getUserByID = async (id: number) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id: id },
    });

    return { user };
};


export const getAllRooms = async () => {
    const rooms = await prisma.room.findMany();

    return {
        rooms,
    };
};

export const getRoomByID = async (id: number) => {
    const room = await prisma.room.findUniqueOrThrow({
        where: { id: id },
    });

    return { room };
};
