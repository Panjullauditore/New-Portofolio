import { NextResponse } from "next/server";

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
    )}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

    const res = await fetch(url, { cache: "no-store" });
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

    return {
      name,
      artist,
      album,
      albumArt,
      url: trackUrl,
      isPlaying,
      duration: 215000,
      progress: isPlaying ? 35000 : 0,
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
        return {
          name: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url || "",
          url: data.item.external_urls.spotify,
          isPlaying: data.is_playing,
          progress: data.progress_ms,
          duration: data.item.duration_ms,
        };
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

  // Priority 3: Fallback track
  return NextResponse.json(DEFAULT_TRACK, { headers: noCacheHeaders });
}
