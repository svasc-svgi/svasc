const ValueSlideService = require('../../services/home/value-slide.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

const getAllSlides = async (req, res) => {
    try {
        const slides = await ValueSlideService.getAllSlides();
        res.status(200).json({
            success: true,
            data: slides,
            message: "Value Slides fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createSlide = async (req, res) => {
    try {
        const { field1, field2, field3, field4, field5, backgroundImage: textBg, order } = req.body;

        let backgroundImage = textBg || 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/value-slides');
            backgroundImage = uploadResult.secure_url;
        }

        const slide = await ValueSlideService.createSlide({
            backgroundImage,
            field1: field1 || '',
            field2: field2 || '',
            field3: field3 || '',
            field4: field4 || '',
            field5: field5 || '',
            order: order !== undefined ? parseInt(order, 10) : undefined
        });

        res.status(201).json({
            success: true,
            data: slide,
            message: "Value Slide created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateSlide = async (req, res) => {
    try {
        const { id } = req.params;
        const { field1, field2, field3, field4, field5, order, backgroundImage: textBg } = req.body;

        const updateData = {};
        if (field1 !== undefined) updateData.field1 = field1;
        if (field2 !== undefined) updateData.field2 = field2;
        if (field3 !== undefined) updateData.field3 = field3;
        if (field4 !== undefined) updateData.field4 = field4;
        if (field5 !== undefined) updateData.field5 = field5;
        if (order !== undefined) updateData.order = parseInt(order, 10);

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/value-slides');
            updateData.backgroundImage = uploadResult.secure_url;
        } else if (textBg !== undefined && textBg !== '') {
            updateData.backgroundImage = textBg;
        }

        const updatedSlide = await ValueSlideService.updateSlide(id, updateData);
        if (!updatedSlide) {
            return res.status(404).json({
                success: false,
                message: "Value Slide not found"
            });
        }
        res.status(200).json({
            success: true,
            data: updatedSlide,
            message: "Value Slide updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteSlide = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSlide = await ValueSlideService.deleteSlide(id);
        if (!deletedSlide) {
            return res.status(404).json({
                success: false,
                message: "Value Slide not found"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Value Slide deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllSlides,
    createSlide,
    updateSlide,
    deleteSlide
};

