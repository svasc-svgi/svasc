const Activities = require('../models/activities.model');
const fs = require('fs');
const path = require('path');

const getAllActivities = async () => {
    return await Activities.find().sort({ order: 1, createdAt: -1 });
};

const aliasMap = {
    'iqac': 'internal quality assurance cell',
    'nss': 'national service scheme',
    'yrc': 'youth red cross',
    'iiedc': 'institution innovation',
    'edc': 'institution innovation',
    'innovation': 'institution innovation',
    'innovation-entrepreneurship': 'institution innovation',
    'swayam': 'swayam',
    'nptel': 'swayam',
    'swayam-nptel': 'swayam',
    'jci': 'junior jci',
    'junior-jci-wing': 'junior jci',
    'rnd': 'research and development',
    'r-and-d': 'research and development',
    'research-development-cell': 'research and development',
    'wec': 'women empowerment',
    'women': 'women empowerment',
    'ragging': 'anti ragging',
    'anti-ragging': 'anti ragging',
    'anti-ragging-cell': 'anti ragging',
    'grievance': 'internal grievances',
    'grievances': 'internal grievances',
    'grievance-redressal-committee': 'internal grievances',
    'internal-grievance': 'internal grievances',
    'internal-grievances-committee': 'internal grievances',
    'media': 'social media',
    'media-cell': 'social media',
    'placement': 'placement',
    'placement-training-cell': 'placement',
    'physical-education': 'physical education',
    'sports': 'physical education',
    'voter': 'voter literacy',
    'voter-literacy-club': 'voter literacy',
    'rotaract': 'rotaract',
    'rotaract-club': 'rotaract',
    'fine-arts': 'fine arts',
    'fine-arts-club': 'fine arts',
    'eco': 'eco club',
    'eco-club': 'eco club',
    'anti-drug': 'anti drug',
    'anti-drug-club': 'anti drug',
    'red-ribbon': 'red ribbon',
    'red-ribbon-club': 'red ribbon',
    'literary': 'literary',
    'literary-club': 'literary',
    'exam': 'exam cell',
    'exam-cell': 'exam cell'
};

const toSlug = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const toCleanWords = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const getActivityById = async (idOrSlug) => {
    if (!idOrSlug) return null;

    try {
        if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
            const byId = await Activities.findById(idOrSlug);
            if (byId) return byId;
        }
    } catch (e) {}

    const allActivities = await Activities.find().sort({ order: 1, createdAt: -1 });
    if (!allActivities || allActivities.length === 0) return null;

    const normInput = toSlug(idOrSlug);
    const cleanInput = toCleanWords(idOrSlug);
    const aliasTarget = aliasMap[normInput] || aliasMap[cleanInput];

    // 1. Check if input matches a specific card inside any category
    for (const cat of allActivities) {
        const card = (cat.cards || []).find(c => {
            const cardSlug = toSlug(c.title);
            const cardClean = toCleanWords(c.title);
            const linkSlug = toSlug(c.link);
            return cardSlug === normInput ||
                   linkSlug === normInput ||
                   (aliasTarget && cardClean.includes(aliasTarget)) ||
                   (cleanInput.length > 3 && cardClean.includes(cleanInput)) ||
                   (cardClean.length > 3 && cleanInput.includes(cardClean));
        });

        if (card) {
            const obj = cat.toObject ? cat.toObject() : { ...cat };
            obj.matchedCard = card;
            return obj;
        }
    }

    // 2. Check if input matches an overall category
    const catMatch = allActivities.find(item => {
        const catSlug = toSlug(item.category);
        const catClean = toCleanWords(item.category);
        return catSlug === normInput ||
               catClean === cleanInput ||
               catClean.includes(cleanInput) ||
               (normInput && catSlug.includes(normInput));
    });

    if (catMatch) {
        return catMatch;
    }

    // 3. Fallback regex search
    const clean = idOrSlug.toLowerCase().replace(/[-_]/g, ' ');
    const byCategory = await Activities.findOne({
        $or: [
            { category: new RegExp(`^${idOrSlug}$`, 'i') },
            { category: new RegExp(clean, 'i') },
            { 'cards.title': new RegExp(`^${idOrSlug}$`, 'i') },
            { 'cards.title': new RegExp(clean, 'i') }
        ]
    });
    return byCategory;
};


const getActivityCount = async () => {
    return await Activities.countDocuments();
};

const createActivity = async (data) => {
    const activity = new Activities(data);
    return await activity.save();
};

const updateActivity = async (id, data) => {
    return await Activities.findByIdAndUpdate(id, data, { new: true });
};

const deleteActivity = async (id) => {
    const activity = await Activities.findById(id);
    if (activity) {
        // Delete banner image
        if (activity.bannerImage) {
            const bannerPath = path.join(__dirname, '..', 'uploads', path.basename(activity.bannerImage));
            if (fs.existsSync(bannerPath)) {
                fs.unlinkSync(bannerPath);
            }
        }

        // Delete all card images
        if (activity.cards && activity.cards.length > 0) {
            activity.cards.forEach(card => {
                if (card.image) {
                    const cardImagePath = path.join(__dirname, '..', 'uploads', path.basename(card.image));
                    if (fs.existsSync(cardImagePath)) {
                        fs.unlinkSync(cardImagePath);
                    }
                }
            });
        }
    }
    return await Activities.findByIdAndDelete(id);
};

module.exports = {
    getAllActivities,
    getActivityById,
    getActivityCount,
    createActivity,
    updateActivity,
    deleteActivity
};
