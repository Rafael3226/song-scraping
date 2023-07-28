const path = require("path");
const fs = require("fs");
const { default: puppeteer } = require("puppeteer");
const { OpenJson, CreateFile } = require("./fileManagment.js");
const { ParseTop100 } = require("./parseOptions.js");

(async () => {
  // Load Files
  const genres = OpenJson("genres.json");
  const filesList = await GetFileNames("./tops");

  const fileSet = new Set(filesList);

  // Puppeteer Config
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  for (let { genre, url } of genres) {
    const listName = `${genre.replaceAll("/", "-")}.json`;
    if (!fileSet.has(listName)) {
      await page.goto(url + "/top-100");
      const content = await page.evaluate(ParseTop100);

      const genreDir = path.join("tops", listName);
      CreateFile(genreDir, JSON.stringify(content));

      console.log(listName);
    }
  }

  await browser.close();
})();

async function GetFileNames(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, f) => {
      if (err) reject(err);
      resolve(f);
    });
  });
}
