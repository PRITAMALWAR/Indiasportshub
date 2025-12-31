const fs = require("fs");
const path = require("path");

//load raw data
const rawDataPath = path.join(__dirname, "apidata.json");
const rawData = JSON.parse(fs.readFileSync(rawDataPath, "utf-8"));

//define required filters
const REQUIRED_ROUNDS = ["QF", "SF", "Final"];

// filter logic
const filteredMatches = Object.values(rawData)
  .map(item => item.match)
  .filter(match =>
    match.eventName === "MS" &&
    REQUIRED_ROUNDS.includes(match.roundName)
  )
  .map(match => {
    const player1 = match.team1.players[0].nameDisplay;
    const player2 = match.team2.players[0].nameDisplay;

    return {
      roundName: match.roundName,
      eventName: match.eventName,
      drawName: match.drawName,
      player1,
      player2,
      score: match.score.map(s => `${s.home}-${s.away}`).join(", "),
      winner: match.winner === 1 ? player1 : player2
    };
  });

// write to finaldata.json
const outputPath = path.join(__dirname, "finaldata.json");
fs.writeFileSync(outputPath, JSON.stringify(filteredMatches, null, 2));

// success log
console.log(`Filtered data saved to finaldata.json`);
console.log(`Total matches saved: ${filteredMatches.length}`);
