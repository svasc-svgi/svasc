const EventsMarqueeService = require('../../services/events/marquee.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

const getAllEventsMarquee = async (req, res) => {
    try {
        const events = await EventsMarqueeService.getAllEventsMarquee();
        res.status(200).json({
            success: true,
            data: events,
            message: "Events marquee fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEventMarqueeById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await EventsMarqueeService.getEventMarqueeById(id);
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

const createEventMarquee = async (req, res) => {
    try {
        const { title, day, month, description, url, youtubeUrl, image: textImage } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Event title is required"
            });
        }

        let imageUrl = textImage || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/events/marquee', 'image');
            imageUrl = uploadResult.secure_url;
        }

        const currentCount = await EventsMarqueeService.getEventMarqueeCount();

        const event = await EventsMarqueeService.createEventMarquee({
            title,
            day: day || '',
            month: month || '',
            description: description || '',
            url: url || '#',
            youtubeLink: youtubeUrl || '',
            image: imageUrl,
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

const updateEventMarquee = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, day, month, description, url, youtubeUrl, image: textImage } = req.body;
        let updateData = {};
        if (title) updateData.title = title;
        if (day !== undefined) updateData.day = day;
        if (month !== undefined) updateData.month = month;
        if (description !== undefined) updateData.description = description;
        if (url !== undefined) updateData.url = url;
        if (youtubeUrl !== undefined) updateData.youtubeLink = youtubeUrl;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/events/marquee', 'image');
            updateData.image = uploadResult.secure_url;
        } else if (textImage !== undefined && textImage !== '') {
            updateData.image = textImage;
        }

        const updatedEvent = await EventsMarqueeService.updateEventMarquee(id, updateData);
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

const deleteEventMarquee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await EventsMarqueeService.deleteEventMarquee(id);
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
    getAllEventsMarquee,
    getEventMarqueeById,
    createEventMarquee,
    updateEventMarquee,
    deleteEventMarquee
};
