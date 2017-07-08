const TeleBot = require('telebot');
const settings = require('./config');
const playerServices = require('./services/player');
const bot = new TeleBot(settings.telegramToken)

bot.on('/set', (msg, props) => {
  const messageData = msg.text.split(' ');
  const rank = messageData.slice(1).join(' ');
  const groupId = msg.chat.id;
  const username = msg.from.username;
  const userId = msg.from.id;
  return playerServices.addOrUpdatePlayer(groupId, userId, username, rank)
    .then((result) => {
      const rankMessage = rank ? `ranked ${rank}` : 'unranked'; 
      return msg.reply.text(
        `@${username} is now ${rankMessage}!`,
        { asReply: true }
      );
    });
});

bot.on('/list', (msg, props) => {
  return playerServices.getAllPlayers(msg.chat.id)
    .then((players) => {
      let playersStrings = players.map((player) => {
        const rank = player.rank || 'unranked';
        return `@${player.username}: ${rank}`;
      });
      return msg.reply.text(
        'Players ranking:\n' + playersStrings.join('\n'),
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