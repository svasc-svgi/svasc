const RankHolder = require('../../models/alumni/rank-holder.model');

const getAllRankHolders = async () => {
    return await RankHolder.find().sort({ year: -1, rank: 1 }).lean();
};

const getRankHoldersByYear = async (year) => {
    return await RankHolder.find({ year }).sort({ rank: 1 }).lean();
};

const createRankHolder = async (data) => {
    const rankHolder = new RankHolder(data);
    return await rankHolder.save();
};

const updateRankHolder = async (id, data) => {
    return await RankHolder.findByIdAndUpdate(id, data, { new: true });
};

const deleteRankHolder = async (id) => {
    return await RankHolder.findByIdAndDelete(id);
};

const getRankHolderById = async (id) => {
    return await RankHolder.findById(id).lean();
};

module.exports = {
    getAllRankHolders,
    getRankHoldersByYear,
    createRankHolder,
    updateRankHolder,
    deleteRankHolder,
    getRankHolderById
};