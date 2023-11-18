import puppeteer from "puppeteer";

export async function app() {
  /**
   * - set de browser and page
   * - goto url
   * - load genres
   * - load tracks
   *      - load labels
   *      - load artists
   */
  // Puppeteer Config

  const browser = await puppeteer.launch({ headless: "new", timeout: 10000 });
  const [page] = await browser.pages();
  await page.setViewport({
    width: 1500,
    height: 1000,
    deviceScaleFactor: 1
  });

  //const genres = await ScrapGenre(page);
  //await saveToFile("out/genre.json", JSON.stringify(genres));

  await browser.close();
}
