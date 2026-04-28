"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      pathname === path
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
    }`;

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold text-gray-900 tracking-tight"
        >
          🏡 AI Real Estate
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-2">

          <Link href="/" className={linkClass("/")}>
            Text Generator
          </Link>

          <Link href="/media" className={linkClass("/media")}>
            Media Generator
          </Link>

        </nav>

      </div>
    </header>
  );
}