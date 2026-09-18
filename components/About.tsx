"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/data/profile";
import SpotifyWidget from "./SpotifyWidget";

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const factsList = [
    { label: t.about.facts.location.label, value: t.about.facts.location.value, emoji: "📍" },
    { label: t.about.facts.education.label, value: t.about.facts.education.value, emoji: "🎓" },
    { label: t.about.facts.status.label, value: t.about.facts.status.value, emoji: "💼" },
    { label: t.about.facts.experience.label, value: t.about.facts.experience.value, emoji: "⚡" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-8">
            <span className="badge-brutal bg-brutal-blue text-white text-xs font-mono font-bold px-2 py-0.5">
              01
            </span>
            <h2 className="section-title text-brutal-black dark:text-brutal-white">
              {t.about.badge.replace(/^01\s*/, "")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* Avatar */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start items-start self-start">
              <div className="relative inline-block w-fit">
                <div className="w-64 h-72 md:w-72 md:h-80 border-4 border-brutal-black dark:border-brutal-white bg-brutal-yellow shadow-[var(--brutal-shadow-lg)] overflow-hidden relative group">
                  {profile.avatar && !imgError ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-brutal-blue/20 flex items-center justify-center">
                      <span className="text-8xl">👨‍💻</span>
                    </div>
                  )}
                </div>
                {/* Decorative sticker - tightly anchored to avatar corner */}
                <div className="absolute -bottom-3 -right-3 z-10 bg-brutal-red border-3 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-sm)] px-3.5 py-1.5 rotate-3 whitespace-nowrap">
                  <span className="font-heading font-bold text-white text-sm tracking-wide">
                    {t.about.facts.status.value}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-8">
              <div className="card-brutal-static p-6 md:p-8 mb-6 space-y-4">
                <p className="font-body text-lg md:text-xl leading-relaxed text-brutal-black/90 dark:text-brutal-white/85">
                  {t.about.storyP1}
                </p>
                <p className="font-body text-base md:text-lg leading-relaxed text-brutal-black/80 dark:text-brutal-white/75">
                  {t.about.storyP2}
                </p>
                <p className="font-body text-base md:text-lg leading-relaxed text-brutal-black/80 dark:text-brutal-white/75">
                  {t.about.storyP3}
                </p>
              </div>

              {/* Facts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {factsList.map((fact, index) => {
                  const factColorHexes = ["#FFE925", "#4D96FF", "#6BCB77", "#FF6B9D"];
                  return (
                    <div
                      key={fact.label}
                      className="border-3 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-sm)] p-4 transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px]"
                      style={{
                        backgroundColor: factColorHexes[index % factColorHexes.length],
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <span className="text-2xl mb-2 block">{fact.emoji}</span>
                      <p className="font-mono text-xs font-bold text-brutal-black/75 uppercase tracking-wider">
                        {fact.label}
                      </p>
                      <p className="font-heading font-extrabold text-sm md:text-base text-brutal-black">
                        {fact.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Spotify Widget inside About Me */}
          <SpotifyWidget />
        </div>
      </div>
    </section>
  );
}
