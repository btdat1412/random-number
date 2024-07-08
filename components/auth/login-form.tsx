"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(3, {
        message: "Password must contain at least 3 character(s)",
    }),
});

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        toast(
            `Logging in with email: ${values.email}, password: ${values.password}`,
        );

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

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
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
