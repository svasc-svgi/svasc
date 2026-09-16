const Certification = require('../../models/about/certification.model');

const getAllCertifications = async () => {
    return await Certification.find().sort({ order: 1, createdAt: -1 });
};

const createCertification = async (data) => {
    // If order is not provided, find the max order and increment
    if (data.order === undefined || data.order === null) {
        const lastCert = await Certification.findOne().sort({ order: -1 });
        data.order = lastCert ? lastCert.order + 1 : 1;
    }
    const cert = new Certification(data);
    return await cert.save();
};

const updateCertification = async (id, data) => {
    return await Certification.findByIdAndUpdate(id, data, { new: true });
};

const deleteCertification = async (id) => {
    return await Certification.findByIdAndDelete(id);
};

module.exports = {
    getAllCertifications,
    createCertification,
    updateCertification,
    deleteCertification
};
