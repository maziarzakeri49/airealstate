"use client";

import { useState } from "react";

export default function Results({ data }: any) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const cardStyle =
    "bg-white border border-gray-100 rounded-2xl shadow-md p-5 sm:p-6 space-y-4";

  const sectionHeader =
    "flex items-center justify-between mb-2";

  const titleStyle =
    "text-lg sm:text-xl font-semibold text-gray-800";

  const copyButton = (active: boolean) =>
    `flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition ${
      active
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
    }`;

  const gradientButton = (active: boolean) =>
    `flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg text-white transition ${
      active
        ? "bg-green-500"
        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
    }`;

  return (
    <div className="mt-8 sm:mt-10 space-y-8 max-w-4xl mx-auto">

      {/* Listing */}
      <div className={cardStyle}>
        <div className={sectionHeader}>
          <h2 className={titleStyle}>🏠 Listing</h2>

          <button
            className={gradientButton(copiedIndex === "listing")}
            onClick={() => copyToClipboard(data.listing, "listing")}
          >
            {copiedIndex === "listing" ? "✓ Copied" : "Copy"}
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-sm sm:text-base leading-relaxed whitespace-pre-line border border-gray-100">
          {data.listing}
        </div>
      </div>

      {/* Social Posts */}
      <div className={cardStyle}>
        <div className={sectionHeader}>
          <h2 className={titleStyle}>📱 Social Posts</h2>
        </div>

        <div className="space-y-5">
          {data.social?.map((post: string, i: number) => {
            const id = `post-${i}`;

            return (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3"
              >
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {post}
                </p>

                <div className="flex justify-end">
                  <button
                    className={gradientButton(copiedIndex === id)}
                    onClick={() => copyToClipboard(post, id)}
                  >
                    {copiedIndex === id
                      ? "✓ Copied"
                      : `Copy Post ${i + 1}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Email */}
      <div className={cardStyle}>
        <div className={sectionHeader}>
          <h2 className={titleStyle}>✉️ Email</h2>

          <button
            className={gradientButton(copiedIndex === "email")}
            onClick={() => copyToClipboard(data.email, "email")}
          >
            {copiedIndex === "email" ? "✓ Copied" : "Copy"}
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-sm sm:text-base leading-relaxed whitespace-pre-line border border-gray-100">
          {data.email}
        </div>
      </div>

    </div>
  );
}