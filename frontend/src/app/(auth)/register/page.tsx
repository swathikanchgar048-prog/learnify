"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User as UserIcon, Loader2, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }
        if (!/\d/.test(password)) {
            setError("Password must contain at least one number.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role: "STUDENT" }),
            });

            const textData = await res.text();
            let data;
            try {
                data = JSON.parse(textData);
            } catch (err) {
                console.error("Backend returned non-JSON response:", textData.slice(0, 100));
                throw new Error("Could not connect to the server. Please check if the backend is running or NEXT_PUBLIC_API_URL is configured.");
            }

            if (!res.ok) throw new Error(data.error || "Registration failed");

            // Redirect to login on success
            router.push("/login");
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 text-white">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl shadow-blue-500/10">
                <h2 className="text-3xl font-bold tracking-tight text-center mb-2">Create Account</h2>
                <p className="text-gray-400 text-center mb-8">Join Learnify and start learning</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-300">Full Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                required
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl pl-10 pr-4 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                required
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl pl-10 pr-4 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                placeholder="you@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-300">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl pl-10 pr-10 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center mt-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-8">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
