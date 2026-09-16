const LibraryActivity = require('../../models/library-activity.model');

class LibraryActivityService {
    async getAllActivities() {
        return await LibraryActivity.find();
    }

    async getActivityById(id) {
        return await LibraryActivity.findById(id);
    }

    async createActivity(data) {
        return await LibraryActivity.create(data);
    }

    async updateActivity(id, updateData) {
        return await LibraryActivity.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteActivity(id) {
        return await LibraryActivity.findByIdAndDelete(id);
    }
}

module.exports = new LibraryActivityService();
