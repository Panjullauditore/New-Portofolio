"use client";

import { projects } from "@/data/projects";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const categories = [
    { key: "all", label: t.projects.filterAll },
    { key: "Web", label: t.projects.filterWeb },
    { key: "Mobile", label: t.projects.filterMobile },
    { key: "Design", label: t.projects.filterDesign },
  ];

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

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  // Get translated details for a project
  const getProjectTranslation = (id: string) => {
    return t.projects.items.find((item) => item.id === id);
  };

  const getCategoryLabel = (cat: string) => {
    const k = cat.toLowerCase();
    if (k === "web") return t.projects.categories.web;
    if (k === "mobile") return t.projects.categories.mobile;
    if (k === "design") return t.projects.categories.design;
    return cat;
  };

  const selectedTrans = selectedProject ? getProjectTranslation(selectedProject.id) : null;

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-8">
            <span className="badge-brutal bg-brutal-pink text-white text-xs font-mono font-bold px-2 py-0.5">
              03
            </span>
            <h2 className="section-title text-brutal-black dark:text-brutal-white">
              {t.projects.badge.replace(/^03\s*/, "")}
            </h2>
          </div>

          {/* Projects Content or Coming Soon State */}
          {projects.length === 0 ? (
            <div className="card-brutal p-8 md:p-14 text-center bg-brutal-white dark:bg-brutal-dark-card border-4 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-lg)] relative overflow-hidden">
              {/* Background Accent Watermark */}
              <div className="absolute -right-8 -bottom-8 opacity-5 dark:opacity-10 pointer-events-none select-none">
                <span className="text-9xl font-heading font-black">PROJ</span>
              </div>

              <div className="max-w-2xl mx-auto flex flex-col items-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-brutal-yellow text-brutal-black px-4 py-1.5 border-3 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-sm)] font-mono text-xs md:text-sm font-bold uppercase mb-6 rotate-[-1deg]">
                  <span>🚀</span>
                  <span>{t.projects.comingSoon?.badge || "COMING SOON"}</span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-2xl md:text-4xl text-brutal-black dark:text-brutal-white mb-4">
                  {t.projects.comingSoon?.title || "Featured Projects Under Construction"}
                </h3>

                {/* Description */}
                <p className="font-body text-base md:text-lg text-brutal-black/75 dark:text-brutal-white/70 leading-relaxed">
                  {t.projects.comingSoon?.description ||
                    "I am currently preparing, curating, and polishing my latest web applications, client solutions, and open-source experiments. Projects will appear here shortly!"}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-4 py-2 font-heading font-bold text-sm border-3 transition-all duration-100 cursor-pointer ${
                      activeCategory === cat.key
                        ? "bg-brutal-black dark:bg-brutal-white text-brutal-white dark:text-brutal-black border-brutal-black dark:border-brutal-white shadow-none translate-x-[2px] translate-y-[2px]"
                        : "bg-brutal-white dark:bg-brutal-dark-card text-brutal-black dark:text-brutal-white border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-sm)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--brutal-border)]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const trans = getProjectTranslation(project.id);
              const title = trans?.title || project.title;
              const description = trans?.description || project.description;

              return (
                <div
                  key={project.id}
                  className="card-brutal flex flex-col overflow-hidden group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Thumbnail - clickable for modal */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="h-48 border-b-3 border-brutal-black dark:border-brutal-white relative overflow-hidden cursor-pointer"
                    style={{ backgroundColor: project.color }}
                    title={t.projects.viewDetails}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-heading font-bold text-4xl text-brutal-black/20 group-hover:scale-110 transition-transform duration-300">
                        {title.charAt(0)}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-brutal-black text-brutal-yellow px-3 py-1 font-mono text-xs font-bold border-2 border-brutal-black">
                        ★ {t.projects.featured}
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-3 bg-brutal-white text-brutal-black px-2 py-1 font-mono text-xs font-bold border-2 border-brutal-black">
                      {getCategoryLabel(project.category)}
                    </div>

                    {/* Quick Detail Hint Overlay */}
                    <div className="absolute inset-0 bg-brutal-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="badge-brutal bg-brutal-white text-brutal-black font-bold text-xs py-1 px-3 shadow-none">
                        {t.projects.viewDetails} ↗
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="font-heading font-bold text-xl mb-2 text-brutal-black dark:text-brutal-white cursor-pointer hover:underline"
                    >
                      {title}
                    </h3>
                    <p className="font-body text-sm text-brutal-black/70 dark:text-brutal-white/60 mb-4 flex-1 leading-relaxed">
                      {description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 font-mono text-xs bg-brutal-cream dark:bg-brutal-dark-surface border-2 border-brutal-black dark:border-brutal-white text-brutal-black dark:text-brutal-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="btn-brutal btn-brutal-secondary text-xs py-2 px-3 flex-1 justify-center cursor-pointer"
                      >
                        {t.projects.viewDetails}
                      </button>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-brutal text-xs py-2 px-3 flex-1 justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {t.projects.liveDemo}
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-brutal btn-brutal-secondary text-xs py-2 px-2.5 justify-center"
                          title={t.projects.sourceCode}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brutal-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="card-brutal-static bg-brutal-white dark:bg-brutal-dark-card max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-brutal-black dark:border-brutal-white shadow-[8px_8px_0px_0px_var(--brutal-border)] p-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner */}
            <div
              className="p-6 border-b-4 border-brutal-black dark:border-brutal-white flex items-start justify-between relative"
              style={{ backgroundColor: selectedProject.color }}
            >
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-brutal-white text-brutal-black px-2.5 py-1 font-mono text-xs font-bold border-2 border-brutal-black">
                    {getCategoryLabel(selectedProject.category)}
                  </span>
                  {selectedProject.featured && (
                    <span className="bg-brutal-black text-brutal-yellow px-2.5 py-1 font-mono text-xs font-bold border-2 border-brutal-black">
                      ★ {t.projects.featured}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-black text-2xl md:text-3xl text-brutal-black">
                  {selectedTrans?.title || selectedProject.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 flex items-center justify-center border-3 border-brutal-black bg-brutal-black text-white hover:bg-brutal-red font-bold text-base cursor-pointer transition-colors shadow-[var(--brutal-shadow-sm)] ml-4"
                title={`${t.projects.modal.close} (Esc)`}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Description */}
              <div>
                <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-brutal-black/60 dark:text-brutal-white/60 mb-2">
                  {t.projects.viewDetails}
                </h4>
                <p className="font-body text-base text-brutal-black dark:text-brutal-white leading-relaxed">
                  {selectedTrans?.longDescription || selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {/* Problem & Solution */}
              {selectedTrans?.problem && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-brutal-black dark:border-brutal-white/40 bg-brutal-cream/50 dark:bg-brutal-dark-surface">
                    <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-brutal-red mb-1">
                      ⚠️ {t.projects.modal.problem}
                    </h5>
                    <p className="font-body text-sm text-brutal-black/85 dark:text-brutal-white/85 leading-relaxed">
                      {selectedTrans.problem}
                    </p>
                  </div>
                  <div className="p-4 border-2 border-brutal-black dark:border-brutal-white/40 bg-brutal-cream/50 dark:bg-brutal-dark-surface">
                    <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-brutal-green mb-1">
                      💡 {t.projects.modal.solution}
                    </h5>
                    <p className="font-body text-sm text-brutal-black/85 dark:text-brutal-white/85 leading-relaxed">
                      {selectedTrans.solution}
                    </p>
                  </div>
                </div>
              )}

              {/* Key Features */}
              {selectedTrans?.keyFeatures && selectedTrans.keyFeatures.length > 0 && (
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-brutal-black/60 dark:text-brutal-white/60 mb-2">
                    {t.projects.modal.keyFeatures}
                  </h4>
                  <ul className="space-y-1.5 font-body text-sm text-brutal-black/85 dark:text-brutal-white/85">
                    {selectedTrans.keyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-brutal-yellow">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-brutal-black/60 dark:text-brutal-white/60 mb-2">
                  {t.projects.modal.technologies}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 font-mono text-xs font-bold bg-brutal-cream dark:bg-brutal-dark-surface border-2 border-brutal-black dark:border-brutal-white text-brutal-black dark:text-brutal-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t-3 border-brutal-black dark:border-brutal-white flex flex-wrap gap-3">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal text-sm py-3 px-5 flex-1 justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {t.projects.liveDemo}
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal btn-brutal-secondary text-sm py-3 px-5 flex-1 justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {t.projects.sourceCode}
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-brutal btn-brutal-secondary text-sm py-3 px-5 cursor-pointer"
                >
                  {t.projects.modal.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
