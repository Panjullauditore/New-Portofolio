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
  const { isEnglish } = useLanguage();
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

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
            // Actively playing
            const trackedObj = { ...data, savedAt: Date.now() };
            lastActiveTrackRef.current = trackedObj;
            try {
              localStorage.setItem("last_active_spotify_track", JSON.stringify(trackedObj));
            } catch {
              // ignore
            }
            setTrack(data);
          } else {
            // Paused / stopped: The server already compares scrobble timestamps
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

    // Fast 2.5-second polling when tab is active
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        fetchTrack();
      }
    }, 2500);

    // Instant refresh when user returns to browser from Spotify
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
    <div className="w-full max-w-[360px] sm:max-w-[400px] border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[6px_6px_0px_#1A1A2E] dark:shadow-[6px_6px_0px_#FAFAF9] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#1A1A2E] dark:hover:shadow-[8px_8px_0px_#FAFAF9]">
      {/* Retro Header Bar */}
      <div className="bg-brutal-black dark:bg-[#111118] text-white px-3.5 py-2.5 border-b-3 border-brutal-black dark:border-brutal-white flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-brutal-red inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-brutal-yellow inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-brutal-green inline-block" />
          <span className="font-mono text-[11px] font-bold text-white/90 ml-1.5 tracking-wider">
            SPOTIFY // DECK
          </span>
        </div>

        {/* Live / Paused Status Tag */}
        <div className="flex items-center gap-1.5">
          <span
            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs border flex items-center gap-1.5 ${
              isPlaying
                ? "border-[#1DB954] text-[#1DB954] bg-[#1DB954]/15"
                : "border-white/30 text-white/60 bg-white/5"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying ? "bg-[#1DB954] animate-ping" : "bg-neutral-400"
              }`}
            />
            <span>
              {isPlaying
                ? isEnglish ? "NOW PLAYING" : "LIVE PLAYING"
                : isEnglish ? "LAST PLAYED" : "TERAKHIR DIPUTAR"}
            </span>
          </span>
        </div>
      </div>

      {/* Main Player Body */}
      <div className="p-4 sm:p-5">
        {isLoading && !displayTrack ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded-none" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-3/4" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 w-1/2" />
          </div>
        ) : displayTrack ? (
          <div className="flex flex-col gap-4">
            {/* Top Row: Vinyl + Album Cover + Track Info */}
            <div className="flex items-center gap-4">
              {/* Cover Art with Vinyl Slide Out */}
              <div className="relative flex-shrink-0 group">
                {/* Vinyl Record Disc (Slides slightly right and spins if playing) */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 left-4 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#111111] border border-black dark:border-white/20 shadow-md flex items-center justify-center pointer-events-none transition-all duration-500 ${
                    isPlaying
                      ? "translate-x-3.5 sm:translate-x-5 animate-[spin_4s_linear_infinite]"
                      : "translate-x-1 group-hover:translate-x-3"
                  }`}
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #1a1a1a 18%, #111111 20%, #2b2b2b 40%, #111111 42%, #222222 80%, #0d0d0d 100%)",
                  }}
                >
                  {/* Vinyl Center Label */}
                  <div className="w-5 h-5 rounded-full bg-[#1DB954] border border-black flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                </div>

                {/* Album Cover Art */}
                <a
                  href={displayTrack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 block w-18 h-18 sm:w-20 sm:h-20 border-2 border-brutal-black dark:border-brutal-white bg-brutal-yellow shadow-[3px_3px_0px_#1A1A2E] dark:shadow-[3px_3px_0px_#FAFAF9] overflow-hidden group-hover:scale-[1.02] transition-transform"
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
                    <span className="text-2xl w-full h-full flex items-center justify-center">🎵</span>
                  )}
                </a>
              </div>

              {/* Track Details */}
              <div className="flex-1 min-w-0">
                <a
                  href={displayTrack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading font-black text-base sm:text-lg text-brutal-black dark:text-brutal-white line-clamp-1 hover:text-[#1DB954] transition-colors leading-snug block"
                  title={displayTrack.name}
                >
                  {displayTrack.name}
                </a>

                <p
                  className="font-body font-semibold text-xs sm:text-sm text-brutal-black/80 dark:text-brutal-white/80 line-clamp-1 mt-0.5"
                  title={displayTrack.artist}
                >
                  {displayTrack.artist}
                </p>

                <p
                  className="font-mono text-[11px] text-brutal-black/50 dark:text-white/40 line-clamp-1 mt-0.5"
                  title={displayTrack.album}
                >
                  {displayTrack.album}
                </p>
              </div>
            </div>

            {/* Animated Equalizer Bar Visualizer */}
            <div className="pt-2.5 border-t-2 border-dashed border-brutal-black/15 dark:border-brutal-white/15 flex items-center justify-between gap-3">
              <div className="h-5 flex items-end gap-1 flex-1 overflow-hidden">
                {[55, 90, 45, 100, 70, 35, 85, 60, 40, 95, 75, 50, 85, 65, 40, 90, 60, 80].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-xs origin-bottom transition-all duration-300 ${
                      isPlaying ? "bg-[#1DB954] animate-equalizer" : "bg-neutral-400/40"
                    }`}
                    style={{
                      height: isPlaying ? `${h}%` : "20%",
                      animationDelay: `${(i % 6) * 110}ms`,
                    }}
                  />
                ))}
              </div>

              <a
                href={displayTrack.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] font-bold text-brutal-black/60 dark:text-white/50 hover:text-[#1DB954] dark:hover:text-[#1DB954] tracking-wider uppercase flex items-center gap-1 transition-colors"
                title="Open on Spotify"
              >
                <span>{isPlaying ? "LIVE FEED" : "STANDBY"}</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="font-mono text-xs text-brutal-black/60 dark:text-white/60">
              {isEnglish ? "Spotify data offline" : "Data Spotify sedang offline"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
