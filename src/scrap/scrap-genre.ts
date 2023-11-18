import { Page } from "puppeteer";
import { SCRAPPING_URL } from "../config";

export async function ScrapGenre(page: Page) {
  // Load url from conf
  if (!SCRAPPING_URL) throw new Error("Scrapping Url not loaded");
  // go to url
  await page.goto(SCRAPPING_URL);
  // wait 4 seconds to load
  await new Promise((r) => setTimeout(r, 4000));
  // take screenshot
  await page.screenshot({ path: "out/index.png" });
  // get info
  return await page.$$eval(".dropdown_menu a[data-testid]", (elements) => {
    return [...elements].map((a) => ({
      id: a.href.split("/").slice(-1)[0],
      name: a.innerText,
      url: a.href
    }));
  });
}
