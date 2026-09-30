const ExamPortalConfig = require('../../models/exam/exam-portal-config.model');

const getConfig = async () => {
    let config = await ExamPortalConfig.findOne();
    if (!config) {
        config = new ExamPortalConfig({
            floatingTitle: 'Semester Exams',
            floatingDateRange: 'Jan 20 - Feb 05',
            floatingSubjects: '6 Papers',
            floatingStatus: 'Scheduled',
            schedules: []
        });
        await config.save();
    }
    return config;
};

const updateConfig = async (data) => {
    let config = await ExamPortalConfig.findOne();
    if (!config) {
        config = new ExamPortalConfig(data);
    } else {
        if (data.image1 !== undefined) config.image1 = data.image1;
        if (data.image2 !== undefined) config.image2 = data.image2;
        if (data.image3 !== undefined) config.image3 = data.image3;
        if (data.floatingTitle !== undefined) config.floatingTitle = data.floatingTitle;
        if (data.floatingDateRange !== undefined) config.floatingDateRange = data.floatingDateRange;
        if (data.floatingSubjects !== undefined) config.floatingSubjects = data.floatingSubjects;
        if (data.floatingStatus !== undefined) config.floatingStatus = data.floatingStatus;
        if (data.schedules !== undefined) {
            config.schedules = data.schedules;
            config.markModified('schedules');
        }
    }
    return await config.save();
};

module.exports = {
    getConfig,
    updateConfig
};
