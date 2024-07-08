import React from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";

// Assets
import { ChevronLeft } from "lucide-react";

const RoomPage = ({ params }: { params: { roomID: string } }) => {
    return (
        <>
            {/* TODO: add breadcrumb */}
            <p className="pb-2">
                <Link href="/room">
                    <Button variant="outline">
                        <ChevronLeft className="mr-2 h-5 w-5" /> All rooms
                    </Button>
                </Link>
            </p>

            <h1 className="text-lg font-semibold md:text-2xl">
                Room #{params.roomID}
            </h1>
        </>
    );
};

export default RoomPage;
