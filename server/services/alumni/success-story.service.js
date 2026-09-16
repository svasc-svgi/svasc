const SuccessStory = require('../../models/alumni/success-story.model');
const fs = require('fs');
const path = require('path');

const getAllStories = async () => {
    return await SuccessStory.find().sort({ order: 1, createdAt: -1 });
};

const createStory = async (data) => {
    const story = new SuccessStory(data);
    return await story.save();
};

const updateStory = async (id, data) => {
    return await SuccessStory.findByIdAndUpdate(id, data, { new: true });
};

const deleteStory = async (id) => {
    const story = await SuccessStory.findById(id);
    if (story && story.image) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(story.image));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await SuccessStory.findByIdAndDelete(id);
};

const getStoryById = async (id) => {
    return await SuccessStory.findById(id);
};

module.exports = {
    getAllStories,
    createStory,
    updateStory,
    deleteStory,
    getStoryById
};
