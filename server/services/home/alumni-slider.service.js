const AlumniSlider = require('../../models/home/alumni-slider.model');
const fs = require('fs');
const path = require('path');

const getAllAlumni = async () => {
    return await AlumniSlider.find().sort({ order: 1, createdAt: -1 });
};

const getAlumniById = async (id) => {
    return await AlumniSlider.findById(id);
};

const getAlumniCount = async () => {
    return await AlumniSlider.countDocuments();
};

const createAlumni = async (data) => {
    const alumni = new AlumniSlider(data);
    return await alumni.save();
};

const updateAlumni = async (id, data) => {
    return await AlumniSlider.findByIdAndUpdate(id, data, { new: true });
};

const deleteAlumni = async (id) => {
    const alumni = await AlumniSlider.findById(id);
    if (alumni && alumni.image) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(alumni.image));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
}
    return await AlumniSlider.findByIdAndDelete(id);
};

module.exports = {
    getAllAlumni,
    getAlumniById,
    getAlumniCount,
    createAlumni,
    updateAlumni,
    deleteAlumni
};
