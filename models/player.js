const mongoose = require("mongoose");

const ranks = [
  'Unranked',
  'Silver I',
  'Silver II',
  'Silver III',
  'Silver IV',
  'Silver Elite',
  'Silver Elite Master',  
  'Gold Nova I',
  'Gold Nova II',
  'Gold Nova III',
  'Gold Nova IV',
  'Master Guardian I',
  'Master Guardian II',
  'Master Guardian Elite',
  'Distinguished Master Guardian',
  'Legendary Eagle',
  'Legendary Eagle Master',
  'Sumpreme Master First Class',
  'The Global Elite'
];

const Player = mongoose.Schema({
  group_id: {
    type: Number,
    required: true
  },
  telegram_id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    enum: ranks
  }
});

Player.statics.getAvailableRankings = () => {
  return ranks;
};

module.exports = mongoose.model("Player", Player);
