
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function fetchAndSaveDraw() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set a realistic user-agent
  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36'
  );

  // Navigate to main page to establish session
  await page.goto('https://bwfworldtour.bwfbadminton.com/', {
    waitUntil: 'networkidle2'
  });

  // Fetch the tournament draw inside browser context
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

  // Define file path
  const filePath = path.join(__dirname, 'drawData.json');

  // Save JSON to file
  fs.writeFileSync(filePath, JSON.stringify(drawData, null, 2), 'utf-8');

  console.log(`Tournament draw saved to ${filePath}`);

  await browser.close();
}

fetchAndSaveDraw().catch(err => {
  console.error('Error:', err);
});
