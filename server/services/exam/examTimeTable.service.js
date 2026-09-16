const ExamTimeTable = require('../../models/exam/examTimeTable.model');
const fs = require('fs');
const path = require('path');

const getAllExamTimeTables = async () => {
    return await ExamTimeTable.find().sort({ category: 1, createdAt: -1 });
};

const getExamTimeTableById = async (id) => {
    return await ExamTimeTable.findById(id);
};

const createExamTimeTable = async (data) => {
    const exam = new ExamTimeTable(data);
    return await exam.save();
};

const updateExamTimeTable = async (id, data) => {
    return await ExamTimeTable.findByIdAndUpdate(id, data, { new: true });
};

const deleteExamTimeTable = async (id) => {
    const exam = await ExamTimeTable.findById(id);
    if (exam && exam.file) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(exam.file));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await ExamTimeTable.findByIdAndDelete(id);
};

module.exports = {
    getAllExamTimeTables,
    getExamTimeTableById,
    createExamTimeTable,
    updateExamTimeTable,
    deleteExamTimeTable
};
