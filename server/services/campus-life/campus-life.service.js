const CampusLifeGallery = require('../../models/campus-life/campus-life-gallery.model');
const CampusLifeScroll = require('../../models/campus-life/campus-life-scroll.model');
const fs = require('fs');
const path = require('path');

// Gallery Services
const getAllGallery = async () => {
    return await CampusLifeGallery.find().sort({ order: 1, createdAt: -1 });
};

const getGalleryById = async (id) => {
    return await CampusLifeGallery.findById(id);
};

const createGallery = async (data) => {
    const item = new CampusLifeGallery(data);
    return await item.save();
};

const updateGallery = async (id, data) => {
    return await CampusLifeGallery.findByIdAndUpdate(id, data, { new: true });
};

const deleteGallery = async (id) => {
    const item = await CampusLifeGallery.findById(id);
    if (item && item.image) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(item.image));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await CampusLifeGallery.findByIdAndDelete(id);
};

// Scroll Items Services
const getAllScroll = async () => {
    return await CampusLifeScroll.find().sort({ order: 1, createdAt: -1 });
};

const getScrollById = async (id) => {
    return await CampusLifeScroll.findById(id);
};

const createScroll = async (data) => {
    const item = new CampusLifeScroll(data);
    return await item.save();
};

const updateScroll = async (id, data) => {
    return await CampusLifeScroll.findByIdAndUpdate(id, data, { new: true });
};

const deleteScroll = async (id) => {
    const item = await CampusLifeScroll.findById(id);
    if (item && item.image) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(item.image));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await CampusLifeScroll.findByIdAndDelete(id);
};

module.exports = {
    getAllGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery,
    getAllScroll,
    getScrollById,
    createScroll,
    updateScroll,
    deleteScroll
};
