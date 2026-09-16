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
        Object.assign(config, data);
    }
    return await config.save();
};

module.exports = {
    getConfig,
    updateConfig
};
