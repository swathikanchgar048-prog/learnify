"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, User as UserIcon, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (mounted && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, mounted, router]);

    if (!mounted || !isAuthenticated) return null;

    const navLinks = [
        { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Courses", href: "/courses", icon: <BookOpen className="w-5 h-5" /> },
        { name: "Profile", href: "/profile", icon: <UserIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-900 flex text-white font-[family-name:var(--font-geist-sans)]">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold tracking-tight text-blue-400">Learnify</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === link.href ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                }`}
                        >
                            {link.icon}
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
                            {user?.name?.[0] || "U"}
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{user?.name}</p>
                            <p className="text-xs text-gray-400">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            router.push("/login");
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
