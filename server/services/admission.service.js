const Admission = require('../models/admission.model');

const createAdmission = async (data) => {
    const admission = new Admission({
        studentName: data.studentName,
        phone: data.phone,
        email: data.email,
        course: data.course,
        qualification: data.qualification,
        city: data.city,
        message: data.message || '',
        isRead: false,
        status: 'New'
    });
    return await admission.save();
};

const getAllAdmissions = async () => {
    const [items, unreadCount] = await Promise.all([
        Admission.find().sort({ createdAt: -1 }).lean(),
        Admission.countDocuments({ isRead: false })
    ]);
    return { items, unreadCount };
};

const markAsRead = async (id) => {
    return await Admission.findByIdAndUpdate(
        id,
        { $set: { isRead: true } },
        { new: true }
    );
};

const markAllAsRead = async () => {
    return await Admission.updateMany(
        { isRead: false },
        { $set: { isRead: true } }
    );
};

const updateStatus = async (id, status) => {
    return await Admission.findByIdAndUpdate(
        id,
        { $set: { status, isRead: true } },
        { new: true, runValidators: true }
    );
};

const deleteAdmission = async (id) => {
    return await Admission.findByIdAndDelete(id);
};

module.exports = {
    createAdmission,
    getAllAdmissions,
    markAsRead,
    markAllAsRead,
    updateStatus,
    deleteAdmission
};
