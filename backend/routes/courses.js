const express = require('express');
const { Subject } = require('../models');

const router = express.Router();

const dummyCourses = [
    { title: 'React Masterclass: Zero to Hero', instructor_id: 1, description: 'Learn advanced React patterns and state management from scratch.', price: '$49.99', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', rating: 4.8, duration: '12h 30m', is_published: true },
    { title: 'Python using DSA', instructor_id: 1, description: 'Master Data Structures and Algorithms with Python.', price: '$89.99', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80', rating: 4.9, duration: '22h 15m', is_published: true },
    { title: 'Java using DSA', instructor_id: 1, description: 'Master Data Structures and Algorithms with Java.', price: '$74.99', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', rating: 4.7, duration: '40h 45m', is_published: true },
    { title: 'Python Fullstack Development', instructor_id: 1, description: 'Become a fullstack developer with Python and Django.', price: '$99.00', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', rating: 4.9, duration: '55h 15m', is_published: true },
    { title: 'Java Fullstack Development', instructor_id: 1, description: 'Become a fullstack developer with Java and Spring Boot.', price: '$89.50', thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80', rating: 4.8, duration: '60h 00m', is_published: true },
    { title: 'Advanced SQL Mastery', instructor_id: 1, description: 'Master complex queries, performance tuning, and database design.', price: '$39.50', thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80', rating: 4.9, duration: '15h 20m', is_published: true },
    { title: 'Machine Learning A-Z', instructor_id: 1, description: 'Learn to create Machine Learning Algorithms in Python.', price: '$95.00', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80', rating: 4.9, duration: '44h 30m', is_published: true },
    { title: 'Digital Marketing Masterclass', instructor_id: 1, description: 'Grow any business online with proven digital marketing strategies.', price: '$49.99', thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80', rating: 4.8, duration: '20h 10m', is_published: true },
];

router.get('/', async (req, res) => {
    try {
        let subjects = await Subject.findAll({ where: { is_published: true } });
        
        // Auto-seed if database is completely empty so UI doesn't break
        if (subjects.length === 0) {
            await Subject.bulkCreate(dummyCourses);
            subjects = await Subject.findAll({ where: { is_published: true } });
        }
        
        res.json(subjects);
    } catch (err) {
        console.error("Error fetching courses:", err);
        // Fallback to dummy data if DB is offline
        res.json(dummyCourses.map((c, i) => ({ ...c, id: i + 1 })));
    }
});

module.exports = router;
