"use server";
import { prisma } from "@/lib/prisma";

export const getAllMembers = async () => {
    const members = await prisma.teamMember.findMany();

    return {
        members,
    };
};
