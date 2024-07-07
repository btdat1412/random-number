import React from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";

const RoomPage = ({ params }: { params: { roomID: string } }) => {
    return (
        <div className="p-4 lg:p-6">
            <p className="pb-2">
                <Link href="/room">
                    <Button variant="outline">Back to all rooms</Button>
                </Link>
            </p>

            <p>Room #{params.roomID}</p>
        </div>
    );
};

export default RoomPage;
