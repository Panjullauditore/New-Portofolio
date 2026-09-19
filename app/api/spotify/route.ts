import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Configuration for Spotify and Last.fm
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

declare global {
  // eslint-disable-next-line no-var
  var __lastActiveSpotifyTrack: (TrackData & { timestamp: number }) | undefined;
}

interface TrackData {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
  duration?: number;
  progress?: number;
  timestamp?: number;
}

const DEFAULT_TRACK: TrackData = {
  name: "ANTHEM JAWIR",
  artist: "Tenxi",
  album: "Liga Besar",
  albumArt: "https://lastfm-img.freetls.fastly.net/i/u/300x300/b5cbc16f6001a599752e323287e30ab9.jpg",
  url: "https://open.spotify.com/search/ANTHEM%20JAWIR%20Tenxi",
  isPlaying: false,
};

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
    )}&api_key=${LASTFM_API_KEY}&format=json&limit=1&_t=${Date.now()}`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const trackList = data?.recenttracks?.track;
    if (!trackList || (Array.isArray(trackList) && trackList.length === 0)) {
      return null;
    }

    const item = Array.isArray(trackList) ? trackList[0] : trackList;
    const isPlaying = item["@attr"]?.nowplaying === "true";
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

    const scrobbleUts = item.date?.uts ? parseInt(item.date.uts, 10) * 1000 : 0;

    if (isPlaying) {
      const activeTrack: TrackData & { timestamp: number } = {
        name,
        artist,
        album,
        albumArt,
        url: trackUrl,
        isPlaying: true,
        duration: 215000,
        progress: 35000,
        timestamp: Date.now(),
      };
      globalThis.__lastActiveSpotifyTrack = activeTrack;
      return activeTrack;
    }

    // When paused/offline: Last.fm drops uncompleted nowplaying tracks and falls back to previous scrobbles.
    // If we have a retained active track that played more recently than this scrobble, keep it as OFFLINE!
    const cached = globalThis.__lastActiveSpotifyTrack;
    if (cached && cached.timestamp > scrobbleUts) {
      return {
        ...cached,
        isPlaying: false,
      };
    }

    // Otherwise, the incoming scrobble is newer or we don't have a cached track
    const offlineTrack: TrackData & { timestamp: number } = {
      name,
      artist,
      album,
      albumArt,
      url: trackUrl,
      isPlaying: false,
      duration: 215000,
      progress: 0,
      timestamp: scrobbleUts || Date.now(),
    };
    globalThis.__lastActiveSpotifyTrack = offlineTrack;
    return offlineTrack;
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
        const isPlaying = data.is_playing;
        const track: TrackData & { timestamp: number } = {
          name: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url || "",
          url: data.item.external_urls.spotify,
          isPlaying,
          progress: data.progress_ms,
          duration: data.item.duration_ms,
          timestamp: Date.now(),
        };
        if (isPlaying) {
          globalThis.__lastActiveSpotifyTrack = track;
        }
        return track;
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

  // Priority 3: Retained cache or Fallback track
  if (globalThis.__lastActiveSpotifyTrack) {
    return NextResponse.json({ ...globalThis.__lastActiveSpotifyTrack, isPlaying: false }, { headers: noCacheHeaders });
  }

  return NextResponse.json(DEFAULT_TRACK, { headers: noCacheHeaders });
}
