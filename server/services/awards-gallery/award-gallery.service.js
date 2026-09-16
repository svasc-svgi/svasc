const AwardGallery = require('../../models/awards-gallery/award-gallery.model');

class AwardGalleryService {
    async createAward(data) {
        return await AwardGallery.create(data);
    }

    async getAllAwards() {
        return await AwardGallery.find().sort({ createdAt: -1 });
    }

    async getAwardsByCategory(category) {
        return await AwardGallery.find({ category }).sort({ createdAt: -1 });
    }

    async updateAward(id, data) {
        return await AwardGallery.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteAward(id) {
        return await AwardGallery.findByIdAndDelete(id);
    }
}

module.exports = new AwardGalleryService();
