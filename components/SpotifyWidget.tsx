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
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Expanded Retro Cassette Stereo Deck Popup */}
      {isExpanded && displayTrack && (
        <div className="pointer-events-auto mb-3 w-[calc(100vw-2rem)] sm:w-[460px] md:w-[500px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="card-brutal-static border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[6px_6px_0px_#1A1A2E] dark:shadow-[6px_6px_0px_#FAFAF9] overflow-hidden">
            {/* Retro Console Header Strip */}
            <div className="bg-brutal-black dark:bg-[#111118] text-white px-3.5 py-2 border-b-3 border-brutal-black dark:border-brutal-white flex items-center justify-between gap-2 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brutal-red border border-black/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-brutal-yellow border border-black/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-brutal-green border border-black/40 inline-block" />
                <span className="font-mono text-[10px] font-bold text-white/80 ml-2 tracking-wider">
                  STEREO DECK // CASSETTE 01
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#1DB954]" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <span className="text-[#1DB954] hidden sm:inline">SPOTIFY</span>
                  {isPlaying ? (
                    <span className="text-[10px] text-[#1DB954] font-mono ml-1">LIVE</span>
                  ) : (
                    <span className="text-white/60 text-[10px]">STANDBY</span>
                  )}
                </div>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-2 py-0.5 border border-white/30 bg-white/10 hover:bg-brutal-yellow hover:text-brutal-black hover:border-brutal-black font-mono text-[10px] font-black transition-colors ml-1 cursor-pointer"
                  title="Minimize"
                >
                  —
                </button>
              </div>
            </div>

            {/* Console Body */}
            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-4">
                {/* Vinyl Disk & Album Art Showcase */}
                <div className="relative group/vinyl flex-shrink-0">
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 left-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#111111] border-2 border-brutal-black dark:border-brutal-white shadow-sm flex items-center justify-center pointer-events-none transition-transform duration-500 group-hover/vinyl:translate-x-4 ${
                      isPlaying ? "animate-[spin_7s_linear_infinite]" : ""
                    }`}
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #1a1a1a 18%, #111111 20%, #2b2b2b 38%, #111111 40%, #2b2b2b 60%, #111111 62%, #222222 85%, #0d0d0d 100%)",
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#1DB954] border border-black flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    </div>
                  </div>

                  {/* Album Art Sleeve */}
                  <a
                    href={displayTrack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 block w-20 h-20 sm:w-24 sm:h-24 border-2 border-brutal-black dark:border-brutal-white bg-[#1DB954]/20 shadow-[3px_3px_0px_#1A1A2E] dark:shadow-[3px_3px_0px_#FAFAF9] overflow-hidden group-hover/vinyl:border-[#1DB954] transition-colors"
                  >
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
                      className="text-2xl w-full h-full flex items-center justify-center"
                      style={{ display: displayTrack.albumArt ? "none" : "flex" }}
                    >
                      🎵
                    </span>
                  </a>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-brutal-black dark:border-brutal-white bg-[#1DB954]/15 text-[#1DB954] font-mono text-[10px] font-bold uppercase mb-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isPlaying ? "bg-[#1DB954] animate-ping" : "bg-brutal-black/50 dark:bg-brutal-white/50"
                      }`}
                    />
                    <span>
                      {isPlaying
                        ? `${t.spotify.nowPlaying}`
                        : isEnglish
                        ? "PAUSED ON SPOTIFY"
                        : "JEDA DI SPOTIFY"}
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-base sm:text-lg text-brutal-black dark:text-brutal-white truncate tracking-tight">
                    <a
                      href={displayTrack.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#1DB954] transition-colors"
                    >
                      {displayTrack.name}
                    </a>
                  </h4>

                  <p className="font-body text-xs sm:text-sm font-medium text-brutal-black/85 dark:text-brutal-white/80 truncate mt-0.5">
                    {displayTrack.artist}
                  </p>
                  <p className="font-mono text-[11px] text-brutal-black/50 dark:text-brutal-white/45 truncate mt-0.5">
                    {displayTrack.album}
                  </p>
                </div>
              </div>

              {/* Mini Audio Equalizer Visualizer */}
              <div className="mt-3 pt-2.5 border-t border-dashed border-brutal-black/20 dark:border-brutal-white/20">
                <div className="flex items-center justify-between font-mono text-[10px] font-bold text-brutal-black/70 dark:text-brutal-white/60 mb-1.5">
                  <span className="uppercase tracking-wider">
                    {isPlaying ? "LIVE EQUALIZER" : "STANDBY SPECTRUM"}
                  </span>
                  <a
                    href={displayTrack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1DB954] hover:underline flex items-center gap-1"
                  >
                    <span>OPEN ON SPOTIFY ↗</span>
                  </a>
                </div>

                <div className="h-6 bg-brutal-black/5 dark:bg-black/30 border border-brutal-black/25 dark:border-brutal-white/20 px-2 py-1 flex items-end justify-between gap-1 overflow-hidden">
                  {[
                    40, 70, 45, 85, 60, 30, 80, 100, 45, 65, 90, 55, 35, 75, 50, 85,
                    65, 40, 80, 55, 95, 70, 35, 85, 60, 45, 75, 40, 65, 90, 50, 30,
                  ].map((baseHeight, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-xs origin-bottom transition-all duration-300 ${
                        isPlaying
                          ? "bg-[#1DB954] animate-equalizer"
                          : "bg-brutal-black/20 dark:bg-brutal-white/15"
                      }`}
                      style={{
                        height: isPlaying ? `${baseHeight}%` : "15%",
                        animationDelay: `${(i % 10) * 100}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Mini-Bar (Always Visible & Interactive) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="pointer-events-auto flex items-center gap-2.5 p-1.5 sm:p-2 pr-3 sm:pr-3.5 border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[4px_4px_0px_#1A1A2E] dark:shadow-[4px_4px_0px_#FAFAF9] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A2E] dark:hover:shadow-[6px_6px_0px_#FAFAF9] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#1A1A2E] dark:active:shadow-[2px_2px_0px_#FAFAF9] transition-all cursor-pointer select-none group max-w-[280px] sm:max-w-[340px]"
        title={isExpanded ? "Click to minimize stereo deck" : "Click to expand stereo deck"}
      >
        {/* Album Art with Mini Peeking Vinyl */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 border-2 border-brutal-black dark:border-brutal-white bg-brutal-yellow overflow-hidden shadow-sm flex items-center justify-center`}
          >
            {displayTrack?.albumArt ? (
              <img
                src={displayTrack.albumArt}
                alt={displayTrack?.name || "Music"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <span className="text-base">🎵</span>
            )}
          </div>

          {/* Playing Dot Badge */}
          <span
            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-black ${
              isPlaying ? "bg-[#1DB954] animate-pulse" : "bg-neutral-400"
            }`}
          />
        </div>

        {/* Track Title & Artist */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-mono text-[9px] font-bold tracking-wider uppercase ${
                isPlaying ? "text-[#1DB954]" : "text-brutal-black/50 dark:text-white/50"
              }`}
            >
              {isPlaying ? "NOW PLAYING" : "PAUSED"}
            </span>
          </div>

          <p className="font-heading font-black text-xs sm:text-sm text-brutal-black dark:text-brutal-white truncate leading-tight mt-0.5">
            {displayTrack?.name || "Loading..."}
          </p>
          <p className="font-mono text-[10px] text-brutal-black/60 dark:text-white/60 truncate leading-tight">
            {displayTrack?.artist || "Spotify"}
          </p>
        </div>

        {/* Dancing Bars / Chevron Button */}
        <div className="flex items-center gap-2 flex-shrink-0 pl-1 border-l-2 border-brutal-black/15 dark:border-brutal-white/15">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3 justify-center">
              <span className="w-0.5 bg-[#1DB954] animate-bounce" style={{ height: "60%", animationDelay: "0ms" }} />
              <span className="w-0.5 bg-[#1DB954] animate-bounce" style={{ height: "100%", animationDelay: "150ms" }} />
              <span className="w-0.5 bg-[#1DB954] animate-bounce" style={{ height: "40%", animationDelay: "300ms" }} />
            </div>
          ) : (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#1DB954]" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          )}

          <span
            className={`font-mono text-xs text-brutal-black dark:text-brutal-white transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            ▲
          </span>
        </div>
      </div>
    </div>
  );
}

