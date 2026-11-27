const Staff = require('../models/staff.model');
const Department = require('../models/department.model');
const Program = require('../models/programs.model');
const Testimonial = require('../models/testimonial.model');
const PageHero = require('../models/page-hero.model');
const Activities = require('../models/activities.model');
const SvascEvents = require('../models/home/svasc-events.model');
const EventsGrid = require('../models/events/grid.model');
const EventsMarquee = require('../models/events/marquee.model');
const HomeBlog = require('../models/home/blog.model');
const Blog = require('../models/blogs.model');
const LatestBlog = require('../models/latest-blog.model');
const TeacherAward = require('../models/about/teacher-award.model');

const stripDegreeDots = (str) => {
    if (typeof str !== 'string') return str;
    return str
        .replace(/\b(B\.Sc|M\.Sc|Ph\.D)\.(?=[A-Za-z])/gi, '$1 ')
        .replace(/\b(B\.Sc|M\.Sc|Ph\.D)\./gi, '$1');
};

const stripCommaBeforeAnd = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/,\s+and\b/gi, ' and');
};

const sanitizeText = (str) => stripCommaBeforeAnd(stripDegreeDots(str));

/**
 * Idempotent startup sanitization pass to update any legacy MongoDB documents
 * containing dotted degree titles (B.Sc., M.Sc., Ph.D.) or Oxford commas (", and").
 */
