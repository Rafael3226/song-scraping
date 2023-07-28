const puppeteer = require("puppeteer");
const { CreateFile } = require("./fileManagment");

const URL = "https://www.beatport.com/";

async function parsePageContent(URL, parseFunction) {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Open a new tab
  const page = await browser.newPage();

  // Visit the page and wait until network connections are completed
  await page.goto(URL, { waitUntil: "networkidle2" });

  // Interact with the DOM to retrieve the titles
  const titles = await page.evaluate(parseFunction);

  // Don't forget to close the browser instance to clean up the memory
  await browser.close();

  // Print the results
  titles.forEach((title) => console.log(`- ${title}`));
}

parsePageContent(URL, () => {
  let genres = [];
  const menuList = document.querySelectorAll(".dropdown_menu");
  menuList.forEach((menu) => {
    menu.querySelectorAll("a").forEach((a) => {
      genres.push({ genre: a.innerHTML, url: a.href });
    });
  });

  const content = JSON.stringify(genres);
  CreateFile("genres.json", content);
});
