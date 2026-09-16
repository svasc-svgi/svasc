const Newsletter = require('../../models/newsletter/newsletter.model');

class NewsletterService {
    async createNewsletter(data) {
        return await Newsletter.create(data);
    }

    async getAllNewsletters() {
        return await Newsletter.find().sort({ createdAt: -1 });
    }

    async updateNewsletter(id, data) {
        return await Newsletter.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteNewsletter(id) {
        return await Newsletter.findByIdAndDelete(id);
    }

    async getNewsletterById(id) {
        return await Newsletter.findById(id);
    }
}

module.exports = new NewsletterService();
