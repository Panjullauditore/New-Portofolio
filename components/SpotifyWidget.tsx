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

interface SpotifyWidgetProps {
  className?: string;
}

export default function SpotifyWidget({ className = "" }: SpotifyWidgetProps) {
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
            const trackedObj = { ...data, savedAt: Date.now() };
            lastActiveTrackRef.current = trackedObj;
            try {
              localStorage.setItem("last_active_spotify_track", JSON.stringify(trackedObj));
            } catch {
              // ignore
            }
            setTrack(data);
          } else {
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

    // Fast polling every 2.5s
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        fetchTrack();
      }
    }, 2500);

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
    name: "Wish You Were Here",
    artist: "Neck Deep",
    album: "The Peace and the Panic",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/fb/8e/bffb8ec1-c290-7815-4677-458bb866ba8e/00816788017409.rgb.jpg/600x600bb.jpg",
    url: "https://open.spotify.com/search/Wish%20You%20Were%20Here%20Neck%20Deep",
    isPlaying: false,
  };

  const displayTrack = track || (error || !isLoading ? mockTrack : null);
  const isPlaying = displayTrack?.isPlaying || false;

  return (
    <div
      aria-label="Spotify Player"
      className={`select-none pointer-events-auto ${className}`}
    >
      {/* Compact Deck Card (Clean, Sleek, Zero Text Overlap) */}
      <div className="w-[285px] sm:w-[315px] border-3 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-dark-card shadow-[4px_4px_0px_#1A1A2E] dark:shadow-[4px_4px_0px_#FAFAF9] overflow-hidden transition-all">
        {/* Header Bar */}
        <div className="bg-brutal-black dark:bg-[#111118] text-white px-3 py-1.5 border-b-2 border-brutal-black dark:border-brutal-white flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brutal-red inline-block" />
            <span className="w-2 h-2 rounded-full bg-brutal-yellow inline-block" />
            <span className="w-2 h-2 rounded-full bg-brutal-green inline-block" />
            <span className="font-mono text-[10px] font-bold text-white/90 ml-1 tracking-wider">
              SPOTIFY // DECK
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`font-mono text-[9px] font-bold px-1.5 py-0.2 rounded-xs border flex items-center gap-1 ${
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
              <span>{isPlaying ? "NOW PLAYING" : "STANDBY"}</span>
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-3">
          {isLoading && !displayTrack ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-14 bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-800 w-2/3" />
            </div>
          ) : displayTrack ? (
            <div className="flex flex-col gap-2.5">
              {/* Track Row: Dedicated space for vinyl & cover, ensuring ZERO overlap with text */}
              <div className="flex items-center gap-3">
                {/* Left Column: Dedicated Vinyl + Cover Box with rich hover micro-interaction */}
                <div className="relative flex-shrink-0 w-[76px] h-[52px] group/album cursor-pointer">
                  {/* Vinyl Record Disc (Slides out and spins faster on album hover) */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 left-3 w-12 h-12 rounded-full bg-[#111111] border border-black dark:border-white/30 shadow-xs flex items-center justify-center pointer-events-none transition-all duration-300 ease-out ${
                      isPlaying
                        ? "translate-x-3.5 group-hover/album:translate-x-5 animate-[spin_4s_linear_infinite] group-hover/album:animate-[spin_1.8s_linear_infinite]"
                        : "translate-x-1 group-hover/album:translate-x-4.5 group-hover/album:animate-[spin_3s_linear_infinite]"
                    }`}
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #1a1a1a 18%, #111111 20%, #2b2b2b 40%, #111111 42%, #222222 80%, #0d0d0d 100%)",
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#1DB954] border border-black flex items-center justify-center transition-transform duration-200 group-hover/album:scale-110">
                      <div className="w-1 h-1 rounded-full bg-black" />
                    </div>
                  </div>

                  {/* Album Cover Art (Lifts, tilts, glints with light sheen, and shows mini play icon) */}
                  <a
                    href={displayTrack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 left-0 z-10 block w-[52px] h-[52px] border-2 border-brutal-black dark:border-brutal-white bg-brutal-yellow shadow-[2px_2px_0px_#1A1A2E] dark:shadow-[2px_2px_0px_#FAFAF9] group-hover/album:shadow-[4px_4px_0px_#1DB954] dark:group-hover/album:shadow-[4px_4px_0px_#1DB954] group-hover/album:-translate-y-1 group-hover/album:-translate-x-0.5 group-hover/album:rotate-[-2deg] transition-all duration-200 ease-out overflow-hidden"
                    title={displayTrack.name}
                  >
                    {displayTrack.albumArt ? (
                      <img
                        src={displayTrack.albumArt}
                        alt={displayTrack.album || displayTrack.name}
                        className="w-full h-full object-cover group-hover/album:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-xl w-full h-full flex items-center justify-center">🎵</span>
                    )}

                    {/* Diagonal light sweep sheen on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover/album:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 pointer-events-none" />

                    {/* Spotify green play overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] opacity-0 group-hover/album:opacity-100 transition-all duration-200 flex items-center justify-center pointer-events-none">
                      <span className="w-5 h-5 rounded-full bg-[#1DB954] text-black flex items-center justify-center text-[9px] font-black pl-0.5 shadow-sm transform scale-75 group-hover/album:scale-100 transition-transform duration-200">
                        ▶
                      </span>
                    </div>
                  </a>
                </div>

                {/* Right Column: Track Details (Fully clear from vinyl disc) */}
                <div className="flex-1 min-w-0">
                  <a
                    href={displayTrack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading font-black text-xs sm:text-[13px] text-brutal-black dark:text-brutal-white truncate block hover:text-[#1DB954] transition-colors leading-tight"
                    title={displayTrack.name}
                  >
                    {displayTrack.name}
                  </a>

                  <p
                    className="font-body font-semibold text-[11px] text-brutal-black/80 dark:text-brutal-white/80 truncate mt-0.5 leading-tight"
                    title={displayTrack.artist}
                  >
                    {displayTrack.artist}
                  </p>

                  <p
                    className="font-mono text-[9px] text-brutal-black/50 dark:text-white/40 truncate leading-tight mt-0.5"
                    title={displayTrack.album}
                  >
                    {displayTrack.album}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Animated Equalizer Bar Visualizer */}
              <div className="pt-2 border-t border-dashed border-brutal-black/15 dark:border-brutal-white/15 flex items-center justify-between gap-2">
                <div className="h-4 flex items-end gap-1 flex-1 overflow-hidden">
                  {[50, 85, 45, 100, 65, 35, 90, 60, 40, 85, 70, 50, 95, 60, 40].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-xs origin-bottom transition-all duration-300 ${
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
                  className="font-mono text-[9px] font-bold text-brutal-black/60 dark:text-white/50 hover:text-[#1DB954] dark:hover:text-[#1DB954] tracking-wider uppercase flex items-center gap-0.5 transition-colors"
                  title="Open in Spotify"
                >
                  <span>{isPlaying ? "LIVE FEED" : "STANDBY"}</span>
                  <span className="text-[9px]">↗</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="py-2 text-center">
              <p className="font-mono text-[10px] text-brutal-black/60 dark:text-white/60">
                {isEnglish ? "Spotify data offline" : "Data Spotify offline"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
