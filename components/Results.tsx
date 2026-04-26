"use client";

import { useState } from "react";
import { ResultData } from "../types";


export default function Results({ data }: { data: ResultData }) {
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

  const gradientButton = (active: boolean) =>
    `flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg text-white transition ${
      active
        ? "bg-green-500"
        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
    }`;

  /* ---------- PREPARE COPY TEXTS ---------- */

  const listingText = `
${data.listing.headline}

${data.listing.description}

Highlights:
${data.listing.highlights.join("\n")}

Features:
${data.listing.features.join("\n")}
  `;

  const emailText = `
Subject: ${data.email.subject}

${data.email.body}
  `;

  return (
    <div className="mt-8 sm:mt-10 space-y-8 max-w-4xl mx-auto">

      {/* 🏠 LISTING */}
      <div className={cardStyle}>
        <div className={sectionHeader}>
          <h2 className={titleStyle}>🏠 Listing</h2>

          <button
            className={gradientButton(copiedIndex === "listing")}
            onClick={() => copyToClipboard(listingText, "listing")}
          >
            {copiedIndex === "listing" ? "✓ Copied" : "Copy"}
          </button>
        </div>

        <div className="bg-gray-50 text-gray-900 rounded-xl p-4 space-y-4 border border-gray-100">

          <h3 className="text-lg font-bold">
            {data.listing.headline}
          </h3>

          <p className="text-sm sm:text-base leading-relaxed">
            {data.listing.description}
          </p>

          <div>
            <h4 className="font-semibold mb-1">Highlights</h4>
            <ul className="list-disc ml-5 text-sm sm:text-base space-y-1">
              {data.listing.highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">Features</h4>
            <ul className="list-disc ml-5 text-sm sm:text-base space-y-1">
              {data.listing.features.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* 📱 SOCIAL POSTS */}
      <div className={cardStyle}>
        <div className={sectionHeader}>
          <h2 className={titleStyle}>📱 Social Posts</h2>
        </div>

        <div className="space-y-5 text-gray-900">

          {[
            { label: "Instagram", text: data.social.instagram },
            { label: "Facebook", text: data.social.facebook },
            { label: "LinkedIn", text: data.social.linkedin },
          ].map((item, i) => {
            const id = `social-${i}`;

            return (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3"
              >
                <h4 className="font-semibold">{item.label}</h4>

                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {item.text}
                </p>

                <div className="flex justify-end">
                  <button
                    className={gradientButton(copiedIndex === id)}
                    onClick={() => copyToClipboard(item.text, id)}
                  >
                    {copiedIndex === id
                      ? "✓ Copied"
                      : `Copy ${item.label}`}
                  </button>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* ✉️ EMAIL */}
      <div className={cardStyle}>
        <div className={sectionHeader}>
          <h2 className={titleStyle}>✉️ Email</h2>

          <button
            className={gradientButton(copiedIndex === "email")}
            onClick={() => copyToClipboard(emailText, "email")}
          >
            {copiedIndex === "email" ? "✓ Copied" : "Copy"}
          </button>
        </div>

        <div className="bg-gray-50 text-gray-900 rounded-xl p-4 space-y-3 border border-gray-100">

          <h3 className="font-semibold">
            {data.email.subject}
          </h3>

          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {data.email.body}
          </p>

        </div>
      </div>

    </div>
  );
}