require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const matchRoutes = require("./routes/matches.routes");
const scrapeMatches = require("./scraper/scrapeMatches");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/matches", matchRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await scrapeMatches();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
