const express = require("express");
const router = express.Router();
const puppeteer = require('puppeteer');

const {
  saveMatches,
  getMatchesByRound,
  getAllMatches,
} = require("../controllers/matches.controller");

router.get("/", getAllMatches);

router.post("/save", saveMatches);

router.get('/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36'
    );

    await page.goto('https://bwfworldtour.bwfbadminton.com/', { waitUntil: 'networkidle2' });

    const drawData = await page.evaluate(async () => {
      const response = await fetch('https://extranet-lv.bwfbadminton.com/api/vue-tournament-draw-data', {
        method: 'POST',
        headers: {
          'accept': 'application/json, text/plain, */*',
          'content-type': 'application/json;charset=UTF-8',
          'authorization': 'Bearer 2|NaXRu9JnMpSdb8l86BkJxj6gzKJofnhmExwr8EWkQtHoattDAGimsSYhpM22a61e1crjTjfIGTKfhzxA'
        },
        body: JSON.stringify({
          tmtTab: 'draw',
          tmtId: 5268,
          drawId: '1'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return response.json();
    });

    await browser.close();

    res.json(drawData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:round", getMatchesByRound);

module.exports = router;
