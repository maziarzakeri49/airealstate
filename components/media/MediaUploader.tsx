"use client";

import { useState } from "react";

import Player from "./Player";

export default function MediaUploader() {
  const [images, setImages] = useState<File[]>([]);
  const [audio, setAudio] = useState<File | null>(null);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

  const handleAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setAudio(e.target.files[0]);
  };

  return (
  <div className="space-y-6 max-w-md mx-auto">

    {/* Upload Card */}
    <div className="bg-white p-5 rounded-2xl shadow border border-gray-100 space-y-4">

      <h2 className="font-semibold text-gray-800">
        Upload Media
      </h2>

      {/* Images */}
      <label className="block">
        <span className="text-sm text-gray-600">Images</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImages}
          className="mt-1 w-full text-sm bg-gray-100 border-gray-400 cursor-pointer"
        />
      </label>

      {/* Audio */}
      <label className="block">
        <span className="text-sm text-gray-600">MP3 Audio</span>
        <input
          type="file"
          accept="audio/mp3"
          onChange={handleAudio}
          className="mt-1 w-full text-sm bg-gray-100 border-gray-400 cursor-pointer"
        />
      </label>

      {/* Status */}
      <div className="text-xs text-gray-500">
        {images.length} images selected • {audio ? "Audio ready" : "No audio"}
      </div>

    </div>

    {/* Player */}
    {images.length > 0 && audio && (
      <Player images={images} audio={audio} />
    )}
  </div>
);
}