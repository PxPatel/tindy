export interface Card {
  id: string;
  albumCover: string;
  trackName: string;
  albumName: string;
  artistName: string;
  image: string;
}

export enum SwipeResult {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}
