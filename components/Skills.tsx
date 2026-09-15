"use client";

import { skillCategories } from "@/data/skills";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-28 bg-brutal-cream/70 dark:bg-brutal-dark-surface border-y-3 border-brutal-black dark:border-brutal-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-12">
            <span className="badge-brutal bg-brutal-green text-brutal-black text-xs font-mono font-bold px-2 py-0.5">
              02
            </span>
            <h2 className="section-title text-brutal-black dark:text-brutal-white after:!bg-brutal-black dark:after:!bg-brutal-white">
              {t.skills.badge.replace(/^02\s*/, "")}
            </h2>
          </div>

          {/* Marquee */}
          <div className="overflow-hidden mb-12 border-y-3 border-brutal-black/20 dark:border-brutal-white/20 py-4">
            <div className="marquee-track">
              {[...skillCategories, ...skillCategories].flatMap((cat, copyIndex) =>
                cat.skills.map((skill, i) => (
                  <span
                    key={`marquee-${copyIndex}-${cat.category}-${skill.name}-${i}`}
                    className="mx-4 font-mono text-lg md:text-xl font-bold text-brutal-black/75 dark:text-brutal-white/60 whitespace-nowrap"
                  >
                    {skill.name} <span className="text-brutal-yellow mx-2">✦</span>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Skill Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, catIndex) => {
              // Localize category title
              let categoryTitle = category.category;
              if (category.category.toLowerCase().includes("frontend")) {
                categoryTitle = t.skills.categories.frontend;
              } else if (category.category.toLowerCase().includes("backend")) {
                categoryTitle = t.skills.categories.backend;
              } else if (category.category.toLowerCase().includes("tools")) {
                categoryTitle = t.skills.categories.tools;
              } else if (category.category.toLowerCase().includes("soft")) {
                categoryTitle = t.skills.categories.softSkills;
              }

              return (
                <div
                  key={category.category}
                  className="card-brutal-static p-6 border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[var(--brutal-shadow)] transition-all duration-300"
                  style={{
                    animationDelay: `${catIndex * 150}ms`,
                  }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-4 h-4 border-2 border-brutal-black dark:border-brutal-white"
                      style={{ backgroundColor: category.bgColor }}
                    />
                    <h3 className="font-heading font-bold text-xl text-brutal-black dark:text-brutal-white">
                      {categoryTitle}
                    </h3>
                    <span className="font-mono text-xs text-brutal-black/60 dark:text-brutal-white/50 ml-auto">
                      {category.skills.length} {t.skills.skillsCountSuffix}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => {
                      const localizedSkillName =
                        t.skills.softSkillsList[skill.name] || skill.name;

                      const badgeBg = skill.color || category.bgColor;
                      const badgeText =
                        skill.textColor ||
                        (category.category === "Frontend" || category.category === "Soft Skills"
                          ? "#1A1A2E"
                          : "#FFFFFF");

                      return (
                        <span
                          key={skill.name}
                          className="badge-brutal font-mono text-xs md:text-sm font-bold border-2 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-sm)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all px-3 py-1 uppercase tracking-wider"
                          style={{
                            backgroundColor: badgeBg,
                            color: badgeText,
                          }}
                        >
                          {localizedSkillName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
