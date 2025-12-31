const Match = require("../models/Match");

exports.saveMatches = async (req, res) => {
  try {
    await Match.deleteMany({});
    const matches = await Match.insertMany(req.body);

    res.status(201).json({
      message: "Match data saved successfully",
      count: matches.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchesByRound = async (req, res) => {
  try {
    const { round } = req.params;
    const matches = await Match.find({ roundName: round });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find({});
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};