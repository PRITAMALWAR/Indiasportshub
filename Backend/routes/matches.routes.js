const express = require("express");
const router = express.Router();

const {
  saveMatches,
  getMatchesByRound,
  getAllMatches,
} = require("../controllers/matches.controller");

router.get("/", getAllMatches);

router.post("/save", saveMatches);

router.get("/:round", getMatchesByRound);

module.exports = router;
