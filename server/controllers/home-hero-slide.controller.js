const HomeHeroSlideService = require('../services/home-hero-slide.service');
const { uploadToCloudinary } = require('../middlewares/uploadMiddleware');

const getAllSlides = async (req, res) => {
    try {
        const slides = await HomeHeroSlideService.getAllSlides();
        res.status(200).json({
            success: true,
            data: slides,
            message: "Home Hero Slides fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createSlide = async (req, res) => {
    try {
        const { type, title, description, link, linkLabel, alignLeft, order, src: textSrc } = req.body;
        
        let mediaSrc = textSrc || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/hero-slides');
            mediaSrc = uploadResult.secure_url;
        }

        let mediaType = type || (mediaSrc.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image');

        const slide = await HomeHeroSlideService.createSlide({
            type: mediaType,
            src: mediaSrc,
            title: title || '',
            description: description || '',
            link: link || '#',
            linkLabel: linkLabel || 'Explore',
            alignLeft: alignLeft === 'true' || alignLeft === true,
            order: order !== undefined ? parseInt(order, 10) : 0
        });

        res.status(201).json({
            success: true,
            data: slide,
            message: "Home Hero Slide created successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateSlide = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, title, description, link, linkLabel, alignLeft, order, src: textSrc } = req.body;
        const updateData = {};
        
        if (type !== undefined) updateData.type = type;
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (link !== undefined) updateData.link = link;
        if (linkLabel !== undefined) updateData.linkLabel = linkLabel;
        if (alignLeft !== undefined) updateData.alignLeft = alignLeft === 'true' || alignLeft === true;
        if (order !== undefined) updateData.order = parseInt(order, 10);

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/hero-slides');
            updateData.src = uploadResult.secure_url;
            if (!type) {
                updateData.type = req.file.mimetype.startsWith('video/') || uploadResult.secure_url.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image';
            }
        } else if (textSrc !== undefined && textSrc !== '') {
            updateData.src = textSrc;
        }

        const updatedSlide = await HomeHeroSlideService.updateSlide(id, updateData);
        if (!updatedSlide) {
            return res.status(404).json({ success: false, message: "Slide not found" });
        }

        res.status(200).json({
            success: true,
            data: updatedSlide,
            message: "Home Hero Slide updated successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteSlide = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSlide = await HomeHeroSlideService.deleteSlide(id);
        if (!deletedSlide) {
            return res.status(404).json({ success: false, message: "Slide not found" });
        }
        res.status(200).json({
            success: true,
            message: "Home Hero Slide deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllSlides,
    createSlide,
    updateSlide,
    deleteSlide
};

