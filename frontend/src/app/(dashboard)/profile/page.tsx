"use client";

import { useAuthStore } from "@/store/authStore";
import { User as UserIcon, Award, Clock, BookOpen, Settings, LogOut, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
    const { user, logout, enrolledCourses } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const getCourseTitle = (id: number) => {
        const titles: Record<number, string> = {
            1: "React Masterclass",
            2: "Python using DSA",
            3: "Java using DSA",
            4: "Python Fullstack",
            5: "Java Fullstack",
            6: "Advanced SQL",
            7: "Machine Learning A-Z",
            8: "Digital Marketing"
        };
        return titles[id] || `Course #${id}`;
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-white">Your Profile</h1>
                <p className="text-gray-400">Manage your account settings and view your learning achievements.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 border border-gray-700 bg-gray-800 rounded-2xl p-6 text-center shadow-xl h-max">
                    <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center font-bold text-4xl mx-auto mb-4 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                        {user?.name?.[0]?.toUpperCase() || <UserIcon className="w-10 h-10" />}
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-wide">{user?.name || "Student"}</h2>
                    <p className="text-blue-400 text-sm font-medium mb-6">{user?.role || "STUDENT"}</p>

                    <div className="w-full bg-gray-700/50 rounded-xl p-4 text-left border border-gray-600/50">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                        <p className="text-sm text-gray-200 mb-4">{user?.email || "student@learnify.com"}</p>

                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Member Since</p>
                        <p className="text-sm text-gray-200">March 2026</p>
                    </div>

                    <button className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors text-sm font-medium">
                        <Settings className="w-4 h-4" /> Edit Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors text-sm font-medium border border-red-500/20"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
                            <BookOpen className="w-8 h-8 text-blue-400 mb-2" />
                            <p className="text-3xl font-bold text-white">{enrolledCourses.length}</p>
                            <p className="text-xs text-gray-400">Enrolled Courses</p>
                        </div>
                        <div className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
                            <Clock className="w-8 h-8 text-emerald-400 mb-2" />
                            <p className="text-3xl font-bold text-white">0h</p>
                            <p className="text-xs text-gray-400">Time Learned</p>
                        </div>
                        <div className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center col-span-2 lg:col-span-1">
                            <Award className="w-8 h-8 text-purple-400 mb-2" />
                            <p className="text-3xl font-bold text-white">0</p>
                            <p className="text-xs text-gray-400">Certificates</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-400" /> Active Enrollments
                        </h3>
                        {enrolledCourses.length === 0 ? (
                            <div className="border border-gray-700/50 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-gray-900/30 text-center">
                                <BookOpen className="w-10 h-10 text-gray-600 mb-3" />
                                <h4 className="font-medium text-gray-300 mb-1">No Enrollments Yet</h4>
                                <p className="text-sm text-gray-500 max-w-sm mb-4">You haven't enrolled in any courses. Explore the catalog to start learning!</p>
                                <Link href="/courses" className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg transition">Explore</Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {enrolledCourses.map(id => (
                                    <div key={id} className="p-4 rounded-xl border border-gray-700 bg-gray-900 flex items-center justify-between hover:border-gray-500 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                                            <span className="font-medium text-white">{getCourseTitle(id)}</span>
                                        </div>
                                        <Link href={`/learn/${id}/1`} className="text-sm bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition border border-gray-600">
                                            Resume
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-purple-400" /> Your Certificates
                        </h3>
                        <div className="border border-gray-700/50 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-gray-900/30 text-center">
                            <Award className="w-10 h-10 text-gray-600 mb-3" />
                            <h4 className="font-medium text-gray-300 mb-1">No Certificates Yet</h4>
                            <p className="text-sm text-gray-500 max-w-sm">Complete your first course to earn a recognized certificate of achievement.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
