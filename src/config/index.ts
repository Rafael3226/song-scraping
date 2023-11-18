import * as path from "path";

export const SCRAPPING_URL = process.env.SCRAPPING_URL;

export const OUT_DIR = "out";
export const GENRE_JSON_PATH = path.join(OUT_DIR, "genre.json");
export const TRACKS_DIR = path.join(OUT_DIR, "tracks");
