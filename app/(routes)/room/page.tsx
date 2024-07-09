import React from "react";

import AvailableRooms from "@/components/room/available-rooms";

import { getAllRooms } from "@/services";

const AllRoomsPage = async () => {
    const data = await getAllRooms();

    return <AvailableRooms allRooms={data.rooms} />;
};

export default AllRoomsPage;
