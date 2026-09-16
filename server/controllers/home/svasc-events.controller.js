const SvascEventsService = require('../../services/home/svasc-events.service');
const path = require('path');
const fs = require('fs');

const getAllEvents = async (req, res) => {
    try {
        const events = await SvascEventsService.getAllEvents();
        res.status(200).json({
            success: true,
            data: events,
            message: "Events fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await SvascEventsService.getEventById(id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }
        res.status(200).json({
            success: true,
            data: event,
            message: "Event fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createEvent = async (req, res) => {
    try {
        const { title, subtitle, description, author, date, link } = req.body;
        
        // Automatically assign order based on current count
        const currentCount = await SvascEventsService.getEventCount();

        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const event = await SvascEventsService.createEvent({
            title,
            subtitle,
            description,
            author,
            date,
            image: imagePath,
            link: link || '#',
            order: currentCount
        });
        res.status(201).json({
            success: true,
            data: event,
            message: "Event created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subtitle, description, author, date, link } = req.body;
        let updateData = { title, subtitle, description, author, date, link };

        if (req.file) {
            const oldEvent = await SvascEventsService.getEventById(id);
            if (oldEvent && oldEvent.image) {
                const oldFilePath = path.join(__dirname, '..', '..', 'uploads', path.basename(oldEvent.image));
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedEvent = await SvascEventsService.updateEvent(id, updateData);
        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }
        res.status(200).json({
            success: true,
            data: updatedEvent,
            message: "Event updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await SvascEventsService.deleteEvent(id);
        if (!deletedEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
