import puppeteer from "puppeteer";
import { Scrap } from "./scrap";
import { WebDocumentLoader } from "./services/WebDocumentLoader";

export type Genre = {
  id: string;
  name: string;
  url: string;
};

export type Artist = {
  id: string;
  name: string;
  url: string;
};

export type Label = {
  id: string;
  name: string;
  url: string;
};

export type Track = {
  id: string;
  name: string;
  artists: Artist[];
  isOriginalMix: boolean;
  length: string;
  releaseDate: Date;
  bpm: number;
  key: string;
  genre: Genre;
  label: Label;
  url: string;
};

async function main() {
  /**
   * - set de browser and page
   * - load genres
   * - load tracks
   *      - load labels
   *      - load artists
   */
  // Puppeteer Config
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    const webLoader = new WebDocumentLoader(page);

    await Scrap(webLoader);

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

main();
