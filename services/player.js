const Player = require('../models/player');

const addOrUpdatePlayer = (groupId, userId, username, rank) => {
  return Player.update(
    {
      group_id: groupId,
      telegram_id: userId
    },
    {
      group_id: groupId,
      telegram_id: userId,
      username: username,
      rank: rank
    },
    { upsert: true }
  );
};

const getPlayerByTelegramId = telegramId => {
  return Player.findOne({ telegram_id: telegramId });
};

const getAllPlayers = (groupId) => {
  return Player.find({ group_id: groupId });
};

module.exports = {
  addOrUpdatePlayer,
  getPlayerByTelegramId,
  getAllPlayers
};
