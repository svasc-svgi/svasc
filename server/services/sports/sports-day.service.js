const SportsDay = require('../../models/sports/sports-day.model');

const getSportsDay = async () => {
    let sportsDay = await SportsDay.findOne().lean();
    if (!sportsDay) {
        const initial = new SportsDay();
        sportsDay = await initial.save();
        return sportsDay.toObject ? sportsDay.toObject() : sportsDay;
    }
    return sportsDay;
};

const updateSportsDay = async (data) => {
    let sportsDay = await SportsDay.findOne();
    if (!sportsDay) {
        sportsDay = new SportsDay(data);
        return await sportsDay.save();
    }
    Object.assign(sportsDay, data);
    return await sportsDay.save();
};

module.exports = {
    getSportsDay,
    updateSportsDay
};

