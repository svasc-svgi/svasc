const Program = require('../models/programs.model');

const createProgram = async (data) => {
    const program = new Program(data);
    return await program.save();
};

const getAllPrograms = async () => {
    return await Program.find().sort({ createdAt: -1 });
};

const getGroupedPrograms = async () => {
    const programs = await Program.find();

    const groupedData = {
        "UG Programmes": [],
        "PG Programmes": [],
        "Ph.D": []
    };

    const findSchoolIndex = (list, schoolName) => {
        return list.findIndex(item => item.name === schoolName);
    };

    programs.forEach(program => {
        const type = program.programType;
        if (!groupedData[type]) return;

        const schoolName = program.school;
        const schoolIndex = findSchoolIndex(groupedData[type], schoolName);

        const programSimple = {
            title: program.title,
            image: program.image,
            slug: program.slug
        };

        if (schoolIndex === -1) {
            groupedData[type].push({
                name: schoolName,
                acronym: program.schoolAcronym || "",
                programs: [programSimple]
            });
        } else {
            groupedData[type][schoolIndex].programs.push(programSimple);
        }
    });

    return groupedData;
};

const getProgramBySlug = async (slug) => {
    return await Program.findOne({ $or: [{ slug: slug }, { slug: slug.toLowerCase() }] });
};

const updateProgram = async (id, data) => {
    return await Program.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

const deleteProgram = async (id) => {
    return await Program.findByIdAndDelete(id);
};

module.exports = {
    createProgram,
    getAllPrograms,
    getGroupedPrograms,
    getProgramBySlug,
    updateProgram,
    deleteProgram
};
