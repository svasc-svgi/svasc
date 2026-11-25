const Program = require('../models/programs.model');

const DEFAULT_PROGRAMS_SEED = [
    { title: 'B.Sc Computer Science', slug: 'bsc-computer-science', programType: 'UG Programmes', school: 'School of Computer Science & IT', schoolAcronym: 'SCSIT', image: '/assets/about3.jpg' },
    { title: 'B.Sc Computer AI & DS', slug: 'bsccomputer-ai-ds', programType: 'UG Programmes', school: 'School of Computer Science & IT', schoolAcronym: 'SCSIT', image: '/assets/commities.JPG' },
    { title: 'Bachelor of Computer Applications (BCA)', slug: 'bachelor-of-computer-applications-bca', programType: 'UG Programmes', school: 'School of Computer Science & IT', schoolAcronym: 'SCSIT', image: '/assets/cs.jpg' },
    { title: 'B.Sc Information Technology', slug: 'bscinformation-technology', programType: 'UG Programmes', school: 'School of Computer Science & IT', schoolAcronym: 'SCSIT', image: '/assets/examhero.JPG' },
    { title: 'B.Sc Cyber Security', slug: 'bsccyber-security', programType: 'UG Programmes', school: 'School of Computer Science & IT', schoolAcronym: 'SCSIT', image: '/assets/exam4.jpg' },
    { title: 'B. Com – Bachelor of Commerce', slug: 'b-com-bachelor-of-commerce', programType: 'UG Programmes', school: 'School of Commerce', schoolAcronym: 'SOC', image: '/assets/campus.jpg' },
    { title: 'B. Com(B&I) – Bachelor of Commerce with Banking & Insurance', slug: 'b-combi-bachelor-of-commerce-with-banking-insurance', programType: 'UG Programmes', school: 'School of Commerce', schoolAcronym: 'SOC', image: '/assets/cell.JPG' },
    { title: 'B.Com (IT) – Bachelor of Information Technology', slug: 'bcom-it-bachelor-of-information-technology', programType: 'UG Programmes', school: 'School of Commerce', schoolAcronym: 'SOC', image: '/assets/computerlab.JPG' },
    { title: 'B.Com(CA) - Computer Applications', slug: 'bcomca-computer-applications', programType: 'UG Programmes', school: 'School of Commerce', schoolAcronym: 'SOC', image: '/assets/her0.jpg' },
    { title: 'B.Com (PA) - Professional Accounting', slug: 'bcom-pa-professional-accounting', programType: 'UG Programmes', school: 'School of Commerce', schoolAcronym: 'SOC', image: '/assets/learning.jpg' },
    { title: 'Bachelor of Business Administration (BBA)', slug: 'management', programType: 'UG Programmes', school: 'School of Management', schoolAcronym: 'SOM', image: '/assets/smart1.jpg' },
    { title: 'B.Sc Chemistry', slug: 'bsc-chemistry', programType: 'UG Programmes', school: 'School of Sciences', schoolAcronym: 'SOHS', image: '/assets/why3.jpg' },
    { title: 'B.Sc Mathematics', slug: 'bsc-mathematics', programType: 'UG Programmes', school: 'School of Sciences', schoolAcronym: 'SOHS', image: '/assets/teaching.jpg' },
    { title: 'B.Sc Microbiology', slug: 'bsc-microbiology', programType: 'UG Programmes', school: 'School of Sciences', schoolAcronym: 'SOHS', image: '/assets/research.jpg' },
    { title: 'B.A. English', slug: 'ba-english', programType: 'UG Programmes', school: 'School of Arts & Languages', schoolAcronym: 'SOAL', image: '/assets/exam3.jpg' },
    { title: 'B.Sc Costume Design & Fashion', slug: 'bsc-costume-design-fashion', programType: 'UG Programmes', school: 'School of Design & Fashion', schoolAcronym: 'SODF', image: '/assets/cdf.jpg' },
    { title: 'Department of Physical Education', slug: 'physical-education', programType: 'UG Programmes', school: 'School of Physical Education', schoolAcronym: 'SOPE', image: '/assets/sports2.jpg' },
    { title: 'M.Sc Computer Science', slug: 'msc-computer-science', programType: 'PG Programmes', school: 'School of Computer Science', schoolAcronym: 'SCS', image: '/assets/home5.jpg' },
    { title: 'M.Sc Microbiology', slug: 'msc-microbiology', programType: 'PG Programmes', school: 'School of Computer Science', schoolAcronym: 'SCS', image: '/assets/home1.jpg' },
    { title: 'M.A English', slug: 'ma-english', programType: 'PG Programmes', school: 'School of Arts & Languages', schoolAcronym: 'SOAL', image: '/assets/exam3.jpg' },
    { title: 'M.Com', slug: 'mcom', programType: 'PG Programmes', school: 'School of Commerce & Management', schoolAcronym: 'SCM', image: '/assets/new.jpg' },
    { title: 'Ph.D Tamil', slug: 'phd-tamil', programType: 'Ph.D', school: 'Research & Development', schoolAcronym: 'R&D', image: '/assets/club0.jpg' },
    { title: 'Ph.D English', slug: 'phd-english', programType: 'Ph.D', school: 'Research & Development', schoolAcronym: 'R&D', image: '/assets/why2.JPG' },
    { title: 'Ph.D Commerce', slug: 'phd-commerce', programType: 'Ph.D', school: 'Research & Development', schoolAcronym: 'R&D', image: '/commercephd/phd1.jpg' }
];

const createProgram = async (data) => {
    if (!data.slug && data.title) {
        data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    const program = new Program(data);
    return await program.save();
};

const getAllPrograms = async () => {
    let programs = await Program.find().sort({ createdAt: -1 }).lean();
    if (!programs || programs.length === 0) {
        try {
            programs = await Program.insertMany(DEFAULT_PROGRAMS_SEED);
        } catch (e) {
            programs = DEFAULT_PROGRAMS_SEED;
        }
    }
    return programs;
};

const getGroupedPrograms = async () => {
    let programs = await Program.find().lean();
    if (!programs || programs.length === 0) {
        try {
            programs = await Program.insertMany(DEFAULT_PROGRAMS_SEED);
        } catch (e) {
            programs = DEFAULT_PROGRAMS_SEED;
        }
    }

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
    if (!data.slug && data.title) {
        data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
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
