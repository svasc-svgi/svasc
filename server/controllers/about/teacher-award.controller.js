const teacherAwardService = require('../../services/about/teacher-award.service');

exports.getGroupedAwards = async (req, res) => {
    try {
        const grouped = await teacherAwardService.getGroupedTeacherAwards();
        res.status(200).json({ success: true, data: grouped });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllAwards = async (req, res) => {
    try {
        const awards = await teacherAwardService.getAllTeacherAwards();
        res.status(200).json({ success: true, data: awards });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createAward = async (req, res) => {
    try {
        const award = await teacherAwardService.createTeacherAward(req.body);
        res.status(201).json({ success: true, data: award, message: 'Award created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAward = async (req, res) => {
    try {
        const award = await teacherAwardService.updateTeacherAward(req.params.id, req.body);
        if (!award) return res.status(404).json({ success: false, message: 'Award not found' });
        res.status(200).json({ success: true, data: award, message: 'Award updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteAward = async (req, res) => {
    try {
        const award = await teacherAwardService.deleteTeacherAward(req.params.id);
        if (!award) return res.status(404).json({ success: false, message: 'Award not found' });
        res.status(200).json({ success: true, message: 'Award deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
