const HomeHeroSlide = require('../models/home-hero-slide.model');
const fs = require('fs');
const path = require('path');

const getAllSlides = async () => {
    return await HomeHeroSlide.find().sort({ order: 1, createdAt: -1 });
};

const getSlideById = async (id) => {
    return await HomeHeroSlide.findById(id);
};

const createSlide = async (data) => {
    const slide = new HomeHeroSlide(data);
    return await slide.save();
};

const updateSlide = async (id, data) => {
    return await HomeHeroSlide.findByIdAndUpdate(id, data, { new: true });
};

const deleteSlide = async (id) => {
    const slide = await HomeHeroSlide.findById(id);
    if (slide && slide.src) {
        const filePath = path.join(__dirname, '..', 'uploads', path.basename(slide.src));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await HomeHeroSlide.findByIdAndDelete(id);
};

module.exports = {
    getAllSlides,
    getSlideById,
    createSlide,
    updateSlide,
    deleteSlide
};
