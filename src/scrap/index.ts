import { WebDocumentLoader } from "../services/WebDocumentLoader";
import { ScrapGenres } from "./genre";
// import { ScrapTracks } from './track'

export async function Scrap(webLoader: WebDocumentLoader) {
  const genres = await ScrapGenres(webLoader);
  console.log(JSON.stringify(genres));
  // await ScrapTracks(webLoader)
}
