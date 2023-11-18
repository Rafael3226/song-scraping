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
