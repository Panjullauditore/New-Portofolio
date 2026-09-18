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

  const displayTrack = track || (error || !isLoading ? mockTrack : null);
  const isPlaying = displayTrack?.isPlaying || false;

  return (
    <div className="mt-8 md:mt-10">
      {/* Subheader Badge */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1DB954] animate-pulse" />
          <span className="font-mono text-xs font-bold text-brutal-black/70 dark:text-brutal-white/70 uppercase tracking-wider">
            {isEnglish ? "CODING SOUNDTRACK // CURRENT VIBE" : "LAGU SAAT NGODING // AKTIVITAS SPOTIFY"}
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-brutal-black/50 dark:text-brutal-white/40">
          {isPlaying ? (isEnglish ? "LIVE STREAMING" : "SEDANG BERPUTAR") : (isEnglish ? "STANDBY" : "TERAKHIR DIPUTAR")}
        </span>
      </div>

      {/* Retro Audio Console Container */}
      <div className="card-brutal-static border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[var(--brutal-shadow-lg)] overflow-hidden transition-all duration-300">
        {/* Retro Console Header Strip */}
        <div className="bg-brutal-black dark:bg-[#111118] text-white px-4 py-2.5 border-b-3 border-brutal-black dark:border-brutal-white flex items-center justify-between gap-2 select-none">
          {/* Vintage dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-brutal-red border border-black/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-brutal-yellow border border-black/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-brutal-green border border-black/40 inline-block" />
            <span className="hidden sm:inline-block font-mono text-[11px] font-bold text-white/80 ml-2 tracking-wider">
              STEREO DECK // CASSETTE 01
            </span>
          </div>

          {/* Spotify Brand & Status */}
          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1DB954]" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="text-[#1DB954] hidden xs:inline">SPOTIFY</span>
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4 ml-1">
                <span className="w-1 bg-[#1DB954] animate-bounce" style={{ height: "65%", animationDelay: "0ms" }} />
                <span className="w-1 bg-[#1DB954] animate-bounce" style={{ height: "100%", animationDelay: "150ms" }} />
                <span className="w-1 bg-[#1DB954] animate-bounce" style={{ height: "45%", animationDelay: "300ms" }} />
                <span className="w-1 bg-[#1DB954] animate-bounce" style={{ height: "85%", animationDelay: "450ms" }} />
              </div>
            ) : (
              <span className="text-white/60 text-[11px]">STANDBY</span>
            )}
          </div>
        </div>

        {/* Console Body */}
        <div className="p-6 md:p-8">
          {isLoading && !displayTrack ? (
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-brutal-black/10 dark:bg-brutal-white/10 border-2 border-brutal-black/20 dark:border-brutal-white/20 animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-brutal-black/10 dark:bg-brutal-white/10 w-2/3 animate-pulse" />
                <div className="h-4 bg-brutal-black/10 dark:bg-brutal-white/10 w-1/2 animate-pulse" />
                <div className="h-3 bg-brutal-black/10 dark:bg-brutal-white/10 w-1/3 animate-pulse" />
              </div>
            </div>
          ) : displayTrack ? (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              {/* Vinyl Disk & Album Art Showcase */}
              <div className="relative group/vinyl flex-shrink-0">
                {/* Realistic Peeking Vinyl Disk */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 left-6 w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#111111] border-3 border-brutal-black dark:border-brutal-white shadow-[var(--brutal-shadow-sm)] flex items-center justify-center pointer-events-none transition-transform duration-500 group-hover/vinyl:translate-x-6 ${
                    isPlaying ? "animate-[spin_7s_linear_infinite]" : ""
                  }`}
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #1a1a1a 18%, #111111 20%, #2b2b2b 38%, #111111 40%, #2b2b2b 60%, #111111 62%, #222222 85%, #0d0d0d 100%)",
                  }}
                >
                  {/* Vinyl Center Hole with Spotify Green Label */}
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#1DB954] border-2 border-black flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  </div>
                </div>

                {/* Album Art Sleeve */}
                <a
                  href={displayTrack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 block w-28 h-28 md:w-32 md:h-32 border-3 border-brutal-black dark:border-brutal-white bg-[#1DB954]/20 shadow-[var(--brutal-shadow)] overflow-hidden group-hover/vinyl:border-[#1DB954] transition-colors"
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
                    className="text-4xl w-full h-full flex items-center justify-center"
                    style={{ display: displayTrack.albumArt ? "none" : "flex" }}
                  >
                    🎵
                  </span>
                </a>
              </div>

              {/* Track Info & Visualizer */}
              <div className="flex-1 min-w-0 w-full text-center md:text-left flex flex-col justify-between">
                <div>
                  {/* Status Tag */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 border-2 border-brutal-black dark:border-brutal-white bg-[#1DB954]/15 text-[#1DB954] font-mono text-xs font-bold uppercase mb-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isPlaying ? "bg-[#1DB954] animate-ping" : "bg-brutal-black/50 dark:bg-brutal-white/50"
                      }`}
                    />
                    <span>
                      {isPlaying
                        ? `${t.spotify.nowPlaying} ${t.spotify.onSpotify}`
                        : isEnglish
                        ? "PAUSED ON SPOTIFY"
                        : "JEDA DI SPOTIFY"}
                    </span>
                  </div>

                  {/* Song Name */}
                  <h4 className="font-heading font-black text-xl md:text-2xl text-brutal-black dark:text-brutal-white truncate tracking-tight">
                    <a
                      href={displayTrack.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#1DB954] transition-colors"
                    >
                      {displayTrack.name}
                    </a>
                  </h4>

                  {/* Artist & Album */}
                  <p className="font-body text-sm md:text-base font-medium text-brutal-black/85 dark:text-brutal-white/80 truncate mt-0.5">
                    {displayTrack.artist}
                  </p>
                  <p className="font-mono text-xs text-brutal-black/50 dark:text-brutal-white/45 truncate mt-0.5">
                    {displayTrack.album}
                  </p>
                </div>

                {/* Live Audio Equalizer Waveform Visualizer */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-brutal-black/15 dark:border-brutal-white/15">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-brutal-black/70 dark:text-brutal-white/60 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isPlaying
                            ? "bg-[#1DB954] animate-ping"
                            : "bg-brutal-black/40 dark:bg-brutal-white/30"
                        }`}
                      />
                      <span className="uppercase tracking-wider text-[10px]">
                        {isPlaying ? "AUDIO WAVE SPECTRUM" : "AUDIO DECK STANDBY"}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-[#1DB954]/40 bg-[#1DB954]/10 text-[#1DB954]">
                      {isPlaying ? "STREAMING LIVE" : "IDLE"}
                    </span>
                  </div>

                  {/* Visualizer Equalizer Frequency Bars */}
                  <div className="h-9 bg-brutal-black/5 dark:bg-black/30 border-2 border-brutal-black/25 dark:border-brutal-white/20 px-3 py-1.5 flex items-end justify-between gap-1 overflow-hidden">
                    {[
                      45, 75, 50, 90, 65, 30, 85, 100, 45, 70, 95, 60, 35, 80, 55, 90,
                      70, 45, 85, 60, 100, 75, 40, 90, 65, 50, 80, 45, 70, 95, 55, 35,
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
          ) : (
            <div className="text-center py-6">
              <span className="text-4xl mb-3 block">🎧</span>
              <p className="font-heading font-bold text-base text-brutal-black dark:text-brutal-white">
                {t.spotify.offline}
              </p>
              <p className="font-mono text-xs text-brutal-black/60 dark:text-brutal-white/50 mt-1">
                Check back later when I am active on Spotify!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

