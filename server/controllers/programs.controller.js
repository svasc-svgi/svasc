const programsService = require('../services/programs.service');

const parseArray = (val) => {
    if (Array.isArray(val)) return val.map(s => typeof s === 'string' ? s.trim() : s).filter(Boolean);
    if (typeof val === 'string') {
        return val.split('\n').map(s => s.trim()).filter(Boolean);
    }
    return [];
};

const normalizeProgramPayload = (body) => {
    const data = { ...body };

    if (data.mission !== undefined) {
        if (typeof data.mission === 'string' && data.mission.includes('\n')) {
            data.mission = data.mission.split('\n').map(s => s.trim()).filter(Boolean);
        }
    }

    if (data.objectives !== undefined) {
        data.objectives = parseArray(data.objectives);
    }

    if (data.rolesAndResponsibilities !== undefined) {
        data.rolesAndResponsibilities = parseArray(data.rolesAndResponsibilities);
    }

    if (data.facilities !== undefined) {
        data.facilities = parseArray(data.facilities);
    }

    if (data.keyHighlights !== undefined) {
        data.keyHighlights = parseArray(data.keyHighlights);
    }

    if (data.careerOpportunities !== undefined) {
        if (Array.isArray(data.careerOpportunities)) {
            data.careerOpportunities = data.careerOpportunities.map(c => {
                if (typeof c === 'string') return { title: c.trim() };
                if (c && typeof c === 'object') return { title: c.title || '', description: c.description || '' };
                return null;
            }).filter(Boolean);
        } else if (typeof data.careerOpportunities === 'string') {
            data.careerOpportunities = data.careerOpportunities
                .split('\n')
                .map(s => s.trim())
                .filter(Boolean)
                .map(title => ({ title }));
        }
    }

    if (data.faqs !== undefined) {
        if (typeof data.faqs === 'string') {
            try {
                data.faqs = JSON.parse(data.faqs);
            } catch (e) {
                data.faqs = [];
            }
        }
        if (Array.isArray(data.faqs)) {
            data.faqs = data.faqs
                .filter(f => f && (f.question || f.answer))
                .map(f => ({ question: (f.question || '').trim(), answer: (f.answer || '').trim() }));
        }
    }

    return data;
};

// Create a new program
exports.createProgram = async (req, res) => {
    try {
        const payload = normalizeProgramPayload(req.body);
        const savedProgram = await programsService.createProgram(payload);
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
        const payload = normalizeProgramPayload(req.body);
        const program = await programsService.updateProgram(id, payload);

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
