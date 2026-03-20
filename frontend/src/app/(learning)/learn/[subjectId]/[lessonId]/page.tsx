"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ChevronLeft, PlayCircle, Lock, CheckCircle, MessageSquare, BookOpen, Send, Loader2 } from "lucide-react";

const COURSES_DATA: Record<string, any> = {
    "1": {
        title: "React Masterclass: Zero to Hero",
        sections: [
            {
                id: 1, title: "Fundamentals",
                lessons: [
                    { id: 1, title: "Learn React In 10 Minutes", duration: "10:05", completed: true, youtubeId: "bMknfKXIFA8" },
                    { id: 2, title: "React Component & Props", duration: "15:20", completed: true, youtubeId: "Y2hgEGPzTZY" },
                    { id: 3, title: "React Hooks Explained", duration: "22:15", completed: false, youtubeId: "O6P86uwfdR0" },
                ]
            }
        ]
    },
    "2": {
        title: "Python using DSA",
        sections: [
            {
                id: 1, title: "Data Structures",
                lessons: [
                    { id: 1, title: "Python DSA Full Course", duration: "5:00:00", completed: false, youtubeId: "pkYVOmU3MgA" },
                    { id: 2, title: "Linked Lists", duration: "45:20", completed: false, youtubeId: "JlMyYuY1aXU" },
                ]
            }
        ]
    },
    "3": {
        title: "Java using DSA",
        sections: [
            {
                id: 1, title: "Java Algorithms",
                lessons: [
                    { id: 1, title: "Java DSA Masterclass", duration: "4:30:00", completed: false, youtubeId: "8hly31xKli0" },
                    { id: 2, title: "Binary Trees in Java", duration: "55:20", completed: false, youtubeId: "fAAZixRoSmw" },
                ]
            }
        ]
    },
    "4": {
        title: "Python Fullstack Development",
        sections: [
            {
                id: 1, title: "Backend with Django",
                lessons: [
                    { id: 1, title: "Django Tutorial", duration: "2:00:00", completed: false, youtubeId: "F5mRW0jo-U4" },
                ]
            }
        ]
    },
    "5": {
        title: "Java Fullstack Development",
        sections: [
            {
                id: 1, title: "Spring Boot Intro",
                lessons: [
                    { id: 1, title: "Spring Boot Tutorial", duration: "3:30:00", completed: false, youtubeId: "8hly31xKli0" },
                ]
            }
        ]
    },
    "6": {
        title: "Advanced SQL Mastery",
        sections: [
            {
                id: 1, title: "Database Architecture",
                lessons: [
                    { id: 1, title: "SQL Full Course", duration: "4:00:00", completed: false, youtubeId: "HXV3zeQKqGY" },
                ]
            }
        ]
    },
    "7": {
        title: "Machine Learning A-Z",
        sections: [
            {
                id: 1, title: "Intro to ML",
                lessons: [
                    { id: 1, title: "Machine Learning Basics", duration: "2:15:00", completed: false, youtubeId: "GwIoAwHGG2A" },
                ]
            }
        ]
    },
    "8": {
        title: "Digital Marketing Masterclass",
        sections: [
            {
                id: 1, title: "Marketing Strategies",
                lessons: [
                    { id: 1, title: "Complete Digital Marketing Course", duration: "1:45:00", completed: false, youtubeId: "bixR-KIJKYM" },
                ]
            }
        ]
    }
};

