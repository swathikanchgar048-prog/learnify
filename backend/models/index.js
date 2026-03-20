const User = require('./User');
const { Subject, Section, Video, Progress } = require('./Course');

// Subject belongs to Instructor (User)
Subject.belongsTo(User, { foreignKey: 'instructor_id', as: 'Instructor' });
User.hasMany(Subject, { foreignKey: 'instructor_id' });

// Sections belong to Subject
Section.belongsTo(Subject, { foreignKey: 'subject_id' });
Subject.hasMany(Section, { foreignKey: 'subject_id' });

// Videos belong to Section
Video.belongsTo(Section, { foreignKey: 'section_id' });
Section.hasMany(Video, { foreignKey: 'section_id' });

// Progress tracks Videos and Users
Progress.belongsTo(User, { foreignKey: 'user_id' });
Progress.belongsTo(Video, { foreignKey: 'video_id' });

module.exports = { User, Subject, Section, Video, Progress };
