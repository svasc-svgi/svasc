const PageHero = require('../models/page-hero.model');

const getAllHeroes = async () => {
    return await PageHero.find();
};

const getHeroByPage = async (pageKey) => {
    return await PageHero.findOne({ pageKey });
};

const updateOrCreateHero = async (pageKey, data) => {
    return await PageHero.findOneAndUpdate(
        { pageKey },
        { $set: { ...data, pageKey } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
};

const deleteHero = async (pageKey) => {
    return await PageHero.findOneAndDelete({ pageKey });
};

module.exports = {
    getAllHeroes,
    getHeroByPage,
    updateOrCreateHero,
    deleteHero
};
