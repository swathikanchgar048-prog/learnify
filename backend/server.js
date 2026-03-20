const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
require('./models'); // Import relationships

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api', (req, res) => {
    res.json({ message: 'Learnify Backend API is running!' });
});

app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'OK', db: 'Connected' });
    } catch (e) {
        res.status(500).json({ status: 'ERROR', db: 'Disconnected', error: e.message });
    }
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Try to connect and sync DB. Alter creates missing tables.
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync({ alter: true });
        console.log('Database synced.');
    } catch (error) {
        console.error('Unable to connect to the database. The server will start, but DB features will fail:', error.message);
    }

    app.listen(PORT, () => {
        console.log(`Learnify Server is running on port ${PORT}`);
    });
};

startServer();
