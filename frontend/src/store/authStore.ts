import { create } from 'zustand';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    enrolledCourses: number[];
    login: (userData: User, token: string) => void;
    logout: () => void;
    enrollCourse: (courseId: number) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    enrolledCourses: [],

    login: (user, token) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
            localStorage.setItem('auth_user', JSON.stringify(user));
            // Read enrolled from localstorage if it exists
            const savedCourses = localStorage.getItem('enrolled_courses');
            if (savedCourses) {
                try {
                    set({ user, token, isAuthenticated: true, enrolledCourses: JSON.parse(savedCourses) });
                    return;
                } catch (e) { }
            }
        }
        set({ user, token, isAuthenticated: true, enrolledCourses: [] });
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            // Deliberately keep enrolled courses in localstorage for demo simplicity, or clear it if strict.
        }
        set({ user: null, token: null, isAuthenticated: false, enrolledCourses: [] });
    },

    enrollCourse: (courseId) => {
        const { enrolledCourses } = get();
        if (!enrolledCourses.includes(courseId)) {
            const updated = [...enrolledCourses, courseId];
            if (typeof window !== 'undefined') {
                localStorage.setItem('enrolled_courses', JSON.stringify(updated));
            }
            set({ enrolledCourses: updated });
        }
    }
}));
