const EventsGrid = require('../../models/events/grid.model');
const fs = require('fs');
const path = require('path');

const getAllEventsGrid = async () => {
    return await EventsGrid.find().sort({ order: 1, createdAt: -1 });
};

const getEventGridById = async (id) => {
    return await EventsGrid.findById(id);
};

const getEventGridCount = async () => {
    return await EventsGrid.countDocuments();
};

const createEventGrid = async (data) => {
    const event = new EventsGrid(data);
    return await event.save();
};

const updateEventGrid = async (id, data) => {
    return await EventsGrid.findByIdAndUpdate(id, data, { new: true });
};

const deleteEventGrid = async (id) => {
    const event = await EventsGrid.findById(id);
    if (event) {
        // Delete image file
        if (event.image) {
            // Updated path to step back two levels to reach uploads
            const imagePath = path.join(__dirname, '../..', 'uploads', path.basename(event.image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
    }
    return await EventsGrid.findByIdAndDelete(id);
};

module.exports = {
    getAllEventsGrid,
    getEventGridById,
    getEventGridCount,
    createEventGrid,
    updateEventGrid,
    deleteEventGrid
};
