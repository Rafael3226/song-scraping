import { Page } from "puppeteer";
import * as path from "path";
import { TRACKS_DIR } from "../config";
import { saveToFile } from "../services/save-to-file";
import { Artist, Genre, Track } from "../types";

export class TrackScraper {
  constructor(private readonly page: Page, private readonly genres: Genre[]) {}

  async execute() {
    for (const genre of this.genres) {
      const tracksByGenre = await this.byGenre(genre);
      const jsonString = JSON.stringify(tracksByGenre);
      const name = genre.name.replaceAll(" / ", "-");
      const pathByGenre = path.join(TRACKS_DIR, `${name}.json`);
      await saveToFile(pathByGenre, jsonString);
    }
  }

  async byGenre(genre: Genre) {
    await this.goTo(genre);
    const res = await this.page.$$eval(
      '[data-testid="tracks-table-row"]',
      (elements, genre): Track[] => {
        return [...elements].map((groupElement): Track => {
          const dateElement = groupElement.querySelector(".cell.date");
          const artWorkElement: HTMLImageElement | null =
            groupElement.querySelector(".controls img");

          const nameElement: HTMLAnchorElement | null =
            groupElement.querySelector("div.container a");

          const bpmElement: HTMLDivElement | null =
            groupElement.querySelector(".cell.bpm div");
          const [bpm, key] = bpmElement?.innerText.split("-") || ["", ""];

          const artistElements: NodeListOf<HTMLAnchorElement> =
            groupElement.querySelectorAll("div.container div a");

          const artists: Artist[] = [...artistElements].map((a) => ({
            id: a.href.split("/").slice(-1)[0],
            name: a.title || "",
            url: a.href || ""
          }));

          const labelElement: HTMLAnchorElement | null =
            groupElement.querySelector(".cell.label a");

          const priceElement: HTMLSpanElement | null =
            groupElement.querySelector("span.price");

          return {
            id: nameElement?.href.split("/").slice(-1)[0] || "",
            name: nameElement?.title || "",
            artists,
            isOriginalMix:
              nameElement?.innerText.includes("Original Mix") || false,
            length: null,
            releaseDate: new Date(dateElement?.innerHTML || 0).toString(),
            bpm: bpm?.trim() || "",
            key: key?.trim() || "",
            genre,
            label: {
              id: labelElement?.href.split("/").slice(-1)[0] || "",
              name: labelElement?.title || "",
              url: labelElement?.href || ""
            },
            url: nameElement?.href || "",
            price: priceElement?.innerText || "",
            artWorkUrl: artWorkElement?.src || ""
          };
        });
      },
      genre
    );
    return res;
  }

  private async goTo(genre: Genre) {
    const { page } = this;
    // go to url
    await page.goto(`${genre.url}/top-100`);
    // wait 4 seconds to load
    await new Promise((r) => setTimeout(r, 4000));
    // take screenshot
    const name = genre.name.replaceAll(" / ", "-");
    await page.screenshot({
      path: path.join(TRACKS_DIR, "img", `${name}.png`)
    });
  }
}
