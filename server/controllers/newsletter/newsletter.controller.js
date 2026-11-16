const newsletterService = require('../../services/newsletter/newsletter.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

class NewsletterController {
    async createNewsletter(req, res) {
        try {
            const { 
                title, 
                description, 
                coverImage, 
                image, 
                pdf: bodyPdf, 
                file: bodyFile,
                byline,
                date 
            } = req.body;
            
            let fileUrl = bodyPdf || bodyFile || '';
            let coverUrl = coverImage || image || '';

            if (req.file) {
                const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/newsletters', 'auto');
                if (req.file.mimetype.startsWith('image/')) {
                    coverUrl = uploadResult.secure_url;
                } else {
                    fileUrl = uploadResult.secure_url;
                }
            }

            if (!fileUrl && coverUrl) {
                fileUrl = coverUrl;
            }

            if (!fileUrl) {
                return res.status(400).json({ success: false, message: 'Newsletter PDF file or link is required' });
            }

            const data = {
                title: title || 'Campus Newsletter',
                description: description || '',
                coverImage: coverUrl || '/newsletter/newsletter_cover.jpg',
                pdf: fileUrl,
                byline: byline || 'CAMPUS EDITORIAL DESK',
                date: date || ''
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
            const { 
                title, 
                description, 
                coverImage, 
                image, 
                pdf: bodyPdf, 
                file: bodyFile,
                byline,
                date 
            } = req.body;

            const updateData = {};
            if (title !== undefined) updateData.title = title;
            if (description !== undefined) updateData.description = description;
            if (coverImage !== undefined) updateData.coverImage = coverImage;
            else if (image !== undefined) updateData.coverImage = image;
            if (byline !== undefined) updateData.byline = byline;
            if (date !== undefined) updateData.date = date;

            if (req.file) {
                const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/newsletters', 'auto');
                if (req.file.mimetype.startsWith('image/')) {
                    updateData.coverImage = uploadResult.secure_url;
                } else {
                    updateData.pdf = uploadResult.secure_url;
                }
            } else if (bodyPdf || bodyFile) {
                updateData.pdf = bodyPdf || bodyFile;
            }

            const newsletter = await newsletterService.updateNewsletter(id, updateData);
            if (!newsletter) {
                return res.status(404).json({ success: false, message: 'Newsletter not found' });
            }

            res.status(200).json({ 
                success: true, 
                data: newsletter,
                message: 'Newsletter updated successfully'
            });
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
