"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Player({
  images,
  audio,
}: {
  images: File[];
  audio: File;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [durationPerImage, setDurationPerImage] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // 🎯 Calculate duration per image
  useEffect(() => {
    const audioEl = new Audio(URL.createObjectURL(audio));

    audioEl.onloadedmetadata = () => {
      const totalDuration = audioEl.duration;
      const perImage = totalDuration / images.length;

      setDurationPerImage(perImage);
      audioRef.current = audioEl;
    };
  }, [audio, images]);

  // 🎯 Sync slideshow with audio
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, durationPerImage * 1000);

    return () => clearInterval(interval);
  }, [isPlaying, durationPerImage, images.length]);

  // 🎯 Progress tracking
  useEffect(() => {
    if (!audioRef.current) return;

    const update = () => {
      const current = audioRef.current!.currentTime;
      const total = audioRef.current!.duration;

      setProgress((current / total) * 100);
    };

    const interval = setInterval(update, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mt-6 flex flex-col items-center space-y-6">

      {/* 🎬 SOCIAL PREVIEW CONTAINER */}
      <div className="w-full max-w-sm">

        {/* 9:16 aspect ratio */}
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
                ease: "easeInOut"
              }}
            />
          </AnimatePresence>

          {/* 🎛 Overlay Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/70 to-transparent">

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/30 rounded mb-3">
              <div
                className="h-1 bg-white rounded"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
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
      </div>

    </div>
  );
}