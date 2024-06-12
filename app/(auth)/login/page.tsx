"use client";
import { useState } from "react";
import Link from "next/link";

// Components
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Icons
import { Dices } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Handle form submission
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md space-y-4 rounded p-8 shadow-md">
                <CardHeader>
                    <div className="flex h-8 items-center justify-center space-x-4">
                        {/* Click the logo to navigate home */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Dices className="h-8 w-8" />
                        </Link>

                        <Separator orientation="vertical" />

                        <CardTitle className="text-center font-bold">
                            Login
                        </CardTitle>
                    </div>
                </CardHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <Link
                            href="#"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Forgot Password
                        </Link>
                    </div>

                    <div className="py-3">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>

                    <div>
                        Dont have an account?{" "}
                        <Link
                            href="#"
                            className="text-sm font-bold text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};
export default LoginPage;
