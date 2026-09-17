import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface ParsedLine {
  time: number; // in seconds
  text: string;
}

function parseLrc(lrcText: string): ParsedLine[] {
  if (!lrcText) return [];
  const lines = lrcText.split("\n");
  const result: ParsedLine[] = [];

  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

  for (const line of lines) {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const millis = parseInt(match[3].padEnd(3, "0").slice(0, 3), 10);
      const timeInSec = minutes * 60 + seconds + millis / 1000;
      const text = line.replace(timeRegex, "").trim();
      if (text) {
        result.push({ time: timeInSec, text });
      }
    }
  }

  return result.sort((a, b) => a.time - b.time);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const track = searchParams.get("track")?.trim();
  const artist = searchParams.get("artist")?.trim();

  if (!track || !artist) {
    return NextResponse.json(
      { found: false, error: "track and artist are required" },
      { status: 400 }
    );
  }

  // Clean track title (strip out "- Remastered", "(feat. ...)", "[From ...]")
  const cleanTrack = track
    .replace(/\s*-\s*Remastered.*/i, "")
    .replace(/\s*\(feat\..*?\)/i, "")
    .replace(/\s*\[.*?\]/g, "")
    .trim();

  // Clean artist (take primary artist before comma, feat, etc.)
  const cleanArtist = artist.split(/[,&]/)[0].trim();

  try {
    // 1. Try exact match from LRCLIB
    const getUrl = `https://lrclib.net/api/get?track_name=${encodeURIComponent(
      cleanTrack
    )}&artist_name=${encodeURIComponent(cleanArtist)}`;

    const directRes = await fetch(getUrl, {
      headers: {
        "User-Agent": "Portfolio-Lyrics-Widget (https://github.com/Panjullauditore/New-Portofolio)",
      },
      next: { revalidate: 3600 },
    });

    if (directRes.ok) {
      const data = await directRes.json();
      if (data && (data.syncedLyrics || data.plainLyrics)) {
        const parsedLines = data.syncedLyrics ? parseLrc(data.syncedLyrics) : [];
        return NextResponse.json({
          found: true,
          trackName: data.trackName || track,
          artistName: data.artistName || artist,
          isSynced: parsedLines.length > 0,
          syncedLyrics: data.syncedLyrics || null,
          plainLyrics: data.plainLyrics || null,
          lines: parsedLines,
        });
      }
    }

    // 2. If exact match fails, try fuzzy search from LRCLIB
    const searchUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(
      `${cleanTrack} ${cleanArtist}`
    )}`;

    const searchRes = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Portfolio-Lyrics-Widget (https://github.com/Panjullauditore/New-Portofolio)",
      },
      next: { revalidate: 3600 },
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (Array.isArray(searchData) && searchData.length > 0) {
        // Find best entry that has lyrics
        const best = searchData.find((item) => item.syncedLyrics || item.plainLyrics) || searchData[0];
        if (best && (best.syncedLyrics || best.plainLyrics)) {
          const parsedLines = best.syncedLyrics ? parseLrc(best.syncedLyrics) : [];
          return NextResponse.json({
            found: true,
            trackName: best.trackName || track,
            artistName: best.artistName || artist,
            isSynced: parsedLines.length > 0,
            syncedLyrics: best.syncedLyrics || null,
            plainLyrics: best.plainLyrics || null,
            lines: parsedLines,
          });
        }
      }
    }

    // 3. Not found in LRCLIB
    return NextResponse.json({
      found: false,
      trackName: track,
      artistName: artist,
      message: "Lirik belum tersedia untuk lagu ini",
    });
  } catch (error: any) {
    console.error("Lyrics API error:", error);
    return NextResponse.json(
      { found: false, error: "Gagal mengambil data lirik" },
      { status: 500 }
    );
  }
}
