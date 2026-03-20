const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

// Fallback in-memory database for local demonstration when MySQL is unavailable
const mockUsers = [];

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Try real DB first
        const existingUser = await User.findOne({ where: { email } }).catch(() => null);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        await User.create({
            name,
            email,
            password_hash,
            role: role || 'STUDENT'
        });

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        // Fallback to in-memory DB if real DB is offline
        if (err.name === 'SequelizeConnectionError' || err.name === 'SequelizeHostNotFoundError' || err.parent) {
            const { name, email, password, role } = req.body;

            if (mockUsers.find(u => u.email === email)) {
                return res.status(400).json({ error: 'Email already in use' });
            }

            mockUsers.push({
                id: mockUsers.length + 1,
                name,
                email,
                password, // In memory, we keep plain or hashed depending on needs. Keeping plain for mock simplicity.
                role: role || 'STUDENT'
            });

            return res.status(201).json({ message: 'User registered successfully! (In-Memory Mock)' });
        }
        res.status(500).json({ error: 'Server error during registration', details: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Try real DB first
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password_hash);
                if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

                const token = jwt.sign(
                    { id: user.id, role: user.role },
                    process.env.JWT_SECRET || 'supersecretjwtkey',
                    { expiresIn: '15m' }
                );
                return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        } catch (dbErr) {
            // Suppress real db error to drop into mock fallback below
        }

        // Drop into mock fallback if user not found in real DB or real DB offline
        const mockUser = mockUsers.find(u => u.email === email);
        if (!mockUser) {
            return res.status(400).json({ error: 'Invalid credentials. Please register first.' });
        }

        if (mockUser.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: mockUser.id, role: mockUser.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
        return res.json({ token, user: { id: mockUser.id, name: mockUser.name, email: mockUser.email, role: mockUser.role } });

    } catch (err) {
        res.status(500).json({ error: 'Server error during login', details: err.message });
    }
});

module.exports = router;
