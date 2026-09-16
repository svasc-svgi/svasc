const programsService = require('../services/programs.service');

// Create a new program
exports.createProgram = async (req, res) => {
    try {
        const savedProgram = await programsService.createProgram(req.body);
        res.status(201).json({
            success: true,
            data: savedProgram,
            message: 'Program created successfully'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A program with this title/slug already exists.'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all programs
exports.getAllPrograms = async (req, res) => {
    try {
        const programs = await programsService.getAllPrograms();
        res.status(200).json({
            success: true,
            data: programs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get programs grouped by Type and School
exports.getGroupedPrograms = async (req, res) => {
    try {
        const groupedData = await programsService.getGroupedPrograms();
        res.status(200).json({
            success: true,
            data: groupedData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single program by slug
exports.getProgramBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const program = await programsService.getProgramBySlug(slug);

        if (!program) {
            return res.status(404).json({
                success: false,
                message: 'Program not found'
            });
        }

        res.status(200).json({
            success: true,
            data: program
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update program
exports.updateProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const program = await programsService.updateProgram(id, req.body);

        if (!program) {
            return res.status(404).json({
                success: false,
                message: 'Program not found'
            });
        }

        res.status(200).json({
            success: true,
            data: program,
            message: 'Program updated successfully'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A program with this title/slug already exists.'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete program
exports.deleteProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const program = await programsService.deleteProgram(id);

        if (!program) {
            return res.status(404).json({
                success: false,
                message: 'Program not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Program deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
