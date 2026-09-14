"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 px-2.5 border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-surface opacity-0" />
    );
  }

  const isEn = language === "en";

  return (
    <button
      onClick={toggleLanguage}
      className="h-10 px-2.5 flex items-center gap-1.5 border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-surface shadow-[var(--brutal-shadow-sm)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer group hover:bg-brutal-yellow dark:hover:bg-brutal-yellow dark:hover:text-brutal-black"
      aria-label={`Switch language. Current: ${isEn ? "English" : "Bahasa Indonesia"}`}
      title={isEn ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
    >
      {/* Globe / Translate Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-brutal-black dark:text-brutal-white group-hover:text-brutal-black transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>

      {/* Language Badge */}
      <span className="font-mono font-bold text-xs tracking-wider text-brutal-black dark:text-brutal-white group-hover:text-brutal-black transition-colors uppercase">
        {language}
      </span>

      {/* Mini indicator dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isEn ? "bg-brutal-blue" : "bg-brutal-red"
        }`}
      />
    </button>
  );
}
