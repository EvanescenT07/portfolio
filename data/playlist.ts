import { Track } from "@/types/audio-types";

export const myPlaylist: Track[] = [
  {
    id: 1,
    title: "[Lofi] Fly Me To The Moon",
    artist: "Frank Sinatra",
    src: "/audio/[LOFI]_Fly_Me_to_the_Moon.mp3",
  },
  {
    id: 2,
    title: "[Lofi] La Vie en Rose",
    artist: "Édith Piaf",
    src: "/audio/[LOFI]_La_Vie_en_rose.mp3",
  },
  {
    id: 3,
    title: "[Lofi] New Horizons",
    artist: "Animal Crossing",
    src: "/audio/[LOFI]_New_Horizons.mp3",
  },
  {
    id: 4,
    title: "[Lofi] Redbone",
    artist: "Childish Gambino",
    src: "/audio/[LOFI]_Redbone.mp3",
  },
  {
    id: 5,
    title: "[Lofi] The Girl i haven't met",
    artist: "Kudasaibeats",
    src: "/audio/[LOFI]_The_girl_i_havent_met.mp3",
  },
  {
    id: 6,
    title: "[Lofi] The Less I Know The Better",
    artist: "Tame Impala",
    src: "/audio/[LOFI]_The_Less_i_know_the_better.mp3",
  },
];

export const validatePlaylist = (): boolean => {
  return myPlaylist.every(
    (track) => track.id && track.title && track.artist && track.src
  );
};
