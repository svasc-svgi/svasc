const ActivitiesService = require('../services/activities.service');
const { uploadToCloudinary } = require('../middlewares/uploadMiddleware');

// Helper to find file by fieldname from req.files (array or object) or req.file
const findUploadedFile = (req, fieldname) => {
    if (!req) return null;
    if (req.file && req.file.fieldname === fieldname) return req.file;
    if (req.files) {
        if (Array.isArray(req.files)) {
            return req.files.find(f => f.fieldname === fieldname) || null;
        }
        if (req.files[fieldname]) {
            return Array.isArray(req.files[fieldname]) ? req.files[fieldname][0] : req.files[fieldname];
        }
    }
    return null;
};

const getAllActivities = async (req, res) => {
    try {
        const activities = await ActivitiesService.getAllActivities();
        res.status(200).json({ success: true, data: activities, message: "Activities fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await ActivitiesService.getActivityById(id);
        if (!activity) return res.status(404).json({ success: false, message: "Activity not found" });
        res.status(200).json({ success: true, data: activity, message: "Activity fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createActivity = async (req, res) => {
    try {
        const { 
            category, 
            categoryMode,
            intro,
            vision,
            mission,
            clubsSummary,
            objectives,
            description, 
            bannerImageUrl,
            cardsData,
            cardTitles, 
            cardDescriptions 
        } = req.body;

        const currentCount = await ActivitiesService.getActivityCount();

        // 1. Banner image upload or fallback
        let bannerImage = bannerImageUrl || '';
        const bannerFile = findUploadedFile(req, 'bannerImage');
        if (bannerFile && bannerFile.buffer) {
            const uploadResult = await uploadToCloudinary(bannerFile.buffer, 'svasc/activities/banners', 'image');
            bannerImage = uploadResult.secure_url;
        }

        // 2. Cards handling
        let cards = [];
        if (cardsData) {
            let parsedCards = [];
            try {
                parsedCards = typeof cardsData === 'string' ? JSON.parse(cardsData) : cardsData;
            } catch (e) {
                parsedCards = [];
            }

            for (let i = 0; i < parsedCards.length; i++) {
                const c = parsedCards[i];
                let cardImg = c.image || '/cell.JPG';

                const cardFile = findUploadedFile(req, `cardImage_${i}`);
                if (cardFile && cardFile.buffer) {
                    const uploadResult = await uploadToCloudinary(cardFile.buffer, 'svasc/activities/cards', 'image');
                    cardImg = uploadResult.secure_url;
                }

                cards.push({
                    title: c.title || '',
                    description: c.description || c.rawDescription || '',
                    intro: c.intro || '',
                    image: cardImg,
                    vision: c.vision || '',
                    mission: c.mission || '',
                    objectives: c.objectives || '',
                    showRoles: !!c.showRoles,
                    roles: c.roles || [],
                    showMembers: !!c.showMembers,
                    memberFormat: c.memberFormat || 'table',
                    coordinator: c.coordinator || '',
                    memberList: c.memberList || '',
                    members: c.members || []
                });
            }
        } else if (req.files) {
            // Backward compatibility with raw cardImages array
            let parsedCardTitles = [];
            let parsedCardDescriptions = [];
            try { parsedCardTitles = JSON.parse(cardTitles || '[]'); } catch (e) {}
            try { parsedCardDescriptions = JSON.parse(cardDescriptions || '[]'); } catch (e) {}

            const cardFiles = Array.isArray(req.files) ? req.files.filter(f => f.fieldname === 'cardImages') : (req.files.cardImages || []);
            for (let index = 0; index < cardFiles.length; index++) {
                const file = cardFiles[index];
                const uploadResult = await uploadToCloudinary(file.buffer, 'svasc/activities/cards', 'image');
                cards.push({
                    title: parsedCardTitles[index] || '',
                    description: parsedCardDescriptions[index] || '',
                    image: uploadResult.secure_url
                });
            }
        }

        const activity = await ActivitiesService.createActivity({
            category: category || '',
            categoryMode: categoryMode || 'structured',
            intro: intro || '',
            vision: vision || '',
            mission: mission || '',
            clubsSummary: clubsSummary || '',
            objectives: objectives || '',
            description: description || '',
            bannerImage: bannerImage || '/cell.JPG',
            cards,
            order: currentCount
        });

        res.status(201).json({ success: true, data: activity, message: "Activity created successfully" });
    } catch (error) {
        console.error("Error creating activity:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            category, 
            categoryMode,
            intro,
            vision,
            mission,
            clubsSummary,
            objectives,
            description, 
            bannerImageUrl,
            cardsData,
            cardTitles, 
            cardDescriptions 
        } = req.body;

        const oldActivity = await ActivitiesService.getActivityById(id);
        if (!oldActivity) return res.status(404).json({ success: false, message: "Activity not found" });

        let updateData = {};
        if (category !== undefined) updateData.category = category;
        if (categoryMode !== undefined) updateData.categoryMode = categoryMode;
        if (intro !== undefined) updateData.intro = intro;
        if (vision !== undefined) updateData.vision = vision;
        if (mission !== undefined) updateData.mission = mission;
        if (clubsSummary !== undefined) updateData.clubsSummary = clubsSummary;
        if (objectives !== undefined) updateData.objectives = objectives;
        if (description !== undefined) updateData.description = description;

        // 1. Handle Banner Image
        const bannerFile = findUploadedFile(req, 'bannerImage');
        if (bannerFile && bannerFile.buffer) {
            const uploadResult = await uploadToCloudinary(bannerFile.buffer, 'svasc/activities/banners', 'image');
            updateData.bannerImage = uploadResult.secure_url;
        } else if (bannerImageUrl) {
            updateData.bannerImage = bannerImageUrl;
        }

        // 2. Handle Cards: Preserves all existing cards and updates only the ones changed
        if (cardsData) {
            let parsedCards = [];
            try {
                parsedCards = typeof cardsData === 'string' ? JSON.parse(cardsData) : cardsData;
            } catch (e) {
                parsedCards = [];
            }

            const updatedCards = [];
            for (let i = 0; i < parsedCards.length; i++) {
                const c = parsedCards[i];
                let cardImg = c.image;

                // Check if a specific file was uploaded for this card
                const cardFile = findUploadedFile(req, `cardImage_${i}`);
                if (cardFile && cardFile.buffer) {
                    const uploadResult = await uploadToCloudinary(cardFile.buffer, 'svasc/activities/cards', 'image');
                    cardImg = uploadResult.secure_url;
                } else if (!cardImg) {
                    // Fallback to existing card image from database if unchanged
                    if (oldActivity.cards && oldActivity.cards[i] && oldActivity.cards[i].image) {
                        cardImg = oldActivity.cards[i].image;
                    } else {
                        cardImg = '/cell.JPG';
                    }
                }

                updatedCards.push({
                    title: c.title || '',
                    description: c.description || c.rawDescription || '',
                    intro: c.intro !== undefined ? c.intro : ((oldActivity.cards && oldActivity.cards[i]) ? oldActivity.cards[i].intro : ''),
                    image: cardImg,
                    vision: c.vision || '',
                    mission: c.mission || '',
                    objectives: c.objectives || '',
                    showRoles: !!c.showRoles,
                    roles: c.roles || [],
                    showMembers: !!c.showMembers,
                    memberFormat: c.memberFormat || 'table',
                    coordinator: c.coordinator || '',
                    memberList: c.memberList || '',
                    members: c.members || []
                });
            }

            updateData.cards = updatedCards;
        } else if (req.files) {
            // Backward compatibility
            let parsedCardTitles = [];
            let parsedCardDescriptions = [];
            try { parsedCardTitles = JSON.parse(cardTitles || '[]'); } catch (e) {}
            try { parsedCardDescriptions = JSON.parse(cardDescriptions || '[]'); } catch (e) {}

            const cardFiles = Array.isArray(req.files) ? req.files.filter(f => f.fieldname === 'cardImages') : (req.files.cardImages || []);
            if (cardFiles.length > 0) {
                const uploadedCards = [];
                for (let index = 0; index < cardFiles.length; index++) {
                    const file = cardFiles[index];
                    const uploadResult = await uploadToCloudinary(file.buffer, 'svasc/activities/cards', 'image');
                    uploadedCards.push({
                        title: parsedCardTitles[index] || '',
                        description: parsedCardDescriptions[index] || '',
                        image: uploadResult.secure_url
                    });
                }
                updateData.cards = uploadedCards;
            }
        }

        const updatedActivity = await ActivitiesService.updateActivity(id, updateData);
        res.status(200).json({ success: true, data: updatedActivity, message: "Activity updated successfully" });
    } catch (error) {
        console.error("Error updating activity:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await ActivitiesService.deleteActivity(id);
        if (!deletedActivity) return res.status(404).json({ success: false, message: "Activity not found" });
        res.status(200).json({ success: true, message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllActivities, getActivityById, createActivity, updateActivity, deleteActivity };
