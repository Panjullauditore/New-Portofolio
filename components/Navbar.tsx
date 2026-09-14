"use client";

import { useState, useEffect } from "react";
import { profile } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t.navbar.about, href: "#about" },
    { label: t.navbar.skills, href: "#skills" },
    { label: t.navbar.projects, href: "#projects" },
    { label: t.navbar.experience, href: "#experience" },
    { label: t.navbar.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-brutal-cream dark:bg-brutal-dark border-b-3 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-sm)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-heading font-bold text-xl md:text-2xl text-brutal-black dark:text-brutal-white hover:text-brutal-red transition-colors"
          >
            {"{"} Fahrezi {"}"}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 font-heading font-semibold text-sm text-brutal-black dark:text-brutal-white hover:bg-brutal-yellow hover:text-brutal-black border-2 border-transparent hover:border-brutal-black dark:hover:border-brutal-white transition-all"
              >
                {link.label}
              </a>
            ))}

            {/* Language Switcher */}
            <div className="ml-2">
              <LanguageToggle />
            </div>

            {/* Theme Toggle */}
            <div className="ml-1">
              <ThemeToggle />
            </div>

            <a
              href={`/${profile.cvFileName}`}
              download
              className="btn-brutal ml-3 text-sm py-2 px-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t.navbar.downloadCv}
            </a>
          </div>

          {/* Mobile: Language + Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center border-3 border-brutal-black dark:border-brutal-white bg-brutal-yellow shadow-[var(--brutal-shadow-sm)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`w-5 h-0.5 bg-brutal-black transition-all duration-200 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-brutal-black transition-all duration-200 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-brutal-black transition-all duration-200 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[var(--brutal-shadow-lg)] p-4 mb-4 animate-slide-down">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 font-heading font-semibold text-brutal-black dark:text-brutal-white hover:bg-brutal-yellow hover:text-brutal-black border-b-2 border-brutal-black dark:border-brutal-white/30 last:border-b-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`/${profile.cvFileName}`}
              download
              className="btn-brutal w-full justify-center mt-3 text-sm"
            >
              {t.navbar.downloadCv}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
