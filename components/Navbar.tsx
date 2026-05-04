"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition ${
      pathname === path
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
    }`;

  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold text-gray-900 tracking-tight"
          >
            🏡 AI Real Estate
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/" className={linkClass("/")}>
              Text Generator
            </Link>

            <Link href="/media" className={linkClass("/media")}>
              Media Generator
            </Link>
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border border-gray-200 text-gray-700"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* 🔥 Animated Mobile Menu */}
      <AnimatePresence>

        {isOpen && (
          <>
            {/* 🌫 BACKDROP BLUR */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* 📱 SLIDE MENU */}
            <motion.div
              className="fixed top-64 left-0 right-0 z-50 px-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 space-y-2">

                <Link
                  href="/"
                  className={linkClass("/")}
                  onClick={() => setIsOpen(false)}
                >
                  📝 Text Generator
                </Link>

                <Link
                  href="/media"
                  className={linkClass("/media")}
                  onClick={() => setIsOpen(false)}
                >
                  🎬 Media Generator
                </Link>

              </div>
            </motion.div>
          </>
        )}

      </AnimatePresence>
    </>
  );
}