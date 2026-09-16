const libraryActivityService = require('../../services/library/library-activity.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

exports.getAllActivities = async (req, res) => {
    try {
        const activities = await libraryActivityService.getAllActivities();
        res.status(200).json({ success: true, data: activities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createActivity = async (req, res) => {
    try {
        const { title, date, desc, image1: bodyImage1, image2: bodyImage2 } = req.body;
        
        let image1 = bodyImage1 || '';
        let image2 = bodyImage2 || '';
        
        if (req.files && req.files.image1 && req.files.image1[0]) {
            const uploadResult = await uploadToCloudinary(req.files.image1[0].buffer, 'svasc/library/activities', 'image');
            image1 = uploadResult.secure_url;
        }
        if (req.files && req.files.image2 && req.files.image2[0]) {
            const uploadResult = await uploadToCloudinary(req.files.image2[0].buffer, 'svasc/library/activities', 'image');
            image2 = uploadResult.secure_url;
        }

        const data = { title, date, desc, image1, image2 };
        const activity = await libraryActivityService.createActivity(data);
        res.status(201).json({ success: true, data: activity, message: 'Activity created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateActivity = async (req, res) => {
    try {
        const { title, date, desc, image1: bodyImage1, image2: bodyImage2 } = req.body;
        const updateData = {};
        if (title) updateData.title = title;
        if (date !== undefined) updateData.date = date;
        if (desc !== undefined) updateData.desc = desc;

        if (req.files && req.files.image1 && req.files.image1[0]) {
            const uploadResult = await uploadToCloudinary(req.files.image1[0].buffer, 'svasc/library/activities', 'image');
            updateData.image1 = uploadResult.secure_url;
        } else if (bodyImage1 !== undefined && bodyImage1 !== '') {
            updateData.image1 = bodyImage1;
        }

        if (req.files && req.files.image2 && req.files.image2[0]) {
            const uploadResult = await uploadToCloudinary(req.files.image2[0].buffer, 'svasc/library/activities', 'image');
            updateData.image2 = uploadResult.secure_url;
        } else if (bodyImage2 !== undefined && bodyImage2 !== '') {
            updateData.image2 = bodyImage2;
        }

        const activity = await libraryActivityService.updateActivity(req.params.id, updateData);
        if (!activity) return res.status(404).json({ success: false, message: 'Activity not found' });
        res.status(200).json({ success: true, data: activity, message: 'Activity updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        const activity = await libraryActivityService.deleteActivity(req.params.id);
        if (!activity) return res.status(404).json({ success: false, message: 'Activity not found' });
        res.status(200).json({ success: true, message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
