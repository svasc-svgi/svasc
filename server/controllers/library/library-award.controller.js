const libraryAwardService = require('../../services/library/library-award.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

exports.getAllAwards = async (req, res) => {
    try {
        const awards = await libraryAwardService.getAllAwards();
        res.status(200).json({ success: true, data: awards });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createAward = async (req, res) => {
    try {
        const { category, name, designation, department, image: bodyImage } = req.body;
        
        let imageUrl = bodyImage || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/library/awards', 'image');
            imageUrl = uploadResult.secure_url;
        }

        const data = { 
            category, 
            name, 
            designation, 
            department: department || '',
            image: imageUrl
        };
        
        const award = await libraryAwardService.createAward(data);
        res.status(201).json({ success: true, data: award, message: 'Award created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAward = async (req, res) => {
    try {
        const { category, name, designation, department, image: bodyImage } = req.body;
        const updateData = {};
        if (category) updateData.category = category;
        if (name) updateData.name = name;
        if (designation) updateData.designation = designation;
        if (department !== undefined) updateData.department = department;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/library/awards', 'image');
            updateData.image = uploadResult.secure_url;
        } else if (bodyImage !== undefined && bodyImage !== '') {
            updateData.image = bodyImage;
        }

        const award = await libraryAwardService.updateAward(req.params.id, updateData);
        if (!award) return res.status(404).json({ success: false, message: 'Award not found' });
        res.status(200).json({ success: true, data: award, message: 'Award updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteAward = async (req, res) => {
    try {
        const award = await libraryAwardService.deleteAward(req.params.id);
        if (!award) return res.status(404).json({ success: false, message: 'Award not found' });
        res.status(200).json({ success: true, message: 'Award deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
