"use server";
import { prisma } from "@/lib/prisma";

export const getAllMembers = async () => {
    const members = await prisma.teamMember.findMany();

    return {
        members,
    };
};

export const getAllRooms = async () => {
    const rooms = await prisma.room.findMany();

    return {
        rooms,
    };
};
