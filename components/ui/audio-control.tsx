"use client";

import { useAudioContext } from "@/components/ui/audio-context";
import { Play, Pause, SkipForward, SkipBack, Shuffle } from "lucide-react";
import clsx from "clsx";

const AudioControl = () => {
  const {
    isPlaying,
    shuffle,
    next,
    previous,
    togglePlay,
    toggleShuffle,
    currentTrack,
  } = useAudioContext();

  return (
    <div className="p-3">
      {/* Mobile: 2x3 grid layout */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {/* Row 1: Shuffle and Play/Pause */}
        <button
          onClick={toggleShuffle}
          className={clsx(
            "p-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
            "min-h-[44px] min-w-[44px] flex items-center justify-center",
            shuffle
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-muted/50 hover:bg-accent text-foreground hover:text-foreground"
          )}
          title="Shuffle"
          aria-label="Toggle Shuffle"
        >
          <Shuffle size={20} />
        </button>

        <button
          onClick={togglePlay}
          className={clsx(
            "p-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
            "min-h-[44px] min-w-[44px] flex items-center justify-center",
            "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
          title={isPlaying ? "Pause" : "Play"}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={!currentTrack}
        >
          {isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-0.5" />
          )}
        </button>

        {/* Row 2: Previous and Next */}
        <button
          onClick={previous}
          className={clsx(
            "p-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
            "min-h-[48px] min-w-[48px] flex items-center justify-center",
            "bg-muted/50 hover:bg-accent text-foreground hover:text-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
          title="Previous Track"
          aria-label="Previous Track"
          disabled={!currentTrack}
        >
          <SkipBack size={20} />
        </button>

        <button
          onClick={next}
          className={clsx(
            "p-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
            "min-h-[44px] min-w-[44px] flex items-center justify-center",
            "bg-muted/50 hover:bg-accent text-foreground hover:text-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
          title="Next Track"
          aria-label="Next Track"
          disabled={!currentTrack}
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Tablet and Desktop: Horizontal flex layout */}
      <div className="hidden sm:flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
        <button
          onClick={toggleShuffle}
          className={clsx(
            "p-2 md:p-3 lg:p-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
            "min-h-[44px] min-w-[44px]",
            "flex items-center justify-center",
            shuffle
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-muted/50 hover:bg-accent text-foreground hover:text-foreground"
          )}
          title="Shuffle"
          aria-label="Toggle Shuffle"
        >
          <Shuffle size={20} className="w-4 h-4" />
        </button>

        <button
          onClick={previous}
          className={clsx(
            "p-2 md:p-3 lg:p-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
            "min-h-[44px] min-w-[44px]",
            "flex items-center justify-center",
            "bg-muted/50 hover:bg-accent text-foreground hover:text-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
          title="Previous Track"
          aria-label="Previous Track"
          disabled={!currentTrack}
        >
          <SkipBack size={20} className="w-4 h-4" />
        </button>

        <button
          onClick={togglePlay}
          className={clsx(
            "p-3 md:p-4 lg:p-5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
            "min-h-[44px] min-w-[44px]",
            "flex items-center justify-center",
            "bg-muted/50 hover:bg-accent text-foreground hover:text-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
          title={isPlaying ? "Pause" : "Play"}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={!currentTrack}
        >
          {isPlaying ? (
            <Pause size={24} className="w-4 h-4" />
          ) : (
            <Play size={24} className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={next}
          className={clsx(
            "p-2 md:p-3 lg:p-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
            "min-h-[44px] min-w-[44px]",
            "flex items-center justify-center",
            "bg-muted/50 hover:bg-accent text-foreground hover:text-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
          title="Next Track"
          aria-label="Next Track"
          disabled={!currentTrack}
        >
          <SkipForward size={20} className="w-4 h-4" />
        </button>
      </div>

      {/* Track status indicator (optional) */}
      {!currentTrack && (
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            No track loaded
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioControl;
