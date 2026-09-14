# Product Requirements Document (PRD)
## Website Portofolio Pribadi — Tema Neo Brutalism

| | |
|---|---|
| **Dokumen** | PRD Website Portofolio |
| **Versi** | 1.0 |
| **Tanggal** | 15 September 2026 |
| **Status** | Draft |

---

## 1. Latar Belakang & Tujuan

### 1.1 Latar Belakang
Dibutuhkan sebuah website portofolio pribadi yang menampilkan identitas diri, karya, dan pengalaman dengan gaya visual yang berani dan berkarakter, yaitu **neo brutalism**. Website ini akan menjadi representasi digital utama untuk keperluan personal branding, melamar kerja/freelance, dan showcase karya.

### 1.2 Tujuan Produk
- Menampilkan profil diri, keahlian, proyek, dan pengalaman secara menarik dan mudah diakses.
- Memberikan kemudahan bagi pengunjung (recruiter, klien, kolega) untuk mengunduh CV secara langsung.
- Menunjukkan sisi personal/hobi melalui integrasi Spotify (musik yang sedang/baru didengarkan).
- Membangun kesan pertama yang kuat lewat gaya desain neo brutalism yang unik dan berbeda dari template portofolio pada umumnya.

### 1.3 Target Pengguna
- **Primer:** Recruiter, HR, hiring manager, klien freelance.
- **Sekunder:** Sesama developer/designer, komunitas, pengunjung umum (jaringan profesional/sosial media).

---

## 2. Ruang Lingkup (Scope)

### 2.1 Termasuk dalam Scope (In-Scope)
1. Landing page / Hero section
2. Halaman/section "Tentang Saya"
3. Section Skills / Keahlian
4. Section Proyek / Portofolio Karya
5. Section Pengalaman (kerja/organisasi/pendidikan)
6. Fitur Download CV
7. Integrasi Spotify (now playing / top tracks)
8. Section Kontak
9. Responsive design (mobile, tablet, desktop)
10. Dark/Light mode (opsional, disesuaikan dengan gaya neo brutalism)

### 2.2 Di Luar Scope (Out of Scope) — versi 1.0
- Blog/CMS penuh (bisa jadi fase berikutnya)
- Multi-bahasa (i18n)
- Dashboard admin custom (pengelolaan konten via CMS headless jika diperlukan, bukan dari nol)
- Sistem login/autentikasi pengunjung

---

## 3. Fitur & Kebutuhan Fungsional

### 3.1 Hero Section
- Menampilkan nama, tagline/peran (contoh: "Frontend Developer & Designer"), dan CTA (Call-to-Action) seperti "Lihat Proyek" atau "Download CV".
- Elemen visual bold: warna kontras tinggi, border tebal, tanpa gradient/shadow halus khas neo brutalism.

### 3.2 Tentang Saya (About)
- Foto/avatar diri.
- Deskripsi singkat (bio) — latar belakang, minat, dan value proposition.
- Highlight fakta singkat (opsional): lokasi, pendidikan, status kerja.

### 3.3 Skills / Keahlian
- Daftar skill teknis & non-teknis dalam bentuk badge/kartu bergaya brutalism (kotak tebal, warna solid).
- Bisa dikelompokkan: Frontend, Backend, Tools, Soft Skills, dsb.

### 3.4 Proyek / Portofolio
- Grid/list kartu proyek berisi: thumbnail, judul, deskripsi singkat, tech stack, link demo & repo.
- Filter kategori (opsional): Web, Mobile, Design, dll.
- Detail proyek bisa berupa modal atau halaman terpisah.

### 3.5 Pengalaman (Experience)
- Timeline pengalaman kerja/organisasi/pendidikan.
- Format: nama institusi, peran, durasi, deskripsi singkat pencapaian.

### 3.6 Fitur Download CV
**Kebutuhan Fungsional:**
- Tombol "Download CV" yang mudah ditemukan (hero section & navbar/footer).
- File CV dalam format PDF.
- Klik tombol langsung memicu unduhan file (bukan membuka tab baru yang membingungkan) atau menampilkan preview dengan opsi download.
- (Opsional) Tracking jumlah klik download untuk analitik sederhana.

**Kriteria Penerimaan:**
- File CV dapat diunduh dalam 1 klik.
- Ukuran file dioptimalkan (< 2MB) agar cepat diunduh.
- Nama file jelas, contoh: `CV-NamaLengkap-2026.pdf`.

### 3.7 Integrasi Spotify
**Kebutuhan Fungsional:**
- Menampilkan widget "Now Playing" — lagu yang sedang didengarkan secara real-time.
- Fallback: jika sedang tidak mendengarkan, tampilkan "Recently Played" atau "Top Tracks".
- Menampilkan: cover album, judul lagu, nama artis, progress bar (opsional), link ke Spotify.

**Kebutuhan Teknis:**
- Menggunakan **Spotify Web API** dengan OAuth 2.0 (Authorization Code Flow).
- Karena token expired, perlu refresh token yang disimpan aman di backend/serverless function (bukan di client-side agar credential tidak bocor).
- Endpoint yang relevan: `Get Currently Playing Track`, `Get Recently Played Tracks`, `Get User's Top Items`.
- Update data secara berkala (polling setiap 30-60 detik) atau saat halaman dimuat.

