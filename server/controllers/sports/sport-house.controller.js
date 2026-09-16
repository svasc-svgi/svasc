const SportHouseService = require('../../services/sports/sport-house.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

const getAllHouses = async (req, res) => {
    try {
        const houses = await SportHouseService.getAllHouses();
        res.status(200).json({
            success: true,
            data: houses
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createHouse = async (req, res) => {
    try {
        const { name, subtitle, description, offset, custom, order, image: textImage } = req.body;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'House name is required'
            });
        }

        let imageUrl = textImage || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/sports/houses');
            imageUrl = uploadResult.secure_url;
        }

        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: 'Image is required'
            });
        }

        const house = await SportHouseService.createHouse({
            name,
            subtitle: subtitle || '',
            image: imageUrl,
            description: description || '',
            offset: offset === true || offset === 'true',
            custom: custom === true || custom === 'true',
            order: order !== undefined ? parseInt(order, 10) : 0
        });

        res.status(201).json({
            success: true,
            data: house,
            message: "Sport House created successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateHouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, subtitle, description, offset, custom, order, image: textImage } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (subtitle !== undefined) updateData.subtitle = subtitle;
        if (description !== undefined) updateData.description = description;
        if (offset !== undefined) updateData.offset = offset === true || offset === 'true';
        if (custom !== undefined) updateData.custom = custom === true || custom === 'true';
        if (order !== undefined) updateData.order = parseInt(order, 10);

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/sports/houses');
            updateData.image = uploadResult.secure_url;
        } else if (textImage !== undefined && textImage !== '') {
            updateData.image = textImage;
        }

        const updatedHouse = await SportHouseService.updateHouse(id, updateData);
        if (!updatedHouse) {
            return res.status(404).json({ success: false, message: "Sport House not found" });
        }

        res.status(200).json({
            success: true,
            data: updatedHouse,
            message: "Sport House updated successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteHouse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHouse = await SportHouseService.deleteHouse(id);
        if (!deletedHouse) {
            return res.status(404).json({ success: false, message: "Sport House not found" });
        }
        res.status(200).json({
            success: true,
            message: "Sport House deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllHouses,
    createHouse,
    updateHouse,
    deleteHouse
};
