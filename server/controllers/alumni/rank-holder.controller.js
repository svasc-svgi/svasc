const RankHolderService = require('../../services/alumni/rank-holder.service');

const getAllRankHolders = async (req, res) => {
    try {
        const rankHolders = await RankHolderService.getAllRankHolders();
        res.status(200).json({
            success: true,
            data: rankHolders,
            message: "Rank Holders fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getRankHoldersByYear = async (req, res) => {
    try {
        const { year } = req.params;
        const rankHolders = await RankHolderService.getRankHoldersByYear(parseInt(year));
        res.status(200).json({
            success: true,
            data: rankHolders,
            message: `Rank Holders for year ${year} fetched successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createRankHolder = async (req, res) => {
    try {
        const { name, degree, rank, year } = req.body;

        if (!name || !degree || !rank || !year) {
            return res.status(400).json({
                success: false,
                message: 'All fields (name, degree, rank, year) are required'
            });
        }

        const rankHolder = await RankHolderService.createRankHolder({ name, degree, rank, year });
        res.status(201).json({
            success: true,
            data: rankHolder,
            message: "Rank Holder created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateRankHolder = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, degree, rank, year } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (degree) updateData.degree = degree;
        if (rank) updateData.rank = rank;
        if (year) updateData.year = year;

        const updatedRankHolder = await RankHolderService.updateRankHolder(id, updateData);
        if (!updatedRankHolder) {
            return res.status(404).json({
                success: false,
                message: "Rank Holder not found"
            });
        }
        res.status(200).json({
            success: true,
            data: updatedRankHolder,
            message: "Rank Holder updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteRankHolder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRankHolder = await RankHolderService.deleteRankHolder(id);
        if (!deletedRankHolder) {
            return res.status(404).json({
                success: false,
                message: "Rank Holder not found"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Rank Holder deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllRankHolders,
    getRankHoldersByYear,
    createRankHolder,
    updateRankHolder,
    deleteRankHolder
};
