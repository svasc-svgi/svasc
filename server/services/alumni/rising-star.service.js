const RisingStar = require('../../models/alumni/rising-star.model');
const fs = require('fs');
const path = require('path');

const getAllStars = async () => {
    return await RisingStar.find().sort({ createdAt: -1 });
};

const createStar = async (data) => {
    const star = new RisingStar(data);
    return await star.save();
};

const updateStar = async (id, data) => {
    return await RisingStar.findByIdAndUpdate(id, data, { new: true });
};

const deleteStar = async (id) => {
    const star = await RisingStar.findById(id);
    if (star && star.video) {
        const filePath = path.join(__dirname, '..', 'uploads', path.basename(star.video));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await RisingStar.findByIdAndDelete(id);
};

const getStarById = async (id) => {
    return await RisingStar.findById(id);
};

module.exports = {
    getAllStars,
    createStar,
    updateStar,
    deleteStar,
    getStarById
};
