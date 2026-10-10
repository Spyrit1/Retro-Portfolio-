import React, { useEffect, useRef, useState, useCallback } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';
const SENSITIVITY = 0.8;

interface BackgroundVideoProps {
  isPlaying: boolean;
  onTimeUpdate?: (time: number, duration: number) => void;
  seekTimeRequest?: number | null;
  onSeekHandled?: () => void;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  isPlaying,
  onTimeUpdate,
  seekTimeRequest,
  onSeekHandled,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentTimeState, setCurrentTimeState] = useState<number>(0);

  // Seek queued dispatcher
  const dispatchSeek = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const clamped = Math.max(0, Math.min(video.duration, time));
    targetTimeRef.current = clamped;

    if (!isSeekingRef.current) {
      isSeekingRef.current = true;
      try {
        video.currentTime = clamped;
      } catch {
        isSeekingRef.current = false;
      }
    }
  }, []);

  // onSeeked handler - queues next seek if targetTime moved during seek
  const handleSeeked = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    isSeekingRef.current = false;
    const current = video.currentTime;
    setCurrentTimeState(current);
    if (onTimeUpdate && video.duration) {
      onTimeUpdate(current, video.duration);
    }

    // Check if targetTime moved while seeking was taking place
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      isSeekingRef.current = true;
      try {
        video.currentTime = targetTimeRef.current;
      } catch {
        isSeekingRef.current = false;
      }
    }
  }, [onTimeUpdate]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration || 4.04;
    setVideoDuration(dur);
    if (onTimeUpdate) {
      onTimeUpdate(video.currentTime, dur);
    }
    // Seek to first fraction to ensure frame renders
    try {
      video.currentTime = 0.01;
    } catch {
      // ignore
    }
  };

  const handleTimeUpdateNative = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTimeState(video.currentTime);
    if (onTimeUpdate && video.duration) {
      onTimeUpdate(video.currentTime, video.duration);
    }
  };

  // Direct programmatic seek from HUD scrubber
  useEffect(() => {
    if (seekTimeRequest !== null && seekTimeRequest !== undefined) {
      dispatchSeek(seekTimeRequest);
      if (onSeekHandled) {
        onSeekHandled();
      }
    }
  }, [seekTimeRequest, dispatchSeek, onSeekHandled]);

  // Handle play/pause toggles
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // Window mousemove scrub listener as specified
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If user enabled continuous video play, pause it or allow scrub override
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const currentX = e.clientX;
      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const video = videoRef.current;
      if (!video || !video.duration) return;

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTarget = targetTimeRef.current + timeOffset;
      dispatchSeek(newTarget);
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Touch support for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touchX = e.touches[0].clientX;

      if (prevXRef.current === null) {
        prevXRef.current = touchX;
        return;
      }

      const delta = touchX - prevXRef.current;
      prevXRef.current = touchX;

      const video = videoRef.current;
      if (!video || !video.duration) return;

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTarget = targetTimeRef.current + timeOffset;
      dispatchSeek(newTarget);
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dispatchSeek]);

  return (
    <>
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        onTimeUpdate={handleTimeUpdateNative}
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            if (isPlaying) {
              videoRef.current.play().catch(() => {});
            }
          }
        }}
        className="fixed inset-0 z-0 object-cover w-full h-full pointer-events-none select-none"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: '70% center',
        }}
      />

      {/* Subtle architectural noise/vignette overlay to preserve black typographic legibility without washing out the video */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(240,240,240,0.18) 100%)',
        }}
      />
    </>
  );
};
