const express = require("express");
const router = express.Router();
const {
  saveMatches,
  getMatchesByRound,
} = require("../controllers/matches.controller");

router.post("/save", saveMatches);
router.get("/:round", getMatchesByRound);

module.exports = router;
