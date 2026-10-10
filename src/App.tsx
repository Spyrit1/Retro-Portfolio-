/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroOverlay } from './components/HeroOverlay.tsx';
import { FilmScrubberHud } from './components/FilmScrubberHud.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(4.04);
  const [seekTimeRequest, setSeekTimeRequest] = useState<number | null>(null);

  // Modal Dialog States
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const handleTimeUpdate = useCallback((time: number, dur: number) => {
    setCurrentTime(time);
    if (dur > 0) setDuration(dur);
  }, []);

  const handleSeekRequest = (targetTime: number) => {
    setSeekTimeRequest(targetTime);
  };

  const handleSeekHandled = () => {
    setSeekTimeRequest(null);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Keyboard controls (Space to Play/Pause, Arrows to step scrub, Escape to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === 'Escape') {
        setIsAboutOpen(false);
        setIsContactOpen(false);
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIsPlaying(false);
        setSeekTimeRequest(Math.min(duration, currentTime + 0.25));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        setSeekTimeRequest(Math.max(0, currentTime - 0.25));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, duration]);

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden bg-[#f4f4f4] text-black"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Background Video with Mouse Scrubbing Control (Kept exactly same) */}
      <BackgroundVideo
        isPlaying={isPlaying}
        onTimeUpdate={handleTimeUpdate}
        seekTimeRequest={seekTimeRequest}
        onSeekHandled={handleSeekHandled}
      />

      {/* Fixed Navbar (z-index: 10) */}
      <Navbar
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Hero Typography & Creative Developer Layout */}
      <HeroOverlay
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Floating Film Scrubber HUD at Bottom */}
      <FilmScrubberHud
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onSeekRequest={handleSeekRequest}
      />

      {/* Modals */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