export default function LearningPage({ params }: { params: Promise<{ subjectId: string, lessonId: string }> }) {
    const { subjectId, lessonId } = use(params);
    const [activeTab, setActiveTab] = useState<'chat' | 'notes' | null>('chat');
    const [chatMessage, setChatMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([
        { role: 'ai', text: 'Hello! I am your AI learning assistant. Ask me anything about this topic!' }
    ]);
    const [isAiLoading, setIsAiLoading] = useState(false);

    // Fallback if Subject not found
    const course = COURSES_DATA[subjectId] || COURSES_DATA["1"];

    // Find active lesson based on lessonId
    let activeLesson: any = course.sections[0].lessons[0];
    for (const section of course.sections) {
        for (const lesson of section.lessons) {
            if (lesson.id.toString() === lessonId) {
                activeLesson = lesson;
            }
        }
    }

    const handleAskAI = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        const userMsg = chatMessage;
        setChatMessage("");
        setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsAiLoading(true);

        try {
            const res = await fetch('/api/ai/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userMsg, context: activeLesson.title })
            });
            const data = await res.json();
            setChatHistory(prev => [...prev, { role: 'ai', text: data.answer || "Sorry, I couldn't process that." }]);
        } catch {
            setChatHistory(prev => [...prev, { role: 'ai', text: "Connection error. Ensure backend is running." }]);
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-900 text-white font-[family-name:var(--font-geist-sans)] overflow-hidden">
            <nav className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/courses" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-px bg-gray-700"></div>
                    <h1 className="font-semibold text-lg">{course.title}</h1>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab(activeTab === 'chat' ? null : 'chat')}
                        className={`p-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${activeTab === 'chat' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                    >
                        <MessageSquare className="w-4 h-4" /> AI Chat
                    </button>
                    <button
                        onClick={() => setActiveTab(activeTab === 'notes' ? null : 'notes')}
                        className={`p-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${activeTab === 'notes' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                    >
                        <BookOpen className="w-4 h-4" /> AI Notes
                    </button>
                </div>
            </nav>

            <div className="flex-1 flex overflow-hidden relative">

                <aside className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col overflow-y-auto shrink-0 hidden md:flex">
                    <div className="p-4 border-b border-gray-800">
                        <h2 className="font-bold text-lg mb-2">Curriculum</h2>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                            <div className="bg-blue-500 h-1.5 rounded-full w-2/5 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                        </div>
                        <p className="text-xs text-gray-400 text-right">0% Completed</p>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {course.sections.map((section: any) => (
                            <div key={section.id} className="border-b border-gray-800/50">
                                <div className="px-4 py-3 bg-gray-800/20 font-semibold text-sm text-gray-300">
                                    Section {section.id}: {section.title}
                                </div>
                                <div className="flex flex-col">
                                    {section.lessons.map((lesson: any) => {
                                        const isActive = lesson.id.toString() === lessonId;
                                        return (
                                            <Link
                                                key={lesson.id}
                                                href={`/learn/${subjectId}/${lesson.id}`}
                                                className={`flex items-start gap-3 p-4 border-l-2 transition-colors ${isActive ? 'border-blue-500 bg-blue-900/10' : 'border-transparent hover:bg-gray-800/50'} ${lesson.locked ? 'opacity-50 pointer-events-none' : ''}`}
                                            >
                                                <div className="mt-0.5 shrink-0">
                                                    {lesson.completed ? (
                                                        <CheckCircle className="w-5 h-5 text-blue-500" />
                                                    ) : lesson.locked ? (
                                                        <Lock className="w-5 h-5 text-gray-600" />
                                                    ) : (
                                                        <PlayCircle className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm font-medium ${isActive ? 'text-blue-100' : 'text-gray-300'}`}>{lesson.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 flex flex-col bg-black relative">
                    <div className="w-full aspect-video bg-gray-900 relative flex items-center justify-center border-b border-gray-800">
                        {activeLesson.youtubeId ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=0&rel=0`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="text-center text-gray-500">
                                <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p>Video Locked / Not Available</p>
                            </div>
                        )}
                    </div>
                    <div className="p-6 md:p-10 flex-1 overflow-y-auto bg-gray-900">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{activeLesson.title}</h2>
                        <p className="text-gray-400 leading-relaxed max-w-3xl">
                            In this lesson, you will dive deep into <strong>{activeLesson.title}</strong>.
                            Watch the comprehensive video tutorial above and follow along with the examples. Ask the AI Assistant on the right if you have any doubts!
                        </p>
                    </div>
                </main>

                {activeTab && (
                    <aside className="w-80 md:w-96 bg-gray-900 border-l border-gray-800 flex flex-col shrink-0 absolute right-0 top-0 h-full md:relative z-10 shadow-[-10px_0_20px_rgba(0,0,0,0.5)] md:shadow-none animate-in slide-in-from-right duration-300">
                        {activeTab === 'chat' && (
                            <>
                                <div className="p-4 border-b border-gray-800 flex items-center gap-2 bg-blue-900/10">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-blue-100">AI Assistant</h3>
                                        <p className="text-xs text-blue-400/80">Powered by Hugging Face</p>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {chatHistory.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'}`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isAiLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-800 rounded-2xl rounded-tl-none p-4 border border-gray-700">
                                                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 border-t border-gray-800 bg-gray-900">
                                    <form onSubmit={handleAskAI} className="relative">
                                        <input
                                            type="text"
                                            value={chatMessage}
                                            onChange={(e) => setChatMessage(e.target.value)}
                                            placeholder={`Ask about ${activeLesson.title}...`}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isAiLoading || !chatMessage.trim()}
                                            className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white disabled:opacity-50 transition-colors"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}

                        {activeTab === 'notes' && (
                            <>
                                <div className="p-4 border-b border-gray-800 flex items-center gap-2 bg-emerald-900/10">
                                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                                        <BookOpen className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-emerald-100">AI Generated Notes</h3>
                                        <p className="text-xs text-emerald-400/80">Extracted from video transcript</p>
                                    </div>
                                </div>
                                <div className="flex-1 p-6 overflow-y-auto text-sm text-gray-300 space-y-4">
                                    <h4 className="text-white font-bold text-lg mb-2">{activeLesson.title}</h4>
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li><strong className="text-emerald-400">Concept Overview</strong>: This lesson covers the fundamental concepts of {activeLesson.title}.</li>
                                        <li>Make sure to follow along with the video examples. Practice is key to mastering these topics.</li>
                                        <li><strong className="text-emerald-400">Takeaways</strong>: Always remember the core principles shown by the instructor.</li>
                                        <li>You can ask the AI Assistant if you need any clarification on the terminology used!</li>
                                    </ul>
                                    <button className="w-full mt-6 py-2 border border-emerald-500/50 text-emerald-400 text-sm font-semibold rounded-lg hover:bg-emerald-500/10 transition">
                                        Download PDF
                                    </button>
                                </div>
                            </>
                        )}
                    </aside>
                )}
            </div>
        </div>
    );
}
