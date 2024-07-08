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
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/auth/login-form";

// Assets
import { Dices } from "lucide-react";

const LoginPage = () => {
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


                    <LoginForm />

                    <div>
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-sm font-bold text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
            </Card>
        </div>
    );
};
export default LoginPage;
