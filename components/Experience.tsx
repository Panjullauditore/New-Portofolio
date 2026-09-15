"use client";

import { experiences, Experience as ExperienceType } from "@/data/experience";
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
  const [selectedProof, setSelectedProof] = useState<ExperienceType | null>(null);

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

  // Handle escape key to close proof preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProof(null);
    };
    if (selectedProof) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProof]);

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

          {/* Coming Soon State OR Timeline */}
          {experiences.length === 0 ? (
            <div className="card-brutal p-8 md:p-14 text-center bg-brutal-white dark:bg-brutal-dark-card border-4 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-lg)] relative overflow-hidden">
              {/* Background Accent Watermark */}
              <div className="absolute -right-8 -bottom-8 opacity-5 dark:opacity-10 pointer-events-none select-none">
                <span className="text-9xl font-heading font-black">EXP</span>
              </div>

              <div className="max-w-2xl mx-auto flex flex-col items-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-brutal-orange text-white px-4 py-1.5 border-3 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-sm)] font-mono text-xs md:text-sm font-bold uppercase mb-6 rotate-[1deg]">
                  <span>⏳</span>
                  <span>{t.experience.comingSoon?.badge || "COMING SOON"}</span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-2xl md:text-4xl text-brutal-black dark:text-brutal-white mb-4">
                  {t.experience.comingSoon?.title || "Experience & Journey Coming Soon"}
                </h3>

                {/* Description */}
                <p className="font-body text-base md:text-lg text-brutal-black/75 dark:text-brutal-white/70 leading-relaxed">
                  {t.experience.comingSoon?.description ||
                    "My professional career milestones, academic degrees, and verified certificates are currently being compiled with image evidence. Check back soon!"}
                </p>
              </div>
            </div>
          ) : (
            /* Timeline */
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-brutal-black dark:bg-brutal-white" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {experiences.map((exp, index) => {
                  const transItem = t.experience.items?.[index];
                  const role = transItem?.role || exp.role;
                  const duration = transItem?.period || exp.duration;
                  const achievements = transItem?.achievements || exp.description;
                  const company = transItem?.company || exp.institution;

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
                              {company}
                            </p>
                          </div>
                          <span className="font-mono text-sm text-brutal-black/60 dark:text-brutal-white/50 bg-brutal-cream dark:bg-brutal-dark-surface border-2 border-brutal-black dark:border-brutal-white px-3 py-1 whitespace-nowrap">
                            {duration}
                          </span>
                        </div>

                        {/* Description */}
                        <ul className="space-y-1.5 mb-4">
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

                        {/* Proof / Certificate Image Section */}
                        {exp.proofImage && (
                          <div className="mt-4 pt-4 border-t-2 border-brutal-black/15 dark:border-brutal-white/15">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-brutal-black/70 dark:text-brutal-white/70 uppercase">
                                <span>📜</span>
                                <span>{t.experience.proofBadge || "BUKTI & SERTIFIKAT"}</span>
                              </span>
                              {exp.proofUrl && (
                                <a
                                  href={exp.proofUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-mono font-bold text-brutal-blue hover:underline inline-flex items-center gap-1"
                                >
                                  {t.experience.viewCredentialUrl || "Verifikasi ↗"}
                                </a>
                              )}
                            </div>

                            {/* Clickable Image Box with Lightbox Trigger */}
                            <div
                              onClick={() => setSelectedProof(exp)}
                              className="relative group/proof rounded-none border-3 border-brutal-black dark:border-brutal-white bg-brutal-cream dark:bg-brutal-dark-surface overflow-hidden cursor-pointer shadow-[var(--brutal-shadow-sm)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all max-w-xs md:max-w-sm"
                              title={t.experience.viewProof || "Klik untuk melihat foto/sertifikat bukti"}
                            >
                              <div className="relative h-32 md:h-40 w-full bg-brutal-black/5 dark:bg-brutal-white/5 overflow-hidden">
                                <img
                                  src={exp.proofImage}
                                  alt={exp.proofCaption || role}
                                  className="w-full h-full object-cover group-hover/proof:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-brutal-black/30 opacity-0 group-hover/proof:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="badge-brutal bg-brutal-yellow text-brutal-black text-xs font-bold px-2.5 py-1 shadow-none">
                                    🔍 {t.experience.viewProof || "Lihat Bukti"}
                                  </span>
                                </div>
                              </div>

                              {exp.proofCaption && (
                                <div className="p-2 text-xs font-mono text-brutal-black/80 dark:text-brutal-white/70 bg-brutal-white dark:bg-brutal-dark-card border-t-2 border-brutal-black dark:border-brutal-white truncate">
                                  {exp.proofCaption}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Proof / Certificate Image Lightbox Modal */}
      {selectedProof && selectedProof.proofImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brutal-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedProof(null)}
        >
          <div
            className="card-brutal-static bg-brutal-white dark:bg-brutal-dark-card max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-brutal-black dark:border-brutal-white shadow-[8px_8px_0px_0px_var(--brutal-border)] p-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="p-4 md:p-5 border-b-3 border-brutal-black dark:border-brutal-white flex items-center justify-between"
              style={{ backgroundColor: selectedProof.color }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-brutal-black text-white px-2 py-0.5 border border-brutal-black">
                  {t.experience.proofBadge || "BUKTI & SERTIFIKAT"}
                </span>
                <h4 className="font-heading font-bold text-base md:text-lg text-brutal-black truncate max-w-[200px] md:max-w-md">
                  {selectedProof.role} — {selectedProof.institution}
                </h4>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="w-8 h-8 flex items-center justify-center bg-brutal-black text-white hover:bg-brutal-red border-2 border-brutal-black transition-colors font-bold text-sm cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Image View */}
            <div className="p-4 md:p-6 bg-brutal-cream/40 dark:bg-brutal-dark flex flex-col items-center">
              <div className="border-3 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow)] overflow-hidden w-full max-h-[60vh] flex items-center justify-center bg-brutal-black/5 dark:bg-brutal-white/5">
                <img
                  src={selectedProof.proofImage}
                  alt={selectedProof.proofCaption || selectedProof.role}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>

              {selectedProof.proofCaption && (
                <p className="mt-3 font-mono text-xs md:text-sm text-center text-brutal-black/75 dark:text-brutal-white/70">
                  {selectedProof.proofCaption}
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card flex flex-wrap items-center justify-between gap-3">
              {selectedProof.proofUrl ? (
                <a
                  href={selectedProof.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal text-xs py-2 px-3"
                >
                  <span>🔗</span>
                  <span>{t.experience.viewCredentialUrl || "Verifikasi Tautan Asli ↗"}</span>
                </a>
              ) : (
                <div />
              )}
              <button
                onClick={() => setSelectedProof(null)}
                className="btn-brutal text-xs py-2 px-4 bg-brutal-cream dark:bg-brutal-dark-surface text-brutal-black dark:text-brutal-white border-2 border-brutal-black dark:border-brutal-white"
              >
                {t.experience.closeProof || "Tutup Preview"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
