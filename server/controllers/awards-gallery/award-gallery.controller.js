const awardGalleryService = require('../../services/awards-gallery/award-gallery.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

class AwardGalleryController {
    async createAward(req, res) {
        try {
            const { alt, category, image: bodyImage } = req.body;
            
            let imageUrl = bodyImage || '';
            if (req.file) {
                const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/awards-gallery', 'image');
                imageUrl = uploadResult.secure_url;
            }

            if (!imageUrl) {
                return res.status(400).json({ success: false, message: 'Award image is required' });
            }

            const data = {
                image: imageUrl,
                alt: alt || '',
                category: (category || 'academic').toLowerCase()
            };

            const award = await awardGalleryService.createAward(data);
            res.status(201).json({ success: true, data: award });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getAllAwards(req, res) {
        try {
            const awards = await awardGalleryService.getAllAwards();
            res.status(200).json({ success: true, data: awards });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateAward(req, res) {
        try {
            const { id } = req.params;
            const { alt, category, image: bodyImage } = req.body;

            const updateData = {};
            if (alt !== undefined) updateData.alt = alt;
            if (category !== undefined) updateData.category = category.toLowerCase();

            if (req.file) {
                const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/awards-gallery', 'image');
                updateData.image = uploadResult.secure_url;
            } else if (bodyImage !== undefined && bodyImage !== '') {
                updateData.image = bodyImage;
            }

            const award = await awardGalleryService.updateAward(id, updateData);
            if (!award) {
                return res.status(404).json({ success: false, message: 'Award not found' });
            }

            res.status(200).json({ success: true, data: award });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteAward(req, res) {
        try {
            const { id } = req.params;
            const award = await awardGalleryService.deleteAward(id);
            if (!award) {
                return res.status(404).json({ success: false, message: 'Award not found' });
            }
            res.status(200).json({ success: true, message: 'Award deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new AwardGalleryController();
