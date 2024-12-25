import Hero from "@/Components/Home/Hero";
import { Head, Link } from "@inertiajs/react";

export default function Home({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-50 text-black/50 dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="relative w-full max-w-2xl lg:max-w-7xl">
                        <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
                            <div className="container mx-auto flex items-center justify-between p-4">
                                {/* Left side: "swuets" text */}
                                <Link
                                    href={route("home")}
                                    className="text-4xl font-bold text-blue-600"
                                >
                                    SWUETS
                                </Link>
                                {/* Right side: navigation links */}
                                <nav className="flex space-x-4">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 dark:text-black dark:hover:text-blue/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 hover:text-blue-600 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 dark:text-black hover:text-blue-600 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </div>
                        </header>

                        <main className="text-black min-h-screen flex items-center justify-center">
                            <Hero />
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
