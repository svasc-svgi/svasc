const TeacherAward = require('../../models/about/teacher-award.model');

const getAllTeacherAwards = async () => {
    return await TeacherAward.find().sort({ year: -1, createdAt: -1 });
};

const getGroupedTeacherAwards = async () => {
    const awards = await TeacherAward.find().sort({ year: -1 });
    const grouped = {};

    awards.forEach(award => {
        if (!grouped[award.year]) {
            grouped[award.year] = [];
        }
        grouped[award.year].push([award.awardName, award.facultyName, award._id]);
    });

    return grouped;
};

const createTeacherAward = async (data) => {
    const award = new TeacherAward(data);
    return await award.save();
};

const updateTeacherAward = async (id, data) => {
    return await TeacherAward.findByIdAndUpdate(id, data, { new: true });
};

const deleteTeacherAward = async (id) => {
    return await TeacherAward.findByIdAndDelete(id);
};

module.exports = {
    getAllTeacherAwards,
    getGroupedTeacherAwards,
    createTeacherAward,
    updateTeacherAward,
    deleteTeacherAward
};
