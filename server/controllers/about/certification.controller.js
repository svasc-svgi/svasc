const certificationService = require('../../services/about/certification.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

exports.getAllCertifications = async (req, res) => {
    try {
        const certs = await certificationService.getAllCertifications();
        res.status(200).json({ success: true, data: certs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createCertification = async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/about/certifications', 'image');
            data.image = uploadResult.secure_url;
        }
        if (!data.image) {
            return res.status(400).json({ success: false, message: 'Certificate image is required' });
        }
        const cert = await certificationService.createCertification(data);
        res.status(201).json({ success: true, data: cert, message: 'Certification created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCertification = async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/about/certifications', 'image');
            data.image = uploadResult.secure_url;
        }
        const cert = await certificationService.updateCertification(req.params.id, data);
        if (!cert) return res.status(404).json({ success: false, message: 'Certification not found' });
        res.status(200).json({ success: true, data: cert, message: 'Certification updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCertification = async (req, res) => {
    try {
        const cert = await certificationService.deleteCertification(req.params.id);
        if (!cert) return res.status(404).json({ success: false, message: 'Certification not found' });
        res.status(200).json({ success: true, message: 'Certification deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
