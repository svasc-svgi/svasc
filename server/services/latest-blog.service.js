const LatestBlog = require('../models/latest-blog.model');

class LatestBlogService {
    async createBlog(data) {
        return await LatestBlog.create(data);
    }

    async getAllBlogs() {
        // Sorted by createdAt desc to show latest first
        return await LatestBlog.find().sort({ createdAt: -1 });
    }

    async getBlogById(id) {
        return await LatestBlog.findById(id);
    }

    async updateBlog(id, data) {
        return await LatestBlog.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteBlog(id) {
        return await LatestBlog.findByIdAndDelete(id);
    }
}

module.exports = new LatestBlogService();
