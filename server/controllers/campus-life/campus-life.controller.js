const CampusLifeService = require('../../services/campus-life/campus-life.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

// Gallery Controllers
const getAllGallery = async (req, res) => {
    try {
        const items = await CampusLifeService.getAllGallery();
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createGallery = async (req, res) => {
    try {
        const { name, description, order, image: textImage } = req.body;
        
        if (!name) {
            return res.status(400).json({ success: false, message: "Gallery item name is required" });
        }

        let imageUrl = textImage || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/campus-life/gallery', 'image');
            imageUrl = uploadResult.secure_url;
        }

        if (!imageUrl) {
            return res.status(400).json({ success: false, message: "Gallery image is required" });
        }

        const item = await CampusLifeService.createGallery({
            name,
            description: description || '',
            image: imageUrl,
            order: order !== undefined ? parseInt(order, 10) : 0
        });
        res.status(201).json({ success: true, data: item, message: "Gallery item created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, order, image: textImage } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (order !== undefined) updateData.order = parseInt(order, 10);

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/campus-life/gallery', 'image');
            updateData.image = uploadResult.secure_url;
        } else if (textImage !== undefined && textImage !== '') {
            updateData.image = textImage;
        }

        const updatedItem = await CampusLifeService.updateGallery(id, updateData);
        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Gallery item not found" });
        }
        res.status(200).json({ success: true, data: updatedItem, message: "Gallery item updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await CampusLifeService.deleteGallery(id);
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Gallery item not found" });
        }
        res.status(200).json({ success: true, message: "Gallery item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Scroll Items Controllers
const getAllScroll = async (req, res) => {
    try {
        const items = await CampusLifeService.getAllScroll();
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createScroll = async (req, res) => {
    try {
        const { title, description, text, link, order, image: textImage } = req.body;
        
        if (!title) {
            return res.status(400).json({ success: false, message: "Scroll item title is required" });
        }

        let imageUrl = textImage || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/campus-life/scroll', 'image');
            imageUrl = uploadResult.secure_url;
        }

        if (!imageUrl) {
            return res.status(400).json({ success: false, message: "Scroll image is required" });
        }

        const item = await CampusLifeService.createScroll({
            title,
            description: description || text || '',
            link: link || '',
            image: imageUrl,
            order: order !== undefined ? parseInt(order, 10) : 0
        });
        res.status(201).json({ success: true, data: item, message: "Scroll item created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateScroll = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, text, link, order, image: textImage } = req.body;
        const updateData = {};
        if (title) updateData.title = title;
        if (description !== undefined || text !== undefined) updateData.description = description || text;
        if (link !== undefined) updateData.link = link;
        if (order !== undefined) updateData.order = parseInt(order, 10);

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/campus-life/scroll', 'image');
            updateData.image = uploadResult.secure_url;
        } else if (textImage !== undefined && textImage !== '') {
            updateData.image = textImage;
        }

        const updatedItem = await CampusLifeService.updateScroll(id, updateData);
        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Scroll item not found" });
        }
        res.status(200).json({ success: true, data: updatedItem, message: "Scroll item updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteScroll = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await CampusLifeService.deleteScroll(id);
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Scroll item not found" });
        }
        res.status(200).json({ success: true, message: "Scroll item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllGallery,
    createGallery,
    updateGallery,
    deleteGallery,
    getAllScroll,
    createScroll,
    updateScroll,
    deleteScroll
};
