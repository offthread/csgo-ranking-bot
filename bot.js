const TeleBot = require('telebot');
const settings = require('./config');
const playerServices = require('./services/player');
const bot = new TeleBot(settings.telegramToken)

bot.on('/set', (msg, props) => {
  const messageData = msg.text.split(' ');
  const rank = messageData.slice(1).join(' ') || 'Unranked';
  const groupId = msg.chat.id;
  const username = msg.from.username || msg.from.name;
  const userId = msg.from.id;
  return playerServices.addOrUpdatePlayer(groupId, userId, username, rank)
    .then((result) => {
      return msg.reply.text(
        `@${username} is now ${rank}!`,
        { asReply: true }
      );
    });
});

bot.on('/list', (msg, props) => {
  return playerServices.getAllPlayers(msg.chat.id)
    .then((players) => {
      let playersStrings = players.map((player) => {
        const rank = player.rank || 'unranked';
        return `${player.username}: ${rank}`;
      });
      return msg.reply.text(
        'Players ranking:\n' + playersStrings.join('\n'),
        { asReply: true }
      );
    });
});

bot.on('/nick', (msg, props) => {
  const messageData = msg.text.split(' ');
  if (messageData.length < 2) {
    throw {
      message: 'You need to send your nickname',
      showToUser: true
    };
  }
  const username = messageData.slice(1).join(' ');
  const groupId = msg.chat.id;
  const userId = msg.from.id;
  return playerServices.addOrUpdatePlayer(groupId, userId, username)
    .then((result) => {
      return msg.reply.text(
        `Your nickname is now ${username}!`,
        { asReply: true }
      );
    });
});

bot.on('/rankings', (msg, props) => {
  return playerServices.getAllRankings()
    .then((rankings) => {
      return msg.reply.text(
        'Available rakings:\n' + rankings.join('\n'),
        { asReply: true }
      );
    });
});

bot.on('error', (error) => {
  if (error.error.showToUser) {
    return error.data.reply.text(
      error.error.message,
      { asReply: true });
  }
    return error.data.reply.text(
      'There was an error processing your command',
      { asReply: true });
});

module.exports = bot;