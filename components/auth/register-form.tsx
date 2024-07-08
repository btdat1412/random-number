"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

// Assets
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    name: z.string().min(1, {
        message: "Please enter your full name properly",
    }),
    password: z
        .string()
        .min(1, "Password is required")
        .min(3, "Password must contain at least 3 character(s)"),
});

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        toast(`Registering with email: ${values.email}`);

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        setIsLoading(false);

        if (response.ok) {
            toast.success("You have successfully registered! Let's login.");
            router.push("/login");
        } else {
            toast.error("Something went wrong!");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>

                            <FormControl>
                                <Input
                                    {...field}
                                    autoFocus
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    placeholder="pd.quocdat@gmail.com"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full name</FormLabel>

                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Dat Phan"
                                    disabled={isLoading}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>

                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    disabled={isLoading}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator className="px-2" />

                <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
