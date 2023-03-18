const express = require('express');
const { chromium } = require('playwright');

const app = express();


app.use(express.json());

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
  await page.goto('https://www.lindaikejisblog.com/');
  
  const articles = await page.$$eval('.main_board', (mainboard) => {
    return mainboard.map((mainboard) => {
      const title = mainboard.textContent.trim();
      const url = mainboard.href;
      return {title, url};
    })
  })
  console.log(articles)
  await browser.close();
  })();

app.listen(8080, function() {
	console.log("listening on port 8080!")
})