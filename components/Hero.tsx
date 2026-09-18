"use client";

import { profile } from "@/data/profile";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { smoothScrollToSection } from "@/utils/scroll";

export default function Hero() {
  const { t } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const roles = t.hero.roles;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // When language toggles, reset text to start typing the new translated role cleanly
  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
  }, [roles]);

  // Typewriter typing and deleting animation effect
  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length] || "";
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing forward letter by letter
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 90);
      } else {
        // Pauses when word is fully typed
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Deleting backwards letter by letter
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 45);
      } else {
        // Word completely cleared, advance to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      smoothScrollToSection(targetElement, 1.1);
      history.pushState(null, "", href);
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-12"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-brutal-yellow border-3 border-brutal-black dark:border-brutal-white rotate-12 opacity-60 dark:opacity-30" />
        <div className="absolute bottom-32 left-10 w-24 h-24 bg-brutal-blue border-3 border-brutal-black dark:border-brutal-white -rotate-6 opacity-50 dark:opacity-25" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-brutal-red border-3 border-brutal-black dark:border-brutal-white rotate-45 opacity-40 dark:opacity-20" />
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-brutal-green border-3 border-brutal-black dark:border-brutal-white -rotate-12 opacity-40 dark:opacity-20" />
        <div className="absolute top-40 left-1/4 w-12 h-12 bg-brutal-pink border-3 border-brutal-black dark:border-brutal-white rotate-6 opacity-50 dark:opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div
          className={`transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Greeting Badge */}
          <div className="inline-block mb-3.5">
            <span className="badge-brutal bg-brutal-yellow text-brutal-black text-sm md:text-base px-3.5 py-1.5 shadow-[var(--brutal-shadow-sm)]">
              {t.hero.greeting}
            </span>
          </div>

          {/* Name */}
          <h1 className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brutal-black dark:text-brutal-white leading-[0.95] mb-3">
            {profile.name.split(" ")[0]}
            <br />
            <span className="relative inline-block mt-1">
              {profile.name.split(" ").slice(1).join(" ")}
              <div className="absolute -bottom-1.5 left-0 w-full h-3 bg-brutal-yellow -z-10" />
            </span>
          </h1>

          {/* Typewriter Animated Role */}
          <div className="min-h-[2.5rem] md:min-h-[3rem] flex items-center mb-4">
            <p className="font-mono text-xl sm:text-2xl md:text-3xl text-brutal-black dark:text-brutal-white font-bold flex items-center tracking-tight">
              <span className="text-brutal-black/70 dark:text-brutal-white/70 mr-2">{">"}</span>
              <span>{displayText}</span>
              <span className="inline-block w-2.5 sm:w-3 h-6 md:h-8 bg-brutal-red ml-1.5 align-middle animate-pulse" />
            </p>
          </div>

          {/* Description */}
          <p className="font-body text-base sm:text-lg md:text-xl text-brutal-black/80 dark:text-brutal-white/70 max-w-2xl mb-7 leading-relaxed">
            {t.hero.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, "#projects")}
              className="btn-brutal text-base sm:text-lg px-7 py-3.5 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {t.hero.viewProjects}
            </a>
            <a
              href={`/${profile.cvFileName}`}
              download
              className="btn-brutal btn-brutal-secondary text-base sm:text-lg px-7 py-3.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t.hero.downloadCv}
            </a>
          </div>

          {/* Scroll indicator */}
          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, "#about")}
            className="mt-10 md:mt-12 inline-flex items-center gap-3 text-brutal-black/60 dark:text-brutal-white/40 hover:text-brutal-black dark:hover:text-brutal-white transition-colors cursor-pointer group"
          >
            <div className="w-7 h-11 border-3 border-brutal-black/40 dark:border-brutal-white/30 group-hover:border-brutal-black dark:group-hover:border-brutal-white rounded-full flex items-start justify-center p-1.5 transition-colors">
              <div className="w-1.5 h-2.5 bg-brutal-black/60 dark:bg-brutal-white/50 group-hover:bg-brutal-black dark:group-hover:bg-brutal-white rounded-full animate-bounce" />
            </div>
            <span className="font-mono text-sm font-semibold">{t.hero.scrollDown}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
