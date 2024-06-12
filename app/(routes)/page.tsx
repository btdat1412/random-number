import Link from "next/link";

// Components
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getAllMembers } from "@/services";

const HomePage = async () => {
    const data = await getAllMembers();

    return (
        <>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">
                        Team members
                    </h1>
                </div>

                <div className="flex flex-row space-x-4 rounded-lg border border-dashed p-4">
                    {data.members.map((member) => (
                        <Card
                            key={member.id}
                            className="duration-200 ease-in-out hover:scale-110"
                        >
                            <CardHeader>
                                <CardTitle>{member.name}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <div>
                    <Link href="/login">
                        <Button>Login here</Button>
                    </Link>
                </div>
            </main>
        </>
    );
};
export default HomePage;
