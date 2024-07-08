import React from "react";

import AvailableRooms from "@/components/available-rooms";

// Services
import { getAllRooms } from "@/services";

const AllRoomsPage = async () => {
    const data = await getAllRooms();

    return <AvailableRooms rooms={data.rooms} />;
};

export default AllRoomsPage;