const runStartupSanitization = async () => {
    try {
        // 1. Normalize Staff departments & qualifications
        const staffList = await Staff.find({
            $or: [
                { department: /\b(B\.Sc|M\.Sc|Ph\.D)\./i },
                { departments: /\b(B\.Sc|M\.Sc|Ph\.D)\./i },
                { qualification: /\b(B\.Sc|M\.Sc|Ph\.D)\./i },
                { 'education.ug': /\b(B\.Sc|M\.Sc|Ph\.D)\./i },
                { 'education.pg': /\b(B\.Sc|M\.Sc|Ph\.D)\./i },
                { 'education.mphil': /\b(B\.Sc|M\.Sc|Ph\.D)\./i },
                { 'education.phd': /\b(B\.Sc|M\.Sc|Ph\.D)\./i }
            ]
        }).lean();

        for (const s of staffList) {
            const setFields = {};
            if (s.department) {
                const next = stripDegreeDots(s.department);
                if (next !== s.department) setFields.department = next;
            }
            if (Array.isArray(s.departments)) {
                const nextArr = Array.from(new Set(s.departments.map(stripDegreeDots).filter(Boolean)));
                if (JSON.stringify(nextArr) !== JSON.stringify(s.departments)) {
                    setFields.departments = nextArr;
                }
            }
            if (s.qualification) {
                const next = stripDegreeDots(s.qualification);
                if (next !== s.qualification) setFields.qualification = next;
            }
            if (s.education) {
                for (const k of ['ug', 'pg', 'mphil', 'phd']) {
                    if (s.education[k]) {
                        const next = stripDegreeDots(s.education[k]);
                        if (next !== s.education[k]) setFields[`education.${k}`] = next;
                    }
                }
            }
            if (Object.keys(setFields).length > 0) {
                await Staff.updateOne({ _id: s._id }, { $set: setFields });
            }
        }

        // 2. Normalize Department names
        const depts = await Department.find({ name: /\b(B\.Sc|M\.Sc|Ph\.D)\./i }).lean();
        for (const d of depts) {
            const next = stripDegreeDots(d.name);
            if (next !== d.name) {
                const exists = await Department.findOne({ name: next, _id: { $ne: d._id } }).lean();
                if (exists) {
                    await Department.deleteOne({ _id: d._id });
                } else {
                    await Department.updateOne({ _id: d._id }, { $set: { name: next } });
                }
            }
        }

        // 3. Normalize Programs (dots, commas, and M.Sc Microbiology School -> School of Science)
        const programs = await Program.find().lean();
        for (const p of programs) {
            const setFields = {};
            for (const field of ['title', 'about', 'vision']) {
                if (p[field]) {
                    const next = sanitizeText(p[field]);
                    if (next !== p[field]) setFields[field] = next;
                }
            }
            if (p.programType === 'PG Programmes' && (p.slug === 'msc-microbiology' || /microbiology/i.test(p.title || '')) && p.school !== 'School of Science') {
                setFields.school = 'School of Science';
                setFields.schoolAcronym = 'SOS';
            }
            if (p.programType === 'Ph.D' && (/research\s*(&|and)?\s*development/i.test(p.school || '') || /school of management/i.test(p.school || ''))) {
                const tLow = (p.title || '').toLowerCase();
                if (tLow.includes('tamil') || tLow.includes('english')) {
                    setFields.school = 'Research in Arts';
                    setFields.schoolAcronym = 'RIA';
                } else if (tLow.includes('commerce')) {
                    setFields.school = 'Research in Commerce';
                    setFields.schoolAcronym = 'RIC';
                } else if (tLow.includes('microbiology') || tLow.includes('science')) {
                    setFields.school = 'Research in Science';
                    setFields.schoolAcronym = 'RIS';
                } else if (tLow.includes('management')) {
                    setFields.school = 'Research in Management';
                    setFields.schoolAcronym = 'RIM';
                }
            }
            if (Array.isArray(p.faqs)) {
                let faqsChanged = false;
                const nextFaqs = p.faqs.map(faq => {
                    const q = sanitizeText(faq.question);
                    const a = sanitizeText(faq.answer);
                    if (q !== faq.question || a !== faq.answer) faqsChanged = true;
                    return { ...faq, question: q, answer: a };
                });
                if (faqsChanged) setFields.faqs = nextFaqs;
            }
            if (Object.keys(setFields).length > 0) {
                await Program.updateOne({ _id: p._id }, { $set: setFields });
            }
        }

        // 4. Normalize Testimonials
        const testimonials = await Testimonial.find().lean();
        for (const t of testimonials) {
            const setFields = {};
            for (const field of ['name', 'department', 'text']) {
                if (t[field]) {
                    const next = sanitizeText(t[field]);
                    if (next !== t[field]) setFields[field] = next;
                }
            }
            if (Object.keys(setFields).length > 0) {
                await Testimonial.updateOne({ _id: t._id }, { $set: setFields });
            }
        }

        // 5. Normalize PageHeroes (including awards)
        const heroes = await PageHero.find({ description: /,\s+and\b/i }).lean();
        for (const h of heroes) {
            const next = stripCommaBeforeAnd(h.description);
            if (next !== h.description) {
                await PageHero.updateOne({ _id: h._id }, { $set: { description: next } });
            }
        }

        // 6. Normalize Activities & Card Intros (including Internal Grievances Committee)
        const activities = await Activities.find().lean();
        for (const act of activities) {
            const setFields = {};
            for (const field of ['intro', 'vision', 'mission', 'objectives']) {
                if (act[field]) {
                    const next = stripCommaBeforeAnd(act[field]);
                    if (next !== act[field]) setFields[field] = next;
                }
            }
            if (Array.isArray(act.cards)) {
                let cardsChanged = false;
                const nextCards = act.cards.map(card => {
                    const updated = { ...card };
                    for (const field of ['intro', 'vision', 'mission', 'objectives']) {
                        if (updated[field]) {
                            const next = stripCommaBeforeAnd(updated[field]);
                            if (next !== updated[field]) {
                                updated[field] = next;
                                cardsChanged = true;
                            }
                        }
                    }
                    return updated;
                });
                if (cardsChanged) setFields.cards = nextCards;
            }
            if (Object.keys(setFields).length > 0) {
                await Activities.updateOne({ _id: act._id }, { $set: setFields });
            }
        }

        // 7. Normalize Events & Blogs
        const eventModels = [SvascEvents, EventsGrid, EventsMarquee];
        for (const Model of eventModels) {
            const docs = await Model.find().lean();
            for (const doc of docs) {
                const setFields = {};
                for (const field of ['title', 'subtitle', 'description', 'desc']) {
                    if (doc[field]) {
                        const next = stripCommaBeforeAnd(doc[field]);
                        if (next !== doc[field]) setFields[field] = next;
                    }
                }
                if (Object.keys(setFields).length > 0) {
                    await Model.updateOne({ _id: doc._id }, { $set: setFields });
                }
            }
        }

        const blogModels = [HomeBlog, Blog, LatestBlog];
        for (const Model of blogModels) {
            const docs = await Model.find().lean();
            for (const doc of docs) {
                const setFields = {};
                for (const field of ['title', 'description', 'copy', 'excerpt']) {
                    if (doc[field]) {
                        const next = stripCommaBeforeAnd(doc[field]);
                        if (next !== doc[field]) setFields[field] = next;
                    }
                }
                if (Object.keys(setFields).length > 0) {
                    await Model.updateOne({ _id: doc._id }, { $set: setFields });
                }
            }
        }

        // 8. Remove retired faculty award years (2010, 2017, 2018)
        await TeacherAward.deleteMany({ year: { $in: [2010, 2017, 2018] } });
    } catch (err) {
        console.warn('Startup text sanitization warning:', err.message);
    }
};

module.exports = {
    stripDegreeDots,
    stripCommaBeforeAnd,
    sanitizeText,
    runStartupSanitization
};
