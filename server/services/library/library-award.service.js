const LibraryAward = require('../../models/library-award.model');

class LibraryAwardService {
    async getAllAwards() {
        return await LibraryAward.find();
    }

    async getAwardsByCategory(category) {
        return await LibraryAward.find({ category });
    }

    async getAwardById(id) {
        return await LibraryAward.findById(id);
    }

    async createAward(data) {
        return await LibraryAward.create(data);
    }

    async updateAward(id, updateData) {
        return await LibraryAward.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteAward(id) {
        return await LibraryAward.findByIdAndDelete(id);
    }
}

module.exports = new LibraryAwardService();
