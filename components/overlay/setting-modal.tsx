// filepath: d:\Documents\Fikar\Project\portfoliov3\components\overlay\setting-modal.tsx
"use client";
import { Settings } from "lucide-react";
import { useAudioContext } from "@/components/ui/audio-context";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import AudioControl from "@/components/ui/audio-control";
import VolumeSlider from "@/components/ui/volume-slider";
import Playlist from "@/components/ui/playlist";

// Separate the modal content into its own component
const AudioSettingsContent = () => {
  return (
    <ModalBody>
      <ModalContent>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
          <div className="p-2 rounded-lg">
            <Settings className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
              Settings
            </h2>
          </div>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto">
          {/* Current Track Display */}
          <div className="space-y-3">
            <div className="bg-muted/30 rounded-xl p-4">
              <Playlist />
            </div>
          </div>

          {/* Audio Controls */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wide">
              Playback Controls
            </h3>
            <div className="bg-muted/30 rounded-xl p-4">
              <AudioControl />
            </div>
          </div>

          {/* Volume Control */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wide">
              Volume Control
            </h3>
            <div className="bg-muted/30 rounded-xl p-4">
              <VolumeSlider />
            </div>
          </div>
        </div>
      </ModalContent>
    </ModalBody>
  );
};

// Main component that wraps everything
export const AudioSettingsModal = () => {
  const { isPlaying } = useAudioContext();

  return (
    <Modal>
      <ModalTrigger className="fixed top-6 lg:right-12 right-6 z-51 p-3 bg-foreground/5 backdrop-blur-md rounded-full hover:bg-accent transition-all duration-500 shadow-lg hover:shadow-xl group cursor-pointer">
        <div className="relative">
          <Settings className="h-5 w-5 group-hover:animate-spin transition-transform duration-500" />
          {isPlaying && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
      </ModalTrigger>
      <AudioSettingsContent />
    </Modal>
  );
};
