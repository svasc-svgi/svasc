const ActivitiesService = require('../services/activities.service');
const path = require('path');
const fs = require('fs');

const getAllActivities = async (req, res) => {
    try {
        const activities = await ActivitiesService.getAllActivities();
        res.status(200).json({ success: true, data: activities, message: "Activities fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await ActivitiesService.getActivityById(id);
        if (!activity) return res.status(404).json({ success: false, message: "Activity not found" });
        res.status(200).json({ success: true, data: activity, message: "Activity fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createActivity = async (req, res) => {
    try {
        const { category, description, cardTitles, cardDescriptions } = req.body;

        let parsedCardTitles = [];
        let parsedCardDescriptions = [];
        if (cardTitles) {
            try { parsedCardTitles = JSON.parse(cardTitles); } catch (e) { parsedCardTitles = []; }
        }
        if (cardDescriptions) {
            try { parsedCardDescriptions = JSON.parse(cardDescriptions); } catch (e) { parsedCardDescriptions = []; }
        }

        const currentCount = await ActivitiesService.getActivityCount();

        const cards = (req.files && req.files.cardImages) ? req.files.cardImages.map((file, index) => ({
            title: parsedCardTitles[index] || '',
            description: parsedCardDescriptions[index] || '',
            image: `/uploads/${file.filename}`
        })) : [];

        const bannerImagePath = (req.files && req.files.bannerImage && req.files.bannerImage[0])
            ? `/uploads/${req.files.bannerImage[0].filename}`
            : null;

        const activity = await ActivitiesService.createActivity({
            category,
            description,
            bannerImage: bannerImagePath,
            cards,
            order: currentCount
        });

        res.status(201).json({ success: true, data: activity, message: "Activity created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, description, cardTitles, cardDescriptions } = req.body;
        let updateData = { category, description };

        if (req.files && req.files.bannerImage && req.files.bannerImage.length > 0) {
            const oldActivity = await ActivitiesService.getActivityById(id);
            if (oldActivity && oldActivity.bannerImage) {
                const oldFilePath = path.join(__dirname, '..', 'uploads', path.basename(oldActivity.bannerImage));
                if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
            }
            updateData.bannerImage = `/uploads/${req.files.bannerImage[0].filename}`;
        }

        if (req.files && req.files.cardImages && req.files.cardImages.length > 0) {
            let parsedCardTitles = [];
            let parsedCardDescriptions = [];
            if (cardTitles) {
                try { parsedCardTitles = JSON.parse(cardTitles); } catch (e) { parsedCardTitles = []; }
            }
            if (cardDescriptions) {
                try { parsedCardDescriptions = JSON.parse(cardDescriptions); } catch (e) { parsedCardDescriptions = []; }
            }

            const oldActivity = await ActivitiesService.getActivityById(id);
            if (oldActivity && oldActivity.cards) {
                oldActivity.cards.forEach(card => {
                    if (card.image) {
                        const oldCardPath = path.join(__dirname, '..', 'uploads', path.basename(card.image));
                        if (fs.existsSync(oldCardPath)) fs.unlinkSync(oldCardPath);
                    }
                });
            }

            updateData.cards = req.files.cardImages.map((file, index) => ({
                title: parsedCardTitles[index] || '',
                description: parsedCardDescriptions[index] || '',
                image: `/uploads/${file.filename}`
            }));
        }

        const updatedActivity = await ActivitiesService.updateActivity(id, updateData);
        if (!updatedActivity) return res.status(404).json({ success: false, message: "Activity not found" });
        res.status(200).json({ success: true, data: updatedActivity, message: "Activity updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await ActivitiesService.deleteActivity(id);
        if (!deletedActivity) return res.status(404).json({ success: false, message: "Activity not found" });
        res.status(200).json({ success: true, message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllActivities, getActivityById, createActivity, updateActivity, deleteActivity };
