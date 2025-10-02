"use client";
import { useAudioContext } from "./audio-context";
import { Play, Pause } from "lucide-react";
import { useState } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import clsx from "clsx";
import Image from "next/image";

const Playlist = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    seek,
    togglePlayPause,
  } = useAudioContext();

  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const [showValue, setShowValue] = useState(false);

  // Format time helper
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle slider change
  const handleSliderChange = (newValues: number[]) => {
    const newTime = newValues[0];
    setDragTime(newTime);
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  // Handle slider commit (mouse up)
  const handleSliderCommit = () => {
    if (isDragging) {
      seek(dragTime);
      setIsDragging(false);
    }
  };

  // Progress percentage for visual display
  const currentTimeValue = isDragging ? dragTime : currentTime || 0;

  return (
    <div className="space-y-4">
      {currentTrack ? (
        <div className="p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-xl border border-border/50 backdrop-blur-sm">
          {/* Top section with disk and track info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-shrink-0">
              <div
                className={`w-12 h-12 transition-transform duration-200 ${
                  isPlaying ? "animate-spin" : ""
                }`}
                style={{ animationDuration: "3s" }}
              >
                <Image
                  src="/assets/music-disk.svg"
                  alt="Music Disk"
                  width={48}
                  height={48}
                  className="w-full h-full text-foreground"
                  priority
                />
              </div>

              {/* Play/Pause button overlay */}
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200 group"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                ) : (
                  <Play className="w-4 h-4 text-white group-hover:scale-110 transition-transform ml-0.5" />
                )}
              </button>
            </div>

            {/* Track Information */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">
                {currentTrack.title}
              </p>
              <p className="text-sm text-foreground truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* ...existing slider code... */}
          <div className="space-y-3 md:space-y-4">
            {/* Time Display Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex flex-col">
                  <span className="hidden sm:block text-xs md:text-sm text-foreground">
                    {isPlaying ? "Playing" : "Paused"}
                  </span>
                </div>
              </div>

              {/* Current Time Display */}
              <div className="flex items-center gap-1 text-foreground">
                <span className="text-xs md:text-sm tabular-nums">
                  {formatTime(currentTimeValue)}
                </span>
                <span className="text-xs">/</span>
                <span className="text-xs md:text-sm tabular-nums">
                  {formatTime(duration || 0)}
                </span>
              </div>
            </div>

            {/* Enhanced Progress Slider using Radix */}
            <div className="relative">
              <RadixSlider.Root
                value={[currentTimeValue]}
                onValueChange={handleSliderChange}
                onValueCommit={handleSliderCommit}
                onPointerDown={() => {
                  setIsDragging(true);
                  setShowValue(true);
                }}
                onPointerUp={() => {
                  setIsDragging(false);
                  setTimeout(() => setShowValue(false), 1500);
                }}
                max={duration || 100}
                step={0.1}
                className="relative flex h-6 md:h-8 w-full touch-none select-none items-center"
              >
                <RadixSlider.Track className="relative h-2 md:h-3 w-full grow rounded-full bg-muted overflow-hidden">
                  <RadixSlider.Range
                    className={clsx(
                      "absolute h-full rounded-full transition-all duration-300",
                      isPlaying
                        ? "bg-gradient-to-r from-primary/80 to-primary"
                        : "bg-gradient-to-r from-primary/80 to-primary"
                    )}
                  />
                </RadixSlider.Track>

                <RadixSlider.Thumb
                  className={clsx(
                    "relative block h-5 w-5 md:h-6 md:w-6 rounded-full bg-background border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isPlaying
                      ? "border-primary shadow-lg shadow-primary/25"
                      : "border-muted-foreground shadow-lg shadow-muted-foreground/25",
                    isDragging ? "scale-125 shadow-xl" : "hover:scale-110"
                  )}
                  aria-label="Track progress control"
                >
                  {(isDragging || showValue) && (
                    <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-foreground text-background px-2 py-1 rounded-md text-xs md:text-sm font-medium shadow-lg whitespace-nowrap">
                        {formatTime(currentTimeValue)}
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
                    </div>
                  )}
                </RadixSlider.Thumb>
              </RadixSlider.Root>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-muted/50 rounded-xl border border-dashed border-border">
          <div className="flex items-center justify-center gap-3 py-6">
            {/* Static disk when no music - ALSO USING SVG */}
            <div className="w-12 h-12 opacity-50">
              <Image
                src="/assets/music-disk.svg"
                alt="Music Disk"
                width={48}
                height={48}
                className="w-full h-full text-foreground"
              />
            </div>
            <p className="text-foreground text-sm">No track loaded</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
