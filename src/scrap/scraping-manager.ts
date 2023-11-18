import { Page } from "puppeteer";
import { ScrapGenre } from "./scrap-genre";
import { TrackScraper } from "./scrap-track";
import { saveToFile } from "../services/save-to-file";
import { GENRE_JSON_PATH } from "../config";
import { readJsonFile } from "../services/read-json-file";
import { Genre } from "../types";

export class WebScrapManager {
  constructor(private readonly page: Page) {}
  async genres(): Promise<void> {
    const genres = await ScrapGenre(this.page);
    await saveToFile(GENRE_JSON_PATH, JSON.stringify(genres));
  }
  async track(): Promise<void> {
    const genres = readJsonFile(GENRE_JSON_PATH) as Genre[];
    if (!genres) throw new Error("no genres loaded for scrap tracks");
    const trackScraper = new TrackScraper(this.page, genres);
    await trackScraper.execute();
  }
}
