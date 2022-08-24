export interface SongData {
  name: string;
  link: string;
}

export interface CurrentSongType {
  song: SongData;
  progress: number;
  length: number;
}
