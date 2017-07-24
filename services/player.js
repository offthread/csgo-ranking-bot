const Player = require('../models/player');

const addOrUpdatePlayer = (groupId, userId, username, rank) => {
  if(rank && !Player.getAvailableRankings().includes(rank)) {
    throw {
      message: 'Invalid rank. Type /rankings to see the list of available ranks',
      showToUser: true
    };
  }
  const update = {
    group_id: groupId,
    telegram_id: userId,
    username: username
  };
  if (rank) {
    update.rank = rank;
  }
  return Player.update(
    {
      group_id: groupId,
      telegram_id: userId
    },
    update,
    { upsert: true }
  );
};

const getPlayerByTelegramId = telegramId => {
  return Player.findOne({ telegram_id: telegramId });
};

const getAllPlayers = (groupId) => {
  return Player.find({ group_id: groupId });
};

const getAllRankings = () => {
  return Promise.resolve(Player.getAvailableRankings());
};

module.exports = {
  addOrUpdatePlayer,
  getPlayerByTelegramId,
  getAllPlayers,
  getAllRankings
};
