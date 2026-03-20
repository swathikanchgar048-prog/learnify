const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subject = sequelize.define('Subject', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    instructor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    thumbnail: {
        type: DataTypes.STRING,
    }
});

const Section = sequelize.define('Section', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sequence_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

const Video = sequelize.define('Video', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    section_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    youtube_id: {
        type: DataTypes.STRING,
        allowNull: false, // The ID of the YouTube video
    },
    sequence_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

const Progress = sequelize.define('Progress', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    last_position_seconds: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    completed_at: {
        type: DataTypes.DATE,
    }
});

module.exports = { Subject, Section, Video, Progress };
