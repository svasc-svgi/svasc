const EventsMarquee = require('../../models/events/marquee.model');
const fs = require('fs');
const path = require('path');

const getAllEventsMarquee = async () => {
    return await EventsMarquee.find().sort({ order: 1, createdAt: -1 });
};

const getEventMarqueeById = async (id) => {
    return await EventsMarquee.findById(id);
};

const getEventMarqueeCount = async () => {
    return await EventsMarquee.countDocuments();
};

const createEventMarquee = async (data) => {
    const event = new EventsMarquee(data);
    return await event.save();
};

const updateEventMarquee = async (id, data) => {
    return await EventsMarquee.findByIdAndUpdate(id, data, { new: true });
};

const deleteEventMarquee = async (id) => {
    const event = await EventsMarquee.findById(id);
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
    return await EventsMarquee.findByIdAndDelete(id);
};

module.exports = {
    getAllEventsMarquee,
    getEventMarqueeById,
    getEventMarqueeCount,
    createEventMarquee,
    updateEventMarquee,
    deleteEventMarquee
};
