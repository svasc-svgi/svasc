const SportHouse = require('../../models/sports/sport-house.model');
const fs = require('fs');
const path = require('path');

const getAllHouses = async () => {
    return await SportHouse.find().sort({ order: 1, createdAt: -1 });
};

const getHouseById = async (id) => {
    return await SportHouse.findById(id);
};

const createHouse = async (data) => {
    const house = new SportHouse(data);
    return await house.save();
};

const updateHouse = async (id, data) => {
    return await SportHouse.findByIdAndUpdate(id, data, { new: true });
};

const deleteHouse = async (id) => {
    const house = await SportHouse.findById(id);
    if (house && house.image) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(house.image));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await SportHouse.findByIdAndDelete(id);
};

module.exports = {
    getAllHouses,
    getHouseById,
    createHouse,
    updateHouse,
    deleteHouse
};
