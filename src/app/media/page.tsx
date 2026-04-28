"use client";

import MediaUploader from "../../../components/media/MediaUploader";


// import MediaUploader from "@/components/media/MediaUploader";

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      <div className="max-w-lg mx-auto space-y-6">

        <h1 className="text-xl font-semibold text-gray-800 text-center">
          🎬 Create Social Media Video
        </h1>

        <p className="text-sm text-gray-500 text-center">
          Upload property photos + music to generate Instagram-ready video
        </p>

        <MediaUploader />

      </div>

    </div>
  );
}