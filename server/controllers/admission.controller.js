const AdmissionService = require('../services/admission.service');

const createAdmission = async (req, res) => {
    try {
        const { studentName, phone, email, course, qualification, city, message } = req.body;
        if (!studentName || !phone || !email || !course || !qualification || !city) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required admission application fields.'
            });
        }
        const saved = await AdmissionService.createAdmission({
            studentName,
            phone,
            email,
            course,
            qualification,
            city,
            message
        });
        res.status(201).json({
            success: true,
            data: saved,
            message: 'Admission application submitted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllAdmissions = async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store');
        const { items, unreadCount } = await AdmissionService.getAllAdmissions();
        res.status(200).json({
            success: true,
            data: items,
            unreadCount
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        const updated = await AdmissionService.markAsRead(req.params.id);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Admission record not found' });
        }
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        await AdmissionService.markAllAsRead();
        res.status(200).json({ success: true, message: 'All admissions marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await AdmissionService.updateStatus(req.params.id, status);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Admission record not found' });
        }
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteAdmission = async (req, res) => {
    try {
        const deleted = await AdmissionService.deleteAdmission(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Admission record not found' });
        }
        res.status(200).json({ success: true, message: 'Admission deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createAdmission,
    getAllAdmissions,
    markAsRead,
    markAllAsRead,
    updateStatus,
    deleteAdmission
};
