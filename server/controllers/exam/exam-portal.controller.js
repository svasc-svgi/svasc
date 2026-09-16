const ExamPortalService = require('../../services/exam/exam-portal.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

const getConfig = async (req, res) => {
    try {
        const config = await ExamPortalService.getConfig();
        res.status(200).json({ success: true, data: config });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateConfig = async (req, res) => {
    try {
        const { floatingTitle, floatingDateRange, floatingSubjects, floatingStatus, schedules } = req.body;
        const updateData = {};
        if (floatingTitle !== undefined) updateData.floatingTitle = floatingTitle;
        if (floatingDateRange !== undefined) updateData.floatingDateRange = floatingDateRange;
        if (floatingSubjects !== undefined) updateData.floatingSubjects = floatingSubjects;
        if (floatingStatus !== undefined) updateData.floatingStatus = floatingStatus;

        if (schedules) {
            if (typeof schedules === 'string') {
                try {
                    updateData.schedules = JSON.parse(schedules);
                } catch (e) {
                    return res.status(400).json({ success: false, message: "Schedules must be a valid JSON array" });
                }
            } else if (Array.isArray(schedules)) {
                updateData.schedules = schedules;
            }
        }

        // Support direct Cloudinary image URLs from req.body
        ['image1', 'image2', 'image3'].forEach(fieldName => {
            if (req.body[fieldName] !== undefined && typeof req.body[fieldName] === 'string' && req.body[fieldName] !== '') {
                updateData[fieldName] = req.body[fieldName];
            }
        });

        // Support multipart uploaded files via Cloudinary
        if (req.files) {
            for (const fieldName of ['image1', 'image2', 'image3']) {
                if (req.files[fieldName] && req.files[fieldName].length > 0) {
                    const uploadResult = await uploadToCloudinary(req.files[fieldName][0].buffer, 'svasc/exam/portal', 'image');
                    updateData[fieldName] = uploadResult.secure_url;
                }
            }
        }

        const config = await ExamPortalService.updateConfig(updateData);
        res.status(200).json({
            success: true,
            data: config,
            message: "Exam Portal configuration updated successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getConfig,
    updateConfig
};
