"use client";
import { useAudioContext } from "@/components/ui/audio-context";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";
import * as RadixSlider from "@radix-ui/react-slider";
import clsx from "clsx";

const VolumeSlider = () => {
  const { volume, setVolume } = useAudioContext();
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const [showValue, setShowValue] = useState(false);

  // Store previous volume for unmute functionality
  useEffect(() => {
    if (volume > 0) {
      setPreviousVolume(volume);
    }
  }, [volume]);

  const handleVolumeChange = (newValues: number[]) => {
    const newVolume = newValues[0] / 100;
    setVolume(newVolume);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

  // Get appropriate volume icon
  const getVolumeIcon = () => {
    const iconSize = "w-4 h-4 sm:w-5 sm:h-5"; // Enhanced: Added sm breakpoint
    if (volume === 0) return <VolumeX className={iconSize} />;
    if (volume < 0.5) return <Volume1 className={iconSize} />;
    return <Volume2 className={iconSize} />;
  };

  // Get volume level description
  const getVolumeLevel = () => {
    if (volume === 0) return "Muted";
    if (volume < 0.3) return "Low";
    if (volume < 0.7) return "Medium";
    return "High";
  };

  const volumePercentage = Math.round(volume * 100);

  return (
    /* Enhanced responsive spacing */
    <div className="space-y-3 sm:space-y-4 lg:space-y-5">
      {/* Enhanced responsive header layout */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Enhanced responsive mute button */}
          <button
            onClick={toggleMute}
            className={clsx(
              "px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95",   
              "min-h-[48px] min-w-[48px]", // Minimum touch targets
              volume === 0
                ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                : "hover:bg-accent text-foreground hover:text-foreground"
            )}
            title={volume > 0 ? "Mute" : "Unmute"}
            aria-label={volume > 0 ? "Mute" : "Unmute"}
          >
            {getVolumeIcon()}
          </button>

          {/* Enhanced responsive labels */}
          <div className="flex flex-col min-w-0">
            {" "}
            {/* Added min-w-0 for text truncation */}
            <span className="text-sm sm:text-base lg:text-base font-medium text-foreground truncate">
              Volume
            </span>
            <span className="hidden sm:block text-xs sm:text-sm lg:text-sm text-foreground truncate">
              {getVolumeLevel()}
            </span>
          </div>
        </div>

        {/* Enhanced responsive percentage display */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <NumberFlow
            value={volumePercentage}
            willChange
            isolate
            opacityTiming={{
              duration: 250,
              easing: "ease-out",
            }}
            transformTiming={{
              easing: `linear(0, 0.0033 0.8%, 0.0263 2.39%, 0.0896 4.77%, 0.4676 15.12%, 0.5688, 0.6553, 0.7274, 0.7862, 0.8336 31.04%, 0.8793, 0.9132 38.99%, 0.9421 43.77%, 0.9642 49.34%, 0.9796 55.71%, 0.9893 62.87%, 0.9952 71.62%, 0.9983 82.76%, 0.9996 99.47%)`,
              duration: 500,
            }}
            className={clsx(
              "text-base sm:text-lg lg:text-xl font-semibold tabular-nums transition-colors",
              isDragging ? "text-primary" : "text-foreground"
            )}
          />
          <span
            className={clsx(
              "text-sm sm:text-base lg:text-lg transition-colors",
              isDragging ? "text-primary" : "text-foreground"
            )}
          >
            %
          </span>
        </div>
      </div>

      {/* Enhanced responsive slider */}
      <div className="relative px-1 sm:px-0">
        {" "}
        {/* Added padding for mobile touch */}
        <RadixSlider.Root
          value={[volumePercentage]}
          onValueChange={handleVolumeChange}
          onValueCommit={() => setIsDragging(false)}
          onPointerDown={() => {
            setIsDragging(true);
            setShowValue(true);
          }}
          onPointerUp={() => {
            setIsDragging(false);
            setTimeout(() => setShowValue(false), 1500);
          }}
          max={100}
          step={1}
          className="relative flex h-8 sm:h-10 lg:h-12 w-full touch-none select-none items-center" // Enhanced touch targets
        >
          {/* Enhanced responsive track */}
          <RadixSlider.Track className="relative h-2 sm:h-3 lg:h-4 w-full grow rounded-full bg-muted overflow-hidden">
            <RadixSlider.Range
              className={clsx(
                "absolute h-full rounded-full transition-all duration-300",
                volume === 0
                  ? "bg-red-500/60"
                  : "bg-gradient-to-r from-primary/80 to-primary"
              )}
            />
          </RadixSlider.Track>

          {/* Enhanced responsive thumb */}
          <RadixSlider.Thumb
            className={clsx(
              "relative block h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 rounded-full bg-background border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              volume === 0
                ? "border-red-500 shadow-lg shadow-red-500/25"
                : "border-primary shadow-lg shadow-primary/25",
              isDragging
                ? "scale-125 shadow-2xl"
                : "hover:scale-110 active:scale-105" // Added active state
            )}
            aria-label="Volume control"
          >
            {/* Enhanced responsive tooltip */}
            {(isDragging || showValue) && (
              <div className="absolute -top-12 sm:-top-14 lg:-top-16 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-foreground text-background px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 flex gap-1 rounded-md text-xs sm:text-sm lg:text-base font-medium shadow-lg whitespace-nowrap">
                  <NumberFlow
                    value={volumePercentage}
                    willChange
                    isolate
                    opacityTiming={{
                      duration: 150,
                      easing: "ease-out",
                    }}
                    transformTiming={{
                      easing: "ease-out",
                      duration: 300,
                    }}
                    className="tabular-nums"
                  />
                  %
                </div>
                {/* Enhanced tooltip arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
              </div>
            )}
          </RadixSlider.Thumb>
        </RadixSlider.Root>
      </div>
    </div>
  );
};

export default VolumeSlider;
