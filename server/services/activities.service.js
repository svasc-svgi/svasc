const Activities = require('../models/activities.model');
const fs = require('fs');
const path = require('path');

const getAllActivities = async () => {
    return await Activities.find().sort({ order: 1, createdAt: -1 });
};

const getActivityById = async (idOrSlug) => {
    try {
        if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
            const byId = await Activities.findById(idOrSlug);
            if (byId) return byId;
        }
    } catch (e) {}

    // Find by category match
    const clean = idOrSlug.toLowerCase().replace(/[-_]/g, ' ');
    const byCategory = await Activities.findOne({
        $or: [
            { category: new RegExp(`^${idOrSlug}$`, 'i') },
            { category: new RegExp(clean, 'i') },
            { 'cards.title': new RegExp(`^${idOrSlug}$`, 'i') },
            { 'cards.title': new RegExp(clean, 'i') }
        ]
    });
    return byCategory;
};


const getActivityCount = async () => {
    return await Activities.countDocuments();
};

const createActivity = async (data) => {
    const activity = new Activities(data);
    return await activity.save();
};

const updateActivity = async (id, data) => {
    return await Activities.findByIdAndUpdate(id, data, { new: true });
};

const deleteActivity = async (id) => {
    const activity = await Activities.findById(id);
    if (activity) {
        // Delete banner image
        if (activity.bannerImage) {
            const bannerPath = path.join(__dirname, '..', 'uploads', path.basename(activity.bannerImage));
            if (fs.existsSync(bannerPath)) {
                fs.unlinkSync(bannerPath);
            }
        }

        // Delete all card images
        if (activity.cards && activity.cards.length > 0) {
            activity.cards.forEach(card => {
                if (card.image) {
                    const cardImagePath = path.join(__dirname, '..', 'uploads', path.basename(card.image));
                    if (fs.existsSync(cardImagePath)) {
                        fs.unlinkSync(cardImagePath);
                    }
                }
            });
        }
    }
    return await Activities.findByIdAndDelete(id);
};

module.exports = {
    getAllActivities,
    getActivityById,
    getActivityCount,
    createActivity,
    updateActivity,
    deleteActivity
};
