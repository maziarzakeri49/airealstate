"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Player({
  images,
  audio,
  duration,
}: {
  images: File[];
  audio: File;
  duration: number; // seconds (30, 60, etc.)
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [durationPerImage, setDurationPerImage] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  /* -------------------------------
     🎯 INIT AUDIO + CALCULATE TIMING
  --------------------------------*/
  useEffect(() => {
    const audioEl = new Audio(URL.createObjectURL(audio));

    audioEl.onloadedmetadata = () => {
      // ✅ Use USER-SELECTED duration
      const perImage = duration / images.length;
      setDurationPerImage(perImage);

      audioRef.current = audioEl;
    };

    return () => {
      audioEl.pause();
      URL.revokeObjectURL(audioEl.src);
    };
  }, [audio, images, duration]);

  /* -------------------------------
     🎯 SLIDESHOW SYNC
  --------------------------------*/
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 >= images.length) return prev; // stop at last image
        return prev + 1;
      });
    }, durationPerImage * 1000);

    return () => clearInterval(interval);
  }, [isPlaying, durationPerImage, images.length]);

  /* -------------------------------
     🎯 PROGRESS (based on selected duration)
  --------------------------------*/
  useEffect(() => {
    if (!isPlaying) return;

    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(percent);
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  /* -------------------------------
     🎯 PLAY / PAUSE
  --------------------------------*/
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      setIsPlaying(false);
      return;
    }

    // ▶️ Start from beginning
    audioRef.current.currentTime = 0;
    audioRef.current.play();

    setCurrentIndex(0);
    setProgress(0);
    setIsPlaying(true);

    // ⛔ STOP at selected duration (Option A)
    stopTimeoutRef.current = setTimeout(() => {
      audioRef.current?.pause();
      setIsPlaying(false);
      setProgress(100);
    }, duration * 1000);
  };

  return (
    <div className="mt-6 flex flex-col items-center space-y-6">

      {/* 🎬 SOCIAL PREVIEW */}
      <div className="w-full max-w-sm">

        <div className="relative w-full aspect-9/16 bg-black rounded-2xl overflow-hidden shadow-xl">

          {/* Slideshow */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={URL.createObjectURL(images[currentIndex])}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          </AnimatePresence>

          {/* 🎛 Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-lineer-to-t from-black/70 to-transparent">

            {/* Progress */}
            <div className="w-full h-1 bg-white/30 rounded mb-3">
              <div
                className="h-1 bg-white rounded"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-white">

              <button
                onClick={togglePlay}
                className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg text-sm"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <span className="text-xs opacity-80">
                {Math.round(progress)}%
              </span>

            </div>
          </div>
        </div>

        {/* ⏱ Info */}
        <div className="text-xs text-gray-500 mt-2 text-center">
          {images.length} images • {(duration / images.length).toFixed(1)}s per image
        </div>

      </div>
    </div>
  );
}