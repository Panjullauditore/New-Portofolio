/**
 * Spotify Refresh Token Generator
 * 
 * Jalankan: node scripts/get-spotify-token.js
 * 
 * Skrip ini akan membuka server lokal sementara di port 8888,
 * memberikan tautan izin login Spotify, dan secara otomatis
 * menukar authorization code menjadi Refresh Token permanen.
 */

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-read-recently-played user-top-read";

const envPath = path.join(__dirname, "..", ".env.local");

function readEnv() {
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let val = match[2] || "";
        val = val.trim().replace(/^["']|["']$/g, "");
        env[match[1]] = val;
      }
    }
  }
  return env;
}

function updateEnv(key, value) {
  let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const regex = new RegExp(`^${key}=.*$`, "m");
  if (regex.test(content)) {
    content = content.replace(regex, `${key}=${value}`);
  } else {
    content += (content.endsWith("\n") ? "" : "\n") + `${key}=${value}\n`;
  }
  fs.writeFileSync(envPath, content);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("\n========================================================");
  console.log("   🎧 SPOTIFY REFRESH TOKEN GENERATOR — NEO BRUTALISM   ");
  console.log("========================================================\n");

  const env = readEnv();
  let clientId = env.SPOTIFY_CLIENT_ID || "";
  let clientSecret = env.SPOTIFY_CLIENT_SECRET || "";

  if (!clientId) {
    clientId = await question("1. Masukkan Spotify CLIENT ID: ");
    clientId = clientId.trim();
  } else {
    console.log(`✓ Menggunakan CLIENT ID dari .env.local: ${clientId.substring(0, 6)}...`);
  }

  if (!clientSecret) {
    clientSecret = await question("2. Masukkan Spotify CLIENT SECRET: ");
    clientSecret = clientSecret.trim();
  } else {
    console.log(`✓ Menggunakan CLIENT SECRET dari .env.local: ${clientSecret.substring(0, 6)}...`);
  }

  if (!clientId || !clientSecret) {
    console.error("❌ Client ID dan Client Secret wajib diisi!");
    rl.close();
    process.exit(1);
  }

  console.log("\n--------------------------------------------------------");
  console.log("⚠️  PENTING: Di Spotify Developer Dashboard Anda:");
  console.log(`   Pastikan Redirect URI berikut telah ditambahkan:`);
  console.log(`   👉 ${REDIRECT_URI}`);
  console.log("--------------------------------------------------------\n");

  // Start local server to receive authorization code
  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/callback") {
      const code = parsedUrl.query.code;
      const error = parsedUrl.query.error;

      if (error) {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<h1>❌ Gagal: ${error}</h1><p>Silakan coba kembali di terminal.</p>`);
        console.error(`\n❌ Error dari Spotify: ${error}`);
        server.close();
        rl.close();
        return;
      }

      if (code) {
        try {
          // Exchange code for tokens
          const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
          const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              Authorization: `Basic ${basic}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              code: code,
              redirect_uri: REDIRECT_URI,
            }),
          });

          const tokenData = await tokenRes.json();

          if (tokenData.error) {
            throw new Error(tokenData.error_description || tokenData.error);
          }

          const refreshToken = tokenData.refresh_token;

          // Save to .env.local
          updateEnv("SPOTIFY_CLIENT_ID", clientId);
          updateEnv("SPOTIFY_CLIENT_SECRET", clientSecret);
          updateEnv("SPOTIFY_REFRESH_TOKEN", refreshToken);

          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(`
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>Spotify Connected</title>
              <style>
                body { font-family: sans-serif; background: #FFF8E7; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .box { background: #fff; border: 4px solid #1A1A2E; box-shadow: 8px 8px 0 #1A1A2E; padding: 40px; text-align: center; max-width: 480px; }
                h1 { color: #1DB954; font-size: 28px; margin-bottom: 12px; }
                p { font-size: 16px; color: #333; line-height: 1.5; }
              </style>
            </head>
            <body>
              <div class="box">
                <h1>✅ Spotify Berhasil Terhubung!</h1>
                <p>Refresh Token telah otomatis disimpan ke file <b>.env.local</b> Anda.</p>
                <p>Anda dapat menutup halaman ini sekarang dan kembali ke terminal.</p>
              </div>
            </body>
            </html>
          `);

          console.log("\n🎉 BERHASIL!");
          console.log("========================================================");
          console.log("Refresh Token didapatkan:");
          console.log(`\x1b[32m${refreshToken}\x1b[0m`);
          console.log("========================================================");
          console.log("✓ Kredensial telah otomatis disimpan ke .env.local!");
          console.log("✓ Widget Spotify Anda kini sudah live dan siap menampilkan musik real-time.\n");

          setTimeout(() => {
            server.close();
            rl.close();
            process.exit(0);
          }, 1000);
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
          res.end(`<h1>❌ Gagal Menukar Token</h1><p>${err.message}</p>`);
          console.error("\n❌ Gagal menukar code menjadi refresh token:", err.message);
          server.close();
          rl.close();
          process.exit(1);
        }
      }
    }
  });

  server.listen(PORT, "127.0.0.1", () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;

    console.log("3. Buka tautan berikut di browser Anda untuk otorisasi:\n");
    console.log(`\x1b[36m${authUrl}\x1b[0m\n`);
    console.log("Menunggu otorisasi dari browser... (tekan Ctrl+C untuk membatalkan)");
  });
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
