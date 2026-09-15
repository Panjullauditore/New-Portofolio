"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
  progress?: number;
  duration?: number;
}

export default function SpotifyWidget() {
  const { t } = useLanguage();
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const data = await res.json();
          setTrack(data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fallback mock data when API is not configured
  const mockTrack: SpotifyTrack = {
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    url: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
    isPlaying: false,
  };

  const displayTrack = track || (error || !isLoading ? mockTrack : null);

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-lg mx-auto">
            <div className="card-brutal-static border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[var(--brutal-shadow)] p-6 overflow-hidden transition-colors duration-300">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#1DB954]" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-brutal-black dark:text-brutal-white text-sm">
                    {displayTrack?.isPlaying ? t.spotify.nowPlaying : t.spotify.recentlyPlayed}
                  </p>
                  <p className="font-mono text-xs text-brutal-black/60 dark:text-brutal-white/50">{t.spotify.onSpotify}</p>
                </div>
                {displayTrack?.isPlaying && (
                  <div className="ml-auto flex items-end gap-1 h-5">
                    <span className="w-1 bg-[#1DB954] animate-bounce" style={{ height: "60%", animationDelay: "0ms" }} />
                    <span className="w-1 bg-[#1DB954] animate-bounce" style={{ height: "100%", animationDelay: "150ms" }} />
                    <span className="w-1 bg-[#1DB954] animate-bounce" style={{ height: "40%", animationDelay: "300ms" }} />
                    <span className="w-1 bg-[#1DB954] animate-bounce" style={{ height: "80%", animationDelay: "450ms" }} />
                  </div>
                )}
              </div>

              {isLoading && !displayTrack ? (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brutal-black/10 dark:bg-brutal-white/10 border-2 border-brutal-black/20 dark:border-brutal-white/20 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-brutal-black/10 dark:bg-brutal-white/10 w-3/4 animate-pulse" />
                    <div className="h-3 bg-brutal-black/10 dark:bg-brutal-white/10 w-1/2 animate-pulse" />
                  </div>
                </div>
              ) : displayTrack ? (
                <a
                  href={displayTrack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group/track"
                >
                  {/* Album Art */}
                  <div className="w-16 h-16 flex-shrink-0 border-2 border-brutal-black dark:border-brutal-white bg-[#1DB954]/20 flex items-center justify-center group-hover/track:border-[#1DB954] transition-colors overflow-hidden relative shadow-[var(--brutal-shadow-sm)]">
                    {displayTrack.albumArt ? (
                      <img
                        src={displayTrack.albumArt}
                        alt={displayTrack.album || displayTrack.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                          const fallback = (e.currentTarget.nextElementSibling as HTMLElement);
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <span
                      className="text-3xl"
                      style={{ display: displayTrack.albumArt ? "none" : "flex" }}
                    >
                      🎵
                    </span>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-brutal-black dark:text-brutal-white truncate group-hover/track:text-[#1DB954] transition-colors">
                      {displayTrack.name}
                    </p>
                    <p className="font-body text-sm text-brutal-black/75 dark:text-brutal-white/60 truncate">
                      {displayTrack.artist}
                    </p>
                    <p className="font-mono text-xs text-brutal-black/50 dark:text-brutal-white/40 truncate">
                      {displayTrack.album}
                    </p>

                    {/* Progress Bar */}
                    {displayTrack.isPlaying && displayTrack.progress !== undefined && displayTrack.duration !== undefined && (
                      <div className="mt-2 w-full h-1 bg-brutal-black/15 dark:bg-brutal-white/10">
                        <div
                          className="h-full bg-[#1DB954] transition-all duration-1000"
                          style={{
                            width: `${(displayTrack.progress / displayTrack.duration) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Open Link Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-brutal-black/40 dark:text-brutal-white/30 flex-shrink-0 group-hover/track:text-[#1DB954] transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <div className="text-center py-4">
                  <span className="text-3xl mb-2 block">🎧</span>
                  <p className="font-body text-sm text-brutal-black/60 dark:text-brutal-white/50">
                    {t.spotify.offline}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

