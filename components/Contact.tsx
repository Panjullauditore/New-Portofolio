"use client";

import { profile } from "@/data/profile";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMsg(
          data.error || t.contact.form.errorAlert
        );
      }
    } catch {
      setErrorMsg(t.contact.form.errorAlert);
    } finally {
      setIsSubmitting(false);
    }
  };

  const allSocialLinks = [
    {
      name: "GitHub",
      url: profile.socialLinks.github,
      color: "#FFE925",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: profile.socialLinks.linkedin,
      color: "#4D96FF",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "X",
      url: profile.socialLinks.x,
      color: "#FF6B9D",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: profile.socialLinks.instagram,
      color: "#E1306C",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      url: profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : "",
      color: "#6BCB77",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: "Email",
      url: profile.email ? `mailto:${profile.email}` : "",
      color: "#FF8C42",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const socialLinks = allSocialLinks.filter((link) => Boolean(link.url && link.url.trim() !== ""));

  return (
    <section id="contact" ref={sectionRef} className="py-10 md:py-14 bg-brutal-yellow dark:bg-brutal-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Title */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="badge-brutal bg-brutal-black text-brutal-yellow dark:bg-brutal-yellow dark:text-brutal-black text-xs font-mono font-bold px-2 py-0.5">
                05
              </span>
              <h2 className="section-title text-brutal-black dark:text-brutal-white">
                {t.contact.badge.replace(/^05\s*/, "")}
              </h2>
            </div>
            <p className="font-body text-lg text-brutal-black/70 dark:text-brutal-white/60 mt-4 max-w-xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="card-brutal-static bg-brutal-white dark:bg-brutal-dark-card p-6 md:p-8">
              <h3 className="font-heading font-bold text-xl mb-6 text-brutal-black dark:text-brutal-white flex items-center gap-2">
                <span>{t.contact.form.formTitle}</span>
                <span>📫</span>
              </h3>

              {isSent ? (
                <div className="text-center py-12 animate-in fade-in">
                  <span className="text-5xl mb-4 block">🚀</span>
                  <p className="font-heading font-bold text-xl text-brutal-black dark:text-brutal-white">
                    {t.contact.form.successAlert}
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="btn-brutal btn-brutal-secondary text-xs py-2 px-4 mt-6 cursor-pointer"
                  >
                    {t.contact.form.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 border-2 border-brutal-red bg-brutal-red/10 text-brutal-red font-mono text-xs font-bold flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="font-heading font-semibold text-sm block mb-2 text-brutal-black dark:text-brutal-white">
                      {t.contact.form.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border-3 border-brutal-black dark:border-brutal-white bg-brutal-cream dark:bg-brutal-dark-surface font-body text-brutal-black dark:text-brutal-white focus:outline-none focus:shadow-[var(--brutal-shadow-sm)] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all placeholder:text-brutal-black/30 dark:placeholder:text-brutal-white/30"
                      placeholder={t.contact.form.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="font-heading font-semibold text-sm block mb-2 text-brutal-black dark:text-brutal-white">
                      {t.contact.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border-3 border-brutal-black dark:border-brutal-white bg-brutal-cream dark:bg-brutal-dark-surface font-body text-brutal-black dark:text-brutal-white focus:outline-none focus:shadow-[var(--brutal-shadow-sm)] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all placeholder:text-brutal-black/30 dark:placeholder:text-brutal-white/30"
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>
                  <div>
                    <label className="font-heading font-semibold text-sm block mb-2 text-brutal-black dark:text-brutal-white">
                      {t.contact.form.messageLabel}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border-3 border-brutal-black dark:border-brutal-white bg-brutal-cream dark:bg-brutal-dark-surface font-body text-brutal-black dark:text-brutal-white focus:outline-none focus:shadow-[var(--brutal-shadow-sm)] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all resize-none placeholder:text-brutal-black/30 dark:placeholder:text-brutal-white/30"
                      placeholder={t.contact.form.messagePlaceholder}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-brutal btn-brutal-red w-full justify-center text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block animate-spin mr-2">⏳</span>
                        {t.contact.form.submittingBtn}
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        {t.contact.form.submitBtn}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl mb-6 text-brutal-black dark:text-brutal-white">
                {t.contact.directHeading}
              </h3>



              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-3 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow)] flex items-center gap-4 p-4 group transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
                  style={{ backgroundColor: link.color }}
                >
                  <div className="w-12 h-12 flex items-center justify-center border-3 border-brutal-black bg-brutal-white text-brutal-black flex-shrink-0">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-brutal-black text-base">
                      {link.name}
                    </p>
                    <p className="font-mono text-xs text-brutal-black/75 truncate">
                      {link.url}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-brutal-black group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
