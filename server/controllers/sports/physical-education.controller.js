const PhysicalEducationService = require('../../services/sports/physical-education.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

const getAll = async (req, res) => {
    try {
        const items = await PhysicalEducationService.getAll();
        res.status(200).json({
            success: true,
            data: items
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const item = await PhysicalEducationService.getById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { year, game, icon, color, report, order, image: textImage } = req.body;

        if (!year || !game || !report) {
            return res.status(400).json({
                success: false,
                message: 'Year, Sport/Game title, and Report details are required.'
            });
        }

        let imageUrl = textImage || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/sports/physical-education');
            imageUrl = uploadResult.secure_url;
        }

        const item = await PhysicalEducationService.create({
            year: year.trim(),
            game: game.trim(),
            icon: (icon || 'fa-medal').trim(),
            color: (color || '#243b53').trim(),
            image: imageUrl.trim(),
            report: report.trim(),
            order: order !== undefined && order !== null && order !== '' ? parseInt(order, 10) : 0
        });

        res.status(201).json({
            success: true,
            data: item,
            message: "Physical Education achievement created successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { year, game, icon, color, report, order, image: textImage } = req.body;

        const updateData = {};
        if (year !== undefined) updateData.year = year.trim();
        if (game !== undefined) updateData.game = game.trim();
        if (icon !== undefined) updateData.icon = icon.trim();
        if (color !== undefined) updateData.color = color.trim();
        if (report !== undefined) updateData.report = report.trim();
        if (order !== undefined && order !== null && order !== '') {
            updateData.order = parseInt(order, 10);
        }

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/sports/physical-education');
            updateData.image = uploadResult.secure_url;
        } else if (textImage !== undefined) {
            updateData.image = textImage.trim();
        }

        const updatedItem = await PhysicalEducationService.update(id, updateData);
        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        res.status(200).json({
            success: true,
            data: updatedItem,
            message: "Physical Education achievement updated successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await PhysicalEducationService.deleteItem(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        res.status(200).json({
            success: true,
            message: "Physical Education achievement deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteRecord
};
