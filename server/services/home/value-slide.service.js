const ValueSlide = require('../../models/home/value-slide.model');
const path = require('path');
const fs = require('fs');

const getAllSlides = async () => {
    return await ValueSlide.find().sort({ order: 1, createdAt: 1 });
};

const createSlide = async (data) => {
    // Auto-generate order number
    const maxOrderSlide = await ValueSlide.findOne().sort({ order: -1 });
    const nextOrder = maxOrderSlide ? maxOrderSlide.order + 1 : 1;

    const slide = new ValueSlide({
        ...data,
        order: nextOrder
    });
    return await slide.save();
};

const updateSlide = async (id, data) => {
    return await ValueSlide.findByIdAndUpdate(id, data, { new: true });
};

const deleteSlide = async (id) => {
    const slide = await ValueSlide.findById(id);
    if (slide && slide.backgroundImage) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(slide.backgroundImage));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await ValueSlide.findByIdAndDelete(id);
};

const getSlideById = async (id) => {
    return await ValueSlide.findById(id);
};

module.exports = {
    getAllSlides,
    createSlide,
    updateSlide,
    deleteSlide,
    getSlideById
};
