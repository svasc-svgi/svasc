const PageHeroService = require('../services/page-hero.service');
const { uploadToCloudinary } = require('../middlewares/uploadMiddleware');

const getAllHeroes = async (req, res) => {
    try {
        const heroes = await PageHeroService.getAllHeroes();
        res.status(200).json({
            success: true,
            data: heroes
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getHeroByPage = async (req, res) => {
    try {
        const { pageKey } = req.params;
        const hero = await PageHeroService.getHeroByPage(pageKey);
        if (!hero) {
            return res.status(404).json({
                success: false,
                message: `Hero not found for page: ${pageKey}`
            });
        }
        res.status(200).json({
            success: true,
            data: hero
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateOrCreateHero = async (req, res) => {
    try {
        const { pageKey } = req.params;
        const { title, description, image: textImage } = req.body;
        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/page-heros');
            updateData.image = uploadResult.secure_url;
        } else if (textImage !== undefined && textImage !== '') {
            updateData.image = textImage;
        }

        const hero = await PageHeroService.updateOrCreateHero(pageKey, updateData);
        res.status(200).json({
            success: true,
            data: hero,
            message: "Page Hero updated successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllHeroes,
    getHeroByPage,
    updateOrCreateHero
};
