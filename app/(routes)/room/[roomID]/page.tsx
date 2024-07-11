import React from "react";

import RoomDetail from "@/components/room/room-detail";

import { getRoomByID, getUserByID } from "@/services";

const RoomPage = async ({ params }: { params: { roomID: string } }) => {
    const roomData = await getRoomByID(Number(params.roomID));
    const userData = await getUserByID(Number(roomData.room.createdBy));

    return (
        <RoomDetail
            room={roomData.room}
            owner={{
                ...userData.user,
                id: userData.user.id.toString(),
                publicKey: userData.user.publicKey ?? "",
                privateKey: userData.user.privateKey ?? "",
            }}
        />
    );
};

export default RoomPage;
