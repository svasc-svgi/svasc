const RankHolder = require('../../models/alumni/rank-holder.model');

const getAllRankHolders = async () => {
    const rankHolders = await RankHolder.find().sort({ year: -1, rank: 1 });

    // Group by year
    const groupedByYear = rankHolders.reduce((acc, holder) => {
        if (!acc[holder.year]) {
            acc[holder.year] = [];
        }
        acc[holder.year].push({
            _id: holder._id,
            name: holder.name,
            degree: holder.degree,
            rank: holder.rank
        });
        return acc;
    }, {});

    return groupedByYear;
};

const getRankHoldersByYear = async (year) => {
    return await RankHolder.find({ year }).sort({ rank: 1 });
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
    return await RankHolder.findById(id);
};

module.exports = {
    getAllRankHolders,
    getRankHoldersByYear,
    createRankHolder,
    updateRankHolder,
    deleteRankHolder,
    getRankHolderById
};
