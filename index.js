const mongoose = require('mongoose');
const settings = require('./config');
const bot = require('./bot');

mongoose.connection.on('error', function(err) {
  console.error('mongo connection error: %s', err.message || err);
});

mongoose.connection.on('open', function() {
  console.info('mongo connection opened');
});

const mongo = settings.mongo;
mongoose.connect(mongo.host, mongo.database, mongo.port);

bot.start();