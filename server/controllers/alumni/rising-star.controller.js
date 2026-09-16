const RisingStarService = require('../../services/alumni/rising-star.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

const getAllStars = async (req, res) => {
    try {
        const stars = await RisingStarService.getAllStars();
        res.status(200).json({
            success: true,
            data: stars,
            message: "Rising Stars fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createStar = async (req, res) => {
    try {
        const { name, degree, video: textVideo } = req.body;
        
        let videoUrl = textVideo || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/alumni/rising-stars', 'video');
            videoUrl = uploadResult.secure_url;
        }

        if (!name || !degree || !videoUrl) {
            return res.status(400).json({
                success: false,
                message: 'Name, degree, and video are required'
            });
        }

        const star = await RisingStarService.createStar({ name, degree, video: videoUrl });
        res.status(201).json({
            success: true,
            data: star,
            message: "Rising Star created successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateStar = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, degree, video: textVideo } = req.body;
        let updateData = {};

        if (name) updateData.name = name;
        if (degree) updateData.degree = degree;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/alumni/rising-stars', 'video');
            updateData.video = uploadResult.secure_url;
        } else if (textVideo !== undefined && textVideo !== '') {
            updateData.video = textVideo;
        }

        const updatedStar = await RisingStarService.updateStar(id, updateData);
        if (!updatedStar) {
            return res.status(404).json({ success: false, message: "Rising Star not found" });
        }
        res.status(200).json({
            success: true,
            data: updatedStar,
            message: "Rising Star updated successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteStar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStar = await RisingStarService.deleteStar(id);
        if (!deletedStar) {
            return res.status(404).json({ success: false, message: "Rising Star not found" });
        }
        res.status(200).json({
            success: true,
            message: 'Rising Star deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllStars,
    createStar,
    updateStar,
    deleteStar
};
