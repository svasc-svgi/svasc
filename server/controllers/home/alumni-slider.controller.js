const AlumniSliderService = require('../../services/home/alumni-slider.service');
const path = require('path');
const fs = require('fs');

const getAllAlumni = async (req, res) => {
    try {
        const alumni = await AlumniSliderService.getAllAlumni();
        res.status(200).json({
            success: true,
            data: alumni,
            message: "Alumni fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAlumniById = async (req, res) => {
    try {
        const { id } = req.params;
        const alumni = await AlumniSliderService.getAlumniById(id);
        if (!alumni) {
            return res.status(404).json({
                success: false,
                message: "Alumni not found"
            });
        }
        res.status(200).json({
            success: true,
            data: alumni,
            message: "Alumni fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createAlumni = async (req, res) => {
    try {
        const { subTitle, name, content, link } = req.body;
        
        // Automatically assign order based on current count
        const currentCount = await AlumniSliderService.getAlumniCount();

        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const alumni = await AlumniSliderService.createAlumni({
            subTitle,
            name,
            content,
            image: imagePath,
            link: link || '#',
            order: currentCount
        });
        res.status(201).json({
            success: true,
            data: alumni,
            message: "Alumni created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateAlumni = async (req, res) => {
    try {
        const { id } = req.params;
        const { subTitle, name, content, link } = req.body;
        let updateData = { subTitle, name, content, link };

        if (req.file) {
            const oldAlumni = await AlumniSliderService.getAlumniById(id);
            if (oldAlumni && oldAlumni.image) {
                const oldFilePath = path.join(__dirname, '..', '..', 'uploads', path.basename(oldAlumni.image));
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedAlumni = await AlumniSliderService.updateAlumni(id, updateData);
        if (!updatedAlumni) {
            return res.status(404).json({
                success: false,
                message: "Alumni not found"
            });
        }
        res.status(200).json({
            success: true,
            data: updatedAlumni,
            message: "Alumni updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteAlumni = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAlumni = await AlumniSliderService.deleteAlumni(id);
        if (!deletedAlumni) {
            return res.status(404).json({
                success: false,
                message: "Alumni not found"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Alumni deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllAlumni,
    getAlumniById,
    createAlumni,
    updateAlumni,
    deleteAlumni
};
