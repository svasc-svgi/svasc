const SvascEvents = require('../../models/home/svasc-events.model');
const fs = require('fs');
const path = require('path');

const getAllEvents = async () => {
    return await SvascEvents.find().sort({ order: 1, createdAt: -1 });
};

const getEventById = async (id) => {
    return await SvascEvents.findById(id);
};

const getEventCount = async () => {
    return await SvascEvents.countDocuments();
};

const createEvent = async (data) => {
    const event = new SvascEvents(data);
    return await event.save();
};

const updateEvent = async (id, data) => {
    return await SvascEvents.findByIdAndUpdate(id, data, { new: true });
};

const deleteEvent = async (id) => {
    const event = await SvascEvents.findById(id);
    if (event && event.image) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(event.image));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await SvascEvents.findByIdAndDelete(id);
};

module.exports = {
    getAllEvents,
    getEventById,
    getEventCount,
    createEvent,
    updateEvent,
    deleteEvent
};
