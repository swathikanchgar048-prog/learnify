"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { PlayCircle, Award, Clock, ArrowRight } from "lucide-react";

export default function DashboardPage() {
    const { user, enrolledCourses } = useAuthStore();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, {user?.name || 'Student'}!</h1>
                <p className="text-gray-400">Ready to start your learning journey?</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 font-medium">Courses in Progress</h3>
                        <PlayCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-4xl font-bold text-white">{enrolledCourses.length}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 font-medium">Hours Learned</h3>
                        <Clock className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-4xl font-bold text-white">0</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 font-medium">Certificates Earned</h3>
                        <Award className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-4xl font-bold text-white">0</p>
                </div>
            </div>

            {/* Continue Learning */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Start Learning</h2>
                <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl p-8 flex flex-col justify-center items-center text-center">
                    {enrolledCourses.length > 0 ? (
                        <>
                            <PlayCircle className="w-16 h-16 text-emerald-500 mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Resume where you left off</h3>
                            <p className="text-gray-400 mb-6">You are actively enrolled in {enrolledCourses.length} courses.</p>
                            <Link href={`/learn/${enrolledCourses[0]}/1`} className="inline-flex justify-center items-center gap-2 py-3 px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors w-max shadow-lg shadow-emerald-500/20">
                                Jump Back In <ArrowRight className="w-4 h-4" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <PlayCircle className="w-16 h-16 text-blue-500 mb-4 opacity-50" />
                            <h3 className="text-2xl font-bold text-white mb-2">Your journey begins here</h3>
                            <p className="text-gray-400 mb-6 max-w-md">You haven't enrolled in any courses yet. Browse our library to start mastering new skills!</p>
                            <Link href="/courses" className="inline-flex justify-center items-center gap-2 py-3 px-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors w-max shadow-lg shadow-blue-500/20">
                                Explore Catalog <ArrowRight className="w-4 h-4" />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
