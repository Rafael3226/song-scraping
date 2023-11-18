import { ScrapGenre } from "./scrap-genre";
// import { ScrapTracks } from './track'

export function Scrap(body: HTMLElement) {
  const genres = ScrapGenre(body);
  console.log(JSON.stringify(genres));
  // await ScrapTracks(webLoader)
}
