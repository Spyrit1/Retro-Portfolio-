import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, MoveHorizontal } from 'lucide-react';
import { ambientAudio } from '../audio/ambience.ts';

interface FilmScrubberHudProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeekRequest: (time: number) => void;
}

export const FilmScrubberHud: React.FC<FilmScrubberHudProps> = ({
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeekRequest,
}) => {
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !duration) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeekRequest(ratio * duration);
  };

  const handleAudioToggle = () => {
    const active = ambientAudio.toggle();
    setIsAudioActive(active);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <aside
      aria-label="Reel Scrubber Controls"
      className="fixed bottom-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-col gap-2.5 bg-gradient-to-t from-white/90 via-white/50 to-transparent backdrop-blur-xs select-none"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Top row of HUD: Interaction Prompt & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-black">
        {/* Left: Scrubbing Instruction */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/5 rounded-none border border-black/10">
            <MoveHorizontal size={13} className="text-black/80 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-medium tracking-tight">
              Move cursor horizontally to scrub reel
            </span>
          </div>
          <span className="hidden sm:inline text-black/40 text-[11px]">|</span>
          <span className="hidden md:inline text-black/60 text-[11px]">
            Interactive Showcase · 0.8x Sensitivity
          </span>
        </div>

        {/* Right: Controls & Timecode */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto">
          {/* Timecode display */}
          <div className="flex items-center gap-1 font-mono text-[11px] sm:text-xs tabular-nums text-black/80">
            <span className="font-semibold text-black">
              {formatTimecode(currentTime)}
            </span>
            <span className="text-black/40">/</span>
            <span>{formatTimecode(duration || 4.04)}</span>
          </div>

          {/* Reel Play / Scrub Mode Toggle */}
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-tight bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause reel (switch to cursor scrub)' : 'Play reel'}
          >
            {isPlaying ? (
              <>
                <Pause size={11} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={11} />
                <span>Play Reel</span>
              </>
            )}
          </button>

          {/* Sound Ambience Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1.5 px-2 py-1 text-[11px] border transition-colors cursor-pointer ${
              isAudioActive
                ? 'bg-black text-white border-black'
                : 'border-black/20 text-black hover:bg-black/5'
            }`}
            title="Toggle Ambient Audio Soundscape"
          >
            {isAudioActive ? <Volume2 size={12} /> : <VolumeX size={12} />}
            <span className="hidden sm:inline">
              {isAudioActive ? 'Sound On' : 'Sound Off'}
            </span>
          </button>
        </div>
      </div>

      {/* Scrub timeline bar */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="group relative w-full h-2 bg-black/15 hover:h-3 transition-all cursor-ew-resize flex items-center"
      >
        <div
          className="h-full bg-black transition-[width] duration-75"
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className="absolute h-3.5 w-1 bg-black shadow-xs pointer-events-none -translate-x-1/2 transition-all group-hover:h-5 group-hover:w-1.5"
          style={{ left: `${progressPercent}%` }}
        />
      </div>
    </aside>
  );
};
