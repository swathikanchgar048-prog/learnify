"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [dbStatus, setDbStatus] = useState("Loading...");

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setDbStatus(data.status === 'OK' ? "Connected \u2705" : "Error \u274c"))
      .catch(() => setDbStatus("Disconnected \u274c"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-[family-name:var(--font-geist-sans)]">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-gray-800 border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-tight text-blue-400">Learnify</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm bg-gray-700 px-3 py-1 rounded-full text-gray-300">
            DB Status: {dbStatus}
          </span>
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-500/30">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Master Any Skill,<br /> AI-Powered Learning
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mb-12">
          Structured courses, automated quizzes, and AI assistance all in one unified platform. Start your learning journey today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 text-left overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">React Masterclass {i}</h3>
              <p className="text-gray-400 text-sm mb-4">Learn advanced React patterns and state management from scratch.</p>
              <button className="text-blue-400 font-medium text-sm hover:text-blue-300 flex items-center gap-1">
                View Course <span className="text-lg leading-none">&rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Learnify Platform. AI Assisted Learning.
      </footer>
    </div>
  );
}
