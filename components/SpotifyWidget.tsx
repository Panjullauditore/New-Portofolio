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
}

export default function SpotifyWidget() {
  const { t, isEnglish } = useLanguage();
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const lastActiveTrackRef = useRef<(SpotifyTrack & { savedAt?: number }) | null>(null);

  // Initialize cached active track from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("last_active_spotify_track");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          lastActiveTrackRef.current = parsed;
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch(`/api/spotify?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (res.ok) {
          const data: SpotifyTrack = await res.json();
          if (data.isPlaying) {
            // Actively playing: save as current active track
            const trackedObj = { ...data, savedAt: Date.now() };
            lastActiveTrackRef.current = trackedObj;
            try {
              localStorage.setItem("last_active_spotify_track", JSON.stringify(trackedObj));
            } catch {
              // ignore
            }
            setTrack(data);
          } else {
            // Paused / stopped: The server already intelligently compares scrobble timestamps
            // to ensure the paused track is preserved until a newer track is scrobbled or played.
            setTrack(data);
            const trackedObj = { ...data, isPlaying: false };
            lastActiveTrackRef.current = trackedObj;
            try {
              localStorage.setItem("last_active_spotify_track", JSON.stringify(trackedObj));
            } catch {
              // ignore
            }
          }
          setError(false);
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

    // Fast 2.5-second polling when tab is active (ultra-responsive and safe from rate limits)
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        fetchTrack();
      }
    }, 2500);

    // Instant refresh when user switches tab or returns to browser from Spotify app
    const handleVisibilityChange = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        fetchTrack();
      }
    };

    window.addEventListener("focus", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Fallback mock data when API is offline
  const mockTrack: SpotifyTrack = {
    name: "Hälla",
    artist: "Crawla",
    album: "Paranoia",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/28/ba/3e/28ba3ea6-ebe0-eb05-6ca4-fcef65c31bc6/859734605506_cover.jpg/600x600bb.jpg",
    url: "https://open.spotify.com/search/H%C3%A4lla%20Crawla",
    isPlaying: false,
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const displayTrack = track || (error || !isLoading ? mockTrack : null);
  const isPlaying = displayTrack?.isPlaying || false;

  return (
    <aside
      aria-label="Spotify Player"
      className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-40 flex flex-col items-end select-none pointer-events-none"
    >
      {/* Maximized Pocket Card (Compact: ~290px, sleek & non-obtrusive) */}
      {isExpanded && displayTrack && (
        <div className="pointer-events-auto mb-2 w-[280px] sm:w-[300px] border-2 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[4px_4px_0px_#1A1A2E] dark:shadow-[4px_4px_0px_#FAFAF9] overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header Strip */}
          <div className="bg-brutal-black dark:bg-[#111118] text-white px-3 py-1.5 border-b-2 border-brutal-black dark:border-brutal-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brutal-red inline-block" />
              <span className="w-2 h-2 rounded-full bg-brutal-yellow inline-block" />
              <span className="w-2 h-2 rounded-full bg-brutal-green inline-block" />
              <span className="font-mono text-[10px] font-bold text-white/80 ml-1">
                SPOTIFY // POCKET
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-[9px] font-bold px-1.5 py-0.2 rounded-xs border ${
                  isPlaying
                    ? "border-[#1DB954] text-[#1DB954] bg-[#1DB954]/10"
                    : "border-white/30 text-white/60 bg-white/5"
                }`}
              >
                {isPlaying ? "LIVE" : "PAUSED"}
              </span>

              {/* Close / Collapse button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="w-4 h-4 flex items-center justify-center font-mono text-[11px] font-black text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                title="Minimize"
                aria-label="Minimize player"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-3">
            <div className="flex items-center gap-3">
              {/* Mini Vinyl Disc + Cover */}
              <div className="relative flex-shrink-0">
                <div
                  className={`absolute top-1/2 -translate-y-1/2 left-3 w-12 h-12 rounded-full bg-[#111111] border border-black dark:border-white/30 shadow-xs flex items-center justify-center pointer-events-none transition-transform duration-300 ${
                    isPlaying ? "animate-[spin_6s_linear_infinite]" : ""
                  }`}
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #1a1a1a 18%, #111111 20%, #2b2b2b 40%, #111111 42%, #222222 80%, #0d0d0d 100%)",
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-[#1DB954] border border-black flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-black" />
                  </div>
                </div>

                <a
                  href={displayTrack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 block w-12 h-12 border-2 border-brutal-black dark:border-brutal-white bg-brutal-yellow shadow-[2px_2px_0px_#1A1A2E] dark:shadow-[2px_2px_0px_#FAFAF9] overflow-hidden"
                >
                  {displayTrack.albumArt ? (
                    <img
                      src={displayTrack.albumArt}
                      alt={displayTrack.album || displayTrack.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-lg w-full h-full flex items-center justify-center">🎵</span>
                  )}
                </a>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <a
                  href={displayTrack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading font-black text-xs text-brutal-black dark:text-brutal-white truncate block hover:text-[#1DB954] transition-colors"
                >
                  {displayTrack.name}
                </a>
                <p className="font-body text-[11px] text-brutal-black/80 dark:text-brutal-white/70 truncate mt-0.5">
                  {displayTrack.artist}
                </p>
                <p className="font-mono text-[9px] text-brutal-black/50 dark:text-white/40 truncate">
                  {displayTrack.album}
                </p>
              </div>
            </div>

            {/* Bottom Equalizer Strip */}
            <div className="mt-2.5 pt-2 border-t border-dashed border-brutal-black/15 dark:border-brutal-white/15 flex items-center justify-between gap-2">
              {/* 14 Equalizer Bars */}
              <div className="h-3.5 flex items-end gap-1 flex-1 overflow-hidden">
                {[45, 80, 50, 100, 65, 35, 90, 60, 40, 85, 70, 50, 95, 40].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-xs transition-all duration-300 ${
                      isPlaying ? "bg-[#1DB954] animate-equalizer" : "bg-neutral-400/40"
                    }`}
                    style={{
                      height: isPlaying ? `${h}%` : "20%",
                      animationDelay: `${(i % 5) * 120}ms`,
                    }}
                  />
                ))}
              </div>

              <a
                href={displayTrack.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] font-bold text-[#1DB954] hover:underline flex items-center gap-0.5 flex-shrink-0"
              >
                <span>OPEN ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Floating Mini Pill (Ultra Compact: ~210px, non-intrusive) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="pointer-events-auto flex items-center gap-2 py-1 px-2 pr-2.5 border-2 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[3px_3px_0px_#1A1A2E] dark:shadow-[3px_3px_0px_#FAFAF9] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1A1A2E] dark:hover:shadow-[4px_4px_0px_#FAFAF9] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer select-none max-w-[210px] sm:max-w-[230px]"
        title={isExpanded ? "Click to close" : "Click to expand player"}
      >
        {/* Tiny Album Art with Status Dot */}
        <div className="relative flex-shrink-0 w-6 h-6 border border-brutal-black dark:border-brutal-white bg-brutal-yellow overflow-hidden">
          {displayTrack?.albumArt ? (
            <img
              src={displayTrack.albumArt}
              alt={displayTrack?.name || "Track"}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-[10px] w-full h-full flex items-center justify-center">🎵</span>
          )}

          <span
            className={`absolute top-0 right-0 w-1.5 h-1.5 rounded-full ${
              isPlaying ? "bg-[#1DB954] ring-1 ring-black" : "bg-neutral-400"
            }`}
          />
        </div>

        {/* Track & Artist (Short & Clean) */}
        <div className="flex-1 min-w-0">
          <p className="font-heading font-black text-[11px] text-brutal-black dark:text-brutal-white truncate leading-none">
            {displayTrack?.name || "Spotify"}
          </p>
          <p className="font-mono text-[9px] text-brutal-black/60 dark:text-white/60 truncate leading-tight mt-0.5">
            {displayTrack?.artist || "Player"}
          </p>
        </div>

        {/* Mini 3-bar visualizer or chevron */}
        <div className="flex items-center gap-1.5 flex-shrink-0 pl-1 border-l border-brutal-black/15 dark:border-brutal-white/15">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-2.5 w-2.5">
              <span className="w-0.5 bg-[#1DB954] animate-bounce" style={{ height: "60%", animationDelay: "0ms" }} />
              <span className="w-0.5 bg-[#1DB954] animate-bounce" style={{ height: "100%", animationDelay: "150ms" }} />
              <span className="w-0.5 bg-[#1DB954] animate-bounce" style={{ height: "40%", animationDelay: "300ms" }} />
            </div>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          )}

          <span
            className={`font-mono text-[9px] text-brutal-black/60 dark:text-white/60 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            ▲
          </span>
        </div>
      </div>
    </aside>
  );
}

