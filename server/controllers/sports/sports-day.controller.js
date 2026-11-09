const SportsDayService = require('../../services/sports/sports-day.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

const getSportsDay = async (req, res) => {
    try {
        const data = await SportsDayService.getSportsDay();
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateSportsDay = async (req, res) => {
    try {
        const { title, subtitle, description, pdfTitle, pdfUrl: textPdfUrl, pdf: textPdf } = req.body;
        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (subtitle !== undefined) updateData.subtitle = subtitle;
        if (description !== undefined) updateData.description = description;
        if (pdfTitle !== undefined) updateData.pdfTitle = pdfTitle;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/sports/sports-day', 'auto');
            updateData.pdfUrl = uploadResult.secure_url;
        } else if (textPdfUrl !== undefined && textPdfUrl !== '') {
            updateData.pdfUrl = textPdfUrl;
        } else if (textPdf !== undefined && textPdf !== '') {
            updateData.pdfUrl = textPdf;
        }

        const updated = await SportsDayService.updateSportsDay(updateData);
        res.status(200).json({
            success: true,
            data: updated,
            message: 'Sports Day section updated successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getSportsDay,
    updateSportsDay
};

