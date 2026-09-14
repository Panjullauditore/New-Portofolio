"use client";

import { experiences } from "@/data/experience";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const typeIcons: Record<string, string> = {
  work: "💼",
  education: "🎓",
  organization: "🏛️",
};

export default function Experience() {
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
    <section id="experience" ref={sectionRef} className="py-20 md:py-28 bg-brutal-cream/60 dark:bg-brutal-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-12">
            <span className="badge-brutal bg-brutal-orange text-white text-xs font-mono font-bold px-2 py-0.5">
              04
            </span>
            <h2 className="section-title text-brutal-black dark:text-brutal-white">
              {t.experience.badge.replace(/^04\s*/, "")}
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-brutal-black dark:bg-brutal-white" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const transItem = t.experience.items[index];
                const role = transItem?.role || exp.role;
                const duration = transItem?.period || exp.duration;
                const achievements = transItem?.achievements || exp.description;

                return (
                  <div
                    key={exp.id}
                    className="relative pl-16 md:pl-20 group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Timeline Dot */}
                    <div
                      className="absolute left-4 md:left-6 w-5 h-5 border-3 border-brutal-black dark:border-brutal-white z-10 group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: exp.color }}
                    />

                    {/* Card */}
                    <div className="card-brutal p-5 md:p-6 border-l-[6px]" style={{ borderLeftColor: exp.color }}>
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{typeIcons[exp.type]}</span>
                            <span
                              className="badge-brutal text-xs text-brutal-black font-bold uppercase"
                              style={{ backgroundColor: exp.color }}
                            >
                              {t.experience.typeLabels[exp.type as keyof typeof t.experience.typeLabels] || exp.type}
                            </span>
                          </div>
                          <h3 className="font-heading font-bold text-lg md:text-xl text-brutal-black dark:text-brutal-white">
                            {role}
                          </h3>
                          <p className="font-body text-brutal-black/70 dark:text-brutal-white/60 font-semibold">
                            {transItem?.company || exp.institution}
                          </p>
                        </div>
                        <span className="font-mono text-sm text-brutal-black/60 dark:text-brutal-white/50 bg-brutal-cream dark:bg-brutal-dark-surface border-2 border-brutal-black dark:border-brutal-white px-3 py-1 whitespace-nowrap">
                          {duration}
                        </span>
                      </div>

                      {/* Description */}
                      <ul className="space-y-1.5">
                        {achievements.map((desc, i) => (
                          <li
                            key={i}
                            className="font-body text-sm text-brutal-black/80 dark:text-brutal-white/70 flex items-start gap-2"
                          >
                            <span className="text-brutal-black dark:text-brutal-white font-bold mt-0.5">▸</span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
