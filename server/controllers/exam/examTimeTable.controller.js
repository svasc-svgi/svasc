const ExamTimeTableService = require('../../services/exam/examTimeTable.service');
const { uploadToCloudinary } = require('../../middlewares/uploadMiddleware');

const getAllExams = async (req, res) => {
    try {
        const exams = await ExamTimeTableService.getAllExamTimeTables();
        res.status(200).json({
            success: true,
            data: exams,
            message: "Exam time tables fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getExamById = async (req, res) => {
    try {
        const { id } = req.params;
        const exam = await ExamTimeTableService.getExamTimeTableById(id);
        if (!exam) {
            return res.status(404).json({
                success: false,
                message: "Exam time table not found"
            });
        }
        res.status(200).json({
            success: true,
            data: exam,
            message: "Exam time table fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createExam = async (req, res) => {
    try {
        const { title, examType, file: textFile } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Timetable title is required"
            });
        }

        let filePath = textFile || '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/exam/timetables', 'auto');
            filePath = uploadResult.secure_url;
        }

        const exam = await ExamTimeTableService.createExamTimeTable({
            title,
            examType: examType || 'Bharathiyar University',
            file: filePath
        });

        res.status(201).json({
            success: true,
            data: exam,
            message: "Exam time table created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateExam = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, examType, file: textFile } = req.body;
        let updateData = {};
        if (title) updateData.title = title;
        if (examType) updateData.examType = examType;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/exam/timetables', 'auto');
            updateData.file = uploadResult.secure_url;
        } else if (textFile !== undefined && textFile !== '') {
            updateData.file = textFile;
        }

        const updatedExam = await ExamTimeTableService.updateExamTimeTable(id, updateData);
        if (!updatedExam) {
            return res.status(404).json({
                success: false,
                message: "Exam time table not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedExam,
            message: "Exam time table updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteExam = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExam = await ExamTimeTableService.deleteExamTimeTable(id);
        if (!deletedExam) {
            return res.status(404).json({
                success: false,
                message: "Exam time table not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Exam time table deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam
};
