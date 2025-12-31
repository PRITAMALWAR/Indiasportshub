const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  roundName: String,
  eventName: String,
  drawName: String,
  player1: String,
  player2: String,
  score: String,
  winner: String,
});

module.exports = mongoose.model("Match", MatchSchema);
