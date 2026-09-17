import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Configuration for Spotify and Last.fm
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

interface TrackData {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
  duration?: number;
  progress?: number;
  savedAt?: number;
}

const DEFAULT_TRACK: TrackData = {
  name: "shawty tjantik",
  artist: "Kecoud, Crisbe",
  album: "shawty tjantik (feat. Crisbe) - Single",
  albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/2a/df/ab/2adfab08-6e3a-8344-79ae-c09307176ab2/820200199294.jpg/600x600bb.jpg",
  url: "https://open.spotify.com/search/shawty%20tjantik%20Kecoud",
  isPlaying: false,
  savedAt: 1789650000000,
};

declare global {
  // eslint-disable-next-line no-var
  var __lastSpotifyActiveTrack: TrackData | undefined;
}

function getCacheFilePath(): string {
  return path.join(process.cwd(), "data", "spotify-cache.json");
}

function getSavedTrack(): TrackData {
  if (globalThis.__lastSpotifyActiveTrack) {
    return globalThis.__lastSpotifyActiveTrack;
  }
  try {
    const filePath = getCacheFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed?.name) {
        globalThis.__lastSpotifyActiveTrack = parsed;
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_TRACK;
}

function saveTrack(track: TrackData) {
  globalThis.__lastSpotifyActiveTrack = track;
  try {
    const filePath = getCacheFilePath();
    fs.writeFileSync(filePath, JSON.stringify(track, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

// Helper to fetch HD album art from iTunes search if Last.fm image is missing
async function getAlbumArt(trackName: string, artistName: string): Promise<string> {
  try {
    const query = encodeURIComponent(`${trackName} ${artistName}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return "";
    const data = await res.json();
    if (data.results?.[0]?.artworkUrl100) {
      return data.results[0].artworkUrl100.replace("100x100bb", "600x600bb");
    }
  } catch {
    // ignore
  }
  return "";
}

// 1. Try Last.fm first (Works 100% Free with Spotify Free & Scrobbling)
async function getLastFmTrack(): Promise<TrackData | null> {
  if (!LASTFM_USERNAME || !LASTFM_API_KEY) return null;

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      LASTFM_USERNAME
    )}&api_key=${LASTFM_API_KEY}&format=json&limit=2`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const data = await res.json();
    const trackList = data?.recenttracks?.track;
    if (!trackList || (Array.isArray(trackList) && trackList.length === 0)) {
      return null;
    }

    const item = Array.isArray(trackList) ? trackList[0] : trackList;
    const isPlaying = item["@attr"]?.nowplaying === "true";
    const scrobbleUts = item.date?.uts ? parseInt(item.date.uts, 10) * 1000 : 0;
    const name = item.name;
    const artist =
      typeof item.artist === "object"
        ? item.artist["#text"] || item.artist.name || ""
        : String(item.artist || "");
    const album =
      typeof item.album === "object"
        ? item.album["#text"] || ""
        : String(item.album || "");

    // Last.fm image array
    let albumArt = "";
    if (Array.isArray(item.image)) {
      const extraLarge = item.image.find((i: any) => i.size === "extralarge");
      const large = item.image.find((i: any) => i.size === "large");
      albumArt = extraLarge?.["#text"] || large?.["#text"] || "";
    }

    // If Last.fm doesn't provide art, get high-res from iTunes
    if (!albumArt) {
      albumArt = await getAlbumArt(name, artist);
    }

    const trackUrl = item.url
      ? item.url
      : `https://open.spotify.com/search/${encodeURIComponent(`${name} ${artist}`)}`;

    const currentSaved = getSavedTrack();

    // CASE 1: Song is actively playing right now
    if (isPlaying) {
      const activeTrack: TrackData = {
        name,
        artist,
        album,
        albumArt,
        url: trackUrl,
        isPlaying: true,
        duration: 215000,
        progress: 35000,
        savedAt: Date.now(),
      };
      saveTrack(activeTrack);
      return activeTrack;
    }

    // CASE 2: Paused / Stopped
    // Check if Last.fm's most recent scrobble is newer than our recorded active track.
    // If user scrobbled a NEW track (scrobbleUts > savedAt), that becomes the last track.
    // Otherwise, the user played `currentSaved` more recently and paused it, so retain it.
    const isNewerScrobble = scrobbleUts > (currentSaved.savedAt || 0);

    if (isNewerScrobble) {
      const newScrobble: TrackData = {
        name,
        artist,
        album,
        albumArt,
        url: trackUrl,
        isPlaying: false,
        duration: 215000,
        progress: 0,
        savedAt: scrobbleUts,
      };
      saveTrack(newScrobble);
      return newScrobble;
    }

    // Retain the paused track indefinitely
    return {
      ...currentSaved,
      isPlaying: false,
    };
  } catch {
    return null;
  }
}

// 2. Try Spotify Official API (Works if owner has Spotify Premium)
async function getSpotifyTrack(): Promise<TrackData | null> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return null;

  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
      cache: "no-store",
    });

    if (!tokenRes.ok) return null;
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) return null;

    const headers = { Authorization: `Bearer ${tokenData.access_token}` };
    const nowPlayingRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers, cache: "no-store" }
    );

    if (nowPlayingRes.status === 200) {
      const data = await nowPlayingRes.json();
      if (data.item) {
        const spotTrack: TrackData = {
          name: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url || "",
          url: data.item.external_urls.spotify,
          isPlaying: data.is_playing,
          progress: data.progress_ms,
          duration: data.item.duration_ms,
          savedAt: Date.now(),
        };
        if (data.is_playing) {
          saveTrack(spotTrack);
        }
        return spotTrack;
      }
    }
  } catch {
    return null;
  }

  return null;
}

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET() {
  // Priority 1: Check Last.fm (Works for free without Premium!)
  const lastFmTrack = await getLastFmTrack();
  if (lastFmTrack) {
    return NextResponse.json(lastFmTrack, { headers: noCacheHeaders });
  }

  // Priority 2: Check Spotify official Player API (if Premium active)
  const spotifyTrack = await getSpotifyTrack();
  if (spotifyTrack) {
    return NextResponse.json(spotifyTrack, { headers: noCacheHeaders });
  }

  // Priority 3: Fallback to persistent saved track
  return NextResponse.json(getSavedTrack(), { headers: noCacheHeaders });
}

