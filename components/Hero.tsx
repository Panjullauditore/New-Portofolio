"use client";

import { profile } from "@/data/profile";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const roles = t.hero.roles;

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(targetElement, { offset: -70, duration: 1.2 });
      } else {
        const navOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navOffset,
          behavior: "smooth",
        });
      }
      history.pushState(null, "", href);
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
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
          <div className="inline-block mb-6">
            <span className="badge-brutal bg-brutal-yellow text-brutal-black text-base px-4 py-2">
              {t.hero.greeting}
            </span>
          </div>

          {/* Name */}
          <h1 className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brutal-black dark:text-brutal-white leading-[0.95] mb-4">
            {profile.name.split(" ")[0]}
            <br />
            <span className="relative inline-block">
              {profile.name.split(" ").slice(1).join(" ")}
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-brutal-yellow -z-10" />
            </span>
          </h1>

          {/* Animated Role */}
          <div className="h-14 md:h-16 mb-8 overflow-hidden">
            <p
              key={`${roleIndex}-${t.hero.roles[roleIndex]}`}
              className="font-mono text-xl md:text-2xl lg:text-3xl text-brutal-black dark:text-brutal-white animate-slide-up"
            >
              {">"} {roles[roleIndex % roles.length]}
              <span className="inline-block w-3 h-6 bg-brutal-red ml-1 animate-pulse" />
            </p>
          </div>

          {/* Description */}
          <p className="font-body text-lg md:text-xl text-brutal-black/80 dark:text-brutal-white/70 max-w-2xl mb-10 leading-relaxed">
            {t.hero.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, "#projects")}
              className="btn-brutal text-lg px-8 py-4 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {t.hero.viewProjects}
            </a>
            <a
              href={`/${profile.cvFileName}`}
              download
              className="btn-brutal btn-brutal-secondary text-lg px-8 py-4"
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
            className="mt-16 inline-flex items-center gap-3 text-brutal-black/60 dark:text-brutal-white/40 hover:text-brutal-black dark:hover:text-brutal-white transition-colors cursor-pointer group"
          >
            <div className="w-8 h-12 border-3 border-brutal-black/40 dark:border-brutal-white/30 group-hover:border-brutal-black dark:group-hover:border-brutal-white rounded-full flex items-start justify-center p-2 transition-colors">
              <div className="w-1.5 h-3 bg-brutal-black/60 dark:bg-brutal-white/50 group-hover:bg-brutal-black dark:group-hover:bg-brutal-white rounded-full animate-bounce" />
            </div>
            <span className="font-mono text-sm font-semibold">{t.hero.scrollDown}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
