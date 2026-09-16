const EventsGridService = require('../../services/events/grid.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

const getAllEventsGrid = async (req, res) => {
    try {
        const events = await EventsGridService.getAllEventsGrid();
        res.status(200).json({
            success: true,
            data: events,
            message: "Events grid fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEventGridById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await EventsGridService.getEventGridById(id);
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

const createEventGrid = async (req, res) => {
    try {
        const { title, date, description, spanTwoCols, image: textImage } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Event title is required"
            });
        }

        let imageUrl = textImage || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/events/grid', 'image');
            imageUrl = uploadResult.secure_url;
        }

        const currentCount = await EventsGridService.getEventGridCount();

        const event = await EventsGridService.createEventGrid({
            title,
            date,
            description: description || '',
            image: imageUrl,
            spanTwoCols: spanTwoCols === 'true' || spanTwoCols === true,
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

const updateEventGrid = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, description, spanTwoCols, image: textImage } = req.body;
        let updateData = {};
        if (title) updateData.title = title;
        if (date !== undefined) updateData.date = date;
        if (description !== undefined) updateData.description = description;

        if (spanTwoCols !== undefined) {
            updateData.spanTwoCols = spanTwoCols === 'true' || spanTwoCols === true;
        }

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/events/grid', 'image');
            updateData.image = uploadResult.secure_url;
        } else if (textImage !== undefined && textImage !== '') {
            updateData.image = textImage;
        }

        const updatedEvent = await EventsGridService.updateEventGrid(id, updateData);
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

const deleteEventGrid = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await EventsGridService.deleteEventGrid(id);
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
    getAllEventsGrid,
    getEventGridById,
    createEventGrid,
    updateEventGrid,
    deleteEventGrid
};
