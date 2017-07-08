const mongoose = require("mongoose");

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
    type: String
  }
});

module.exports = mongoose.model("Player", Player);
