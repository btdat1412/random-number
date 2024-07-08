// Components
import Navbar from "@/components/navbar";
import Header from "@/components/header";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Navbar />

            <div className="flex flex-col">
                <Header />

                <main className="p-4 lg:p-6">{children}</main>
            </div>
        </div>
    );
}
