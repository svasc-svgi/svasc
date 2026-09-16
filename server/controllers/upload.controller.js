const cloudinary = require('../config/cloudinary');

const getUploadSignature = (req, res) => {
    try {
        const timestamp = Math.round((new Date).getTime() / 1000);
        const folder = req.query.folder || 'svasc';
        
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
                folder: folder
            },
            process.env.CLOUDINARY_API_SECRET
        );

        res.status(200).json({
            success: true,
            signature,
            timestamp,
            apiKey: process.env.CLOUDINARY_API_KEY,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            folder
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getUploadSignature
};
