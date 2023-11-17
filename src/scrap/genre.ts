import { SCRAPPING_URL } from "../config";
import { ParseGenre } from "../parse/ParseGenre";
import { WebDocumentLoader } from "../services/WebDocumentLoader";

export async function ScrapGenres(webLoader: WebDocumentLoader) {
  if (!SCRAPPING_URL) throw new Error("Main URL not loaded");
  const document = await webLoader.load(SCRAPPING_URL);

  const genreElements = document.getElementsByClassName("genre");
  return ParseGenre.list(genreElements);
}
