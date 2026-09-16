const newsletterService = require('../../services/newsletter/newsletter.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

class NewsletterController {
    async createNewsletter(req, res) {
        try {
            const { title, pdf: bodyPdf, file: bodyFile } = req.body;
            
            let fileUrl = bodyPdf || bodyFile || '';
            if (req.file) {
                const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/newsletters', 'auto');
                fileUrl = uploadResult.secure_url;
            }

            if (!fileUrl) {
                return res.status(400).json({ success: false, message: 'Newsletter file is required' });
            }

            const data = {
                title,
                pdf: fileUrl
            };

            const newsletter = await newsletterService.createNewsletter(data);
            res.status(201).json({
                success: true,
                data: newsletter,
                message: 'Newsletter uploaded successfully'
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getAllNewsletters(req, res) {
        try {
            const newsletters = await newsletterService.getAllNewsletters();
            res.status(200).json({ success: true, data: newsletters });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateNewsletter(req, res) {
        try {
            const { id } = req.params;
            const { title, pdf: bodyPdf, file: bodyFile } = req.body;

            const updateData = {};
            if (title) updateData.title = title;

            if (req.file) {
                const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/newsletters', 'auto');
                updateData.pdf = uploadResult.secure_url;
            } else if (bodyPdf || bodyFile) {
                updateData.pdf = bodyPdf || bodyFile;
            }

            const newsletter = await newsletterService.updateNewsletter(id, updateData);
            if (!newsletter) {
                return res.status(404).json({ success: false, message: 'Newsletter not found' });
            }

            res.status(200).json({ success: true, data: newsletter });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteNewsletter(req, res) {
        try {
            const { id } = req.params;
            const deleted = await newsletterService.deleteNewsletter(id);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Newsletter not found' });
            }
            res.status(200).json({ success: true, message: 'Newsletter deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new NewsletterController();