**Kriteria Penerimaan:**
- Widget menampilkan data akurat sesuai aktivitas Spotify pemilik akun.
- Jika API gagal/tidak ada lagu yang diputar, tampilkan state kosong yang tetap estetik (bukan error mentah).

### 3.8 Kontak
- Form kontak sederhana (nama, email, pesan) atau langsung link ke email/WhatsApp/LinkedIn.
- Ikon sosial media dengan gaya kotak tebal khas neo brutalism.

---

## 4. Kebutuhan Desain (UI/UX) — Neo Brutalism

Gaya neo brutalism dicirikan oleh:
- **Warna:** Kontras tinggi, warna solid/cerah (kuning, merah, biru, hitam-putih), minim gradasi.
- **Tipografi:** Font tebal (bold), ukuran besar, kadang monospace atau font "kasar" yang mencolok.
- **Border & Shadow:** Border hitam tebal (2-4px), hard shadow (offset shadow tanpa blur) — bukan soft shadow.
- **Layout:** Grid asimetris, elemen terkesan "kasar"/tidak sempurna secara sengaja, namun tetap terstruktur.
- **Interaksi:** Hover/klik dengan efek tegas (misal tombol "menekan" saat diklik — shadow hilang, elemen bergeser).
- **Ikon & Ilustrasi:** Flat, bold outline, tanpa efek 3D berlebihan.

---

## 5. Kebutuhan Non-Fungsional

| Kategori | Kebutuhan |
|---|---|
| **Performa** | Lighthouse score ≥ 90 (Performance, Accessibility, Best Practices, SEO) |
| **Responsivitas** | Tampil optimal di mobile, tablet, dan desktop |
| **Aksesibilitas** | Kontras warna tetap memenuhi standar WCAG meski bergaya bold; navigasi keyboard-friendly |
| **SEO** | Meta tag, Open Graph untuk share di sosial media |
| **Keamanan** | Credential Spotify API (client secret, refresh token) tidak boleh terekspos di frontend |
| **Maintainability** | Konten (proyek, skill, pengalaman) mudah diperbarui, idealnya via file config/CMS ringan |

---

## 6. Usulan Tech Stack (Rekomendasi)

| Layer | Opsi |
|---|---|
| Frontend | React / Next.js (mendukung SSR untuk SEO & API routes untuk Spotify) |
| Styling | Tailwind CSS (custom theme neo brutalism) |
| Backend/API | Next.js API Routes / Vercel Serverless Functions (untuk proxy Spotify API) |
| Hosting | Vercel / Netlify |
| Manajemen Konten | JSON/Markdown lokal, atau headless CMS ringan (opsional) |

---

## 7. User Stories

1. **Sebagai recruiter**, saya ingin melihat ringkasan diri dan proyek kandidat dengan cepat, agar saya bisa menilai kecocokan dalam waktu singkat.
2. **Sebagai recruiter**, saya ingin mengunduh CV dalam format PDF dengan satu klik, agar saya bisa menyimpannya untuk proses rekrutmen.
3. **Sebagai pengunjung**, saya ingin melihat musik yang sedang didengarkan pemilik portofolio, agar saya mendapat kesan personal tentang kepribadiannya.
4. **Sebagai pemilik website**, saya ingin memperbarui daftar proyek/pengalaman dengan mudah tanpa harus mengubah kode secara signifikan.

---

## 8. Metrik Keberhasilan (Success Metrics)

- Jumlah unduhan CV per bulan.
- Waktu rata-rata pengunjung di halaman (engagement).
- Skor performa web (Core Web Vitals).
- Jumlah klik ke link proyek/demo.
- Feedback kualitatif dari recruiter/klien.

---

## 9. Risiko & Asumsi

| Risiko | Mitigasi |
|---|---|
| Spotify API rate limit / downtime | Implementasi caching & fallback state |
| Refresh token Spotify expired/dicabut | Buat mekanisme re-autentikasi manual oleh pemilik |
| Gaya neo brutalism mengurangi keterbacaan | Uji aksesibilitas & kontras warna sebelum rilis |
| CV perlu sering diperbarui | Sediakan proses upload/update file CV yang mudah |

**Asumsi:**
- Pemilik website memiliki akun Spotify aktif yang akan dihubungkan sebagai sumber data.
- CV disediakan dalam format PDF final oleh pemilik.

---

## 10. Roadmap / Milestone (Usulan)

| Fase | Deliverable | Estimasi |
|---|---|---|
| 1 | Setup project, desain UI/UX neo brutalism (wireframe & style guide) | 1 minggu |
| 2 | Implementasi Hero, About, Skills, Experience | 1 minggu |
| 3 | Implementasi Proyek & fitur Download CV | 3-5 hari |
| 4 | Integrasi Spotify API (now playing/top tracks) | 3-5 hari |
| 5 | Responsive testing, optimasi performa & SEO | 3-5 hari |
| 6 | Deploy & QA akhir | 2-3 hari |

---

## 11. Catatan Tambahan
Dokumen ini adalah draft awal (v1.0). Beberapa asumsi diambil untuk melengkapi PRD secara menyeluruh — silakan sesuaikan bagian scope, tech stack, atau detail fitur Spotify (misalnya ingin menampilkan playlist favorit, bukan hanya now playing) sesuai kebutuhan spesifik Anda.
