"use client";

import Link from "next/link";
import { Search, Filter, Star, Clock, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { enrolledCourses, enrollCourse } = useAuthStore();

    useEffect(() => {
        setCourses([
            { id: 1, title: 'React Masterclass: Zero to Hero', instructor: 'John Doe', price: '$49.99', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', rating: 4.8, duration: '12h 30m' },
            { id: 2, title: 'Python using DSA', instructor: 'Dr. Angela Yu', price: '$89.99', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80', rating: 4.9, duration: '22h 15m' },
            { id: 3, title: 'Java using DSA', instructor: 'Tim Buchalka', price: '$74.99', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', rating: 4.7, duration: '40h 45m' },
            { id: 4, title: 'Python Fullstack Development', instructor: 'Jose Portilla', price: '$99.00', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', rating: 4.9, duration: '55h 15m' },
            { id: 5, title: 'Java Fullstack Development', instructor: 'Abdul Bari', price: '$89.50', thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80', rating: 4.8, duration: '60h 00m' },
            { id: 6, title: 'Advanced SQL Mastery', instructor: 'Colt Steele', price: '$39.50', thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80', rating: 4.9, duration: '15h 20m' },
            { id: 7, title: 'Machine Learning A-Z', instructor: 'Kirill Eremenko', price: '$95.00', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80', rating: 4.9, duration: '44h 30m' },
            { id: 8, title: 'Digital Marketing Masterclass', instructor: 'Evan Kim', price: '$49.99', thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80', rating: 4.8, duration: '20h 10m' },
        ]);
        setLoading(false);
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Explore Courses</h1>
                    <p className="text-gray-400">Discover new subjects across DSA, Fullstack, and Databases.</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:border-blue-500 w-full md:w-64"
                        />
                    </div>
                    <button className="bg-gray-800 border border-gray-700 p-2.5 rounded-xl text-gray-400 hover:text-white transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-800 rounded-2xl h-80 border border-gray-700"></div>
                    ))
                ) : (
                    courses.map((course) => (
                        <div key={course.id} className="group flex flex-col bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
                            <div className="h-48 relative overflow-hidden bg-gray-700">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                                <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur border border-gray-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                                    <Tag className="w-3.5 h-3.5 text-emerald-400" /> {course.price}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{course.title}</h3>
                                <p className="text-sm text-gray-400 mb-4">{course.instructor}</p>

                                <div className="mt-auto flex items-center justify-between text-sm mb-5">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="font-medium">{course.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-400">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>

                                {enrolledCourses.includes(course.id) ? (
                                    <Link href={`/learn/${course.id}/1`} className="w-full block py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors text-center text-sm shadow-lg shadow-emerald-500/20">
                                        Continue Course
                                    </Link>
                                ) : (
                                    <button onClick={() => enrollCourse(course.id)} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-center text-sm shadow-lg shadow-blue-500/20">
                                        Enroll Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
