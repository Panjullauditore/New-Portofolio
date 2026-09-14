# Panduan Integrasi Spotify Live Widget 🎧

Website portofolio ini sudah siap menampilkan musik yang sedang Anda dengarkan di Spotify secara live (real-time). Jika kredensial belum diset, widget akan otomatis menggunakan data simulasi (mock data) sehingga tampilan tetap estetik.

Ikuti langkah-langkah di bawah untuk menghubungkan akun Spotify asli Anda:

---

## Langkah 1: Buat Aplikasi di Spotify Developer Dashboard

1. Buka [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Login dengan akun Spotify Anda.
3. Klik tombol **"Create App"**.
4. Isi informasi aplikasi:
   - **App Name**: `Portfolio Widget` (atau nama apa saja)
   - **App Description**: `Now Playing widget for my portfolio`
   - **Redirect URIs**: Tambahkan `http://localhost:3000/api/spotify/callback` dan `https://developer.spotify.com/`
   - Centang persetujuan Terms of Service, lalu klik **"Save"**.
5. Di halaman detail aplikasi, buka tab **"Settings"**.
6. Salin **Client ID** dan klik **"View client secret"** untuk menyalin **Client Secret**.

---

## Langkah 2: Dapatkan Authorization Code & Refresh Token

1. Buka URL berikut di browser Anda (ganti `<YOUR_CLIENT_ID>` dengan Client ID Anda):

```
https://accounts.spotify.com/authorize?client_id=<YOUR_CLIENT_ID>&response_type=code&redirect_uri=https://developer.spotify.com/&scope=user-read-currently-playing%20user-read-recently-played%20user-top-read
```

2. Klik **"Agree"** pada dialog persetujuan Spotify.
3. Anda akan dialihkan ke halaman dengan URL seperti ini:
   `https://developer.spotify.com/?code=AQD...`
4. Salin kode yang ada setelah `?code=` (semua karakter sampai akhir URL, tanpa `&` jika ada). Ini adalah **AUTHORIZATION_CODE** Anda.

5. Buka terminal (PowerShell atau Bash) dan jalankan perintah cURL berikut untuk menukar code menjadi **Refresh Token** (ganti `<CLIENT_ID>`, `<CLIENT_SECRET>`, dan `<AUTHORIZATION_CODE>`):

### Menggunakan PowerShell:
```powershell
$clientId = "YOUR_CLIENT_ID"
$clientSecret = "YOUR_CLIENT_SECRET"
$authHeader = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${clientId}:${clientSecret}"))
$body = @{
    grant_type = "authorization_code"
    code = "YOUR_AUTHORIZATION_CODE"
    redirect_uri = "https://developer.spotify.com/"
}

$response = Invoke-RestMethod -Uri "https://accounts.spotify.com/api/token" -Method Post -Headers @{ Authorization = "Basic $authHeader" } -Body $body -ContentType "application/x-www-form-urlencoded"
$response.refresh_token
```

### Atau menggunakan cURL (Bash):
```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<CLIENT_ID>:<CLIENT_SECRET>" \
  -d "grant_type=authorization_code" \
  -d "code=<AUTHORIZATION_CODE>" \
  -d "redirect_uri=https://developer.spotify.com/"
```

6. Dari respons JSON yang didapat, salin nilai `refresh_token`.

---

## Langkah 3: Konfigurasi di File `.env.local`

Buka file `.env.local` di folder root project:

```env
SPOTIFY_CLIENT_ID=masukkan_client_id_anda
SPOTIFY_CLIENT_SECRET=masukkan_client_secret_anda
SPOTIFY_REFRESH_TOKEN=masukkan_refresh_token_anda
```

Simpan file `.env.local`. 

---

## Langkah 4: Uji Coba

1. Putar lagu apa saja di Spotify (desktop / HP / web player).
2. Buka `http://localhost:3000` di browser.
3. Scroll ke bagian **Spotify Widget** — lagu yang sedang diputar, nama album, cover album, equalizer animasi, dan link Spotify akan langsung tampil secara real-time! 🎵
