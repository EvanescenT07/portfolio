import { RefObject } from "react";

export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

export interface Playlist {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  shuffle: boolean;
}

export interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  shuffle: boolean;
  currentTime: number;
  duration: number;
  setVolume: (volume: number) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  togglePlay: () => void;
  togglePlayPause: () => void;
  toggleShuffle: () => void;
  seek: (time: number) => void;
  audioRef: RefObject<HTMLAudioElement | null>;
}
