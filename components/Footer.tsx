"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brutal-black dark:bg-brutal-dark border-t-4 border-brutal-yellow py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <BrandLogo size={32} variant="badge" />
            <span className="font-heading font-bold text-brutal-white text-lg">
              {"{"} Fahrezi {"}"}
            </span>
            <span className="font-mono text-xs text-brutal-white/40">
              © {currentYear}
            </span>
          </div>

          {/* Center */}
          <p className="font-mono text-xs text-brutal-white/50 text-center">
            {t.footer.builtWith}{" "}
            <span className="text-brutal-red">♥</span> &{" "}
            <span className="text-brutal-yellow">Next.js</span>
          </p>

          {/* Right - Download CV */}
          <a
            href={`/${profile.cvFileName}`}
            download
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 font-heading font-bold text-sm border-2 border-brutal-yellow text-brutal-yellow hover:bg-brutal-yellow hover:text-brutal-black transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t.footer.downloadCv}
          </a>
        </div>
      </div>
    </footer>
  );
}
