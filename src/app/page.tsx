"use client";

import { useState } from "react";
import Form from "../../components/Form";
import Results from "../../components/Results";
import { ResultData } from "../../types";

export default function Home() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (data: any) => {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await res.json();
    console.log("API RESPONSE:", json);

    setResult(json);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-4 py-6">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          AI Real Estate Content Generator
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Generate listings, social posts, and emails in seconds
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Form Card */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
          <Form onSubmit={handleGenerate} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-6">
            
            <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            
            <p className="text-gray-600 text-sm">
              Generating high-quality content...
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 animate-fade-in">
            <Results data={result} />
          </div>
        )}

      </div>
    </main>
  );
}