"use server";

import { prisma } from "@/lib/prisma";

import { Room } from "@/types";

export const createRoom = async (
    authorID: any,
    name?: string,
    minimumBet?: number,
) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id: authorID },
    });

    const room = await prisma.room.create({
        data: {
            createdBy: user.id,
            name: name || undefined,
            minimumBet: minimumBet || undefined,
        },
    });

    return { room };
};
