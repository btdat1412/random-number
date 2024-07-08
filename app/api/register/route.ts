import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        // Check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUserByEmail) {
            return NextResponse.json(
                {
                    user: null,
                    message: "User already exists",
                },
                { status: 400 },
                // { status: 409 },
            );
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json(
            {
                user: rest,
                message: "User created successfully!",
            },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 },
        );
    }
};
