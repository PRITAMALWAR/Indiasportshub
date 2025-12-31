const Match = require("../models/Match");

exports.saveMatches = async (req, res) => {
  try {
    const matches = await Match.insertMany(req.body);
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMatchesByRound = async (req, res) => {
  try {
    const matches = await Match.find({ roundName: req.params.round });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
