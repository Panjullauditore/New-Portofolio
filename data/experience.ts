export interface Experience {
  id: string;
  type: "work" | "education" | "organization";
  institution: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string[];
  color: string;
  /**
   * Path gambar bukti / sertifikat / dokumentasi.
   * Contoh: "/images/experience/sertifikat-magang.jpg" (letakkan file di folder /public/images/experience/)
   * atau URL gambar dari internet (https://...).
   */
  proofImage?: string;
  /**
   * Keterangan singkat foto bukti / sertifikat
   * Contoh: "Sertifikat Kelulusan Fullstack Developer", "Dokumentasi Pekerjaan Proyek XYZ"
   */
  proofCaption?: string;
  /**
   * Tautan verifikasi eksternal (opsional)
   * Contoh: "https://cert.efset.org/xxx" atau link LinkedIn credential
   */
  proofUrl?: string;
}

/**
 * =====================================================================
 * EXPERIENCE & JOURNEY DATA
 * =====================================================================
 * Saat ini dikosongkan (Coming Soon) sesuai permintaan.
 * Anda dapat menambahkan riwayat pengalaman Anda sendiri kapan saja ke dalam array di bawah ini.
 *
 * CONTOH MENAMBAHKAN PENGALAMAN & BUKTI FOTO / SERTIFIKAT:
 * (Cukup uncomment dan ganti dengan data & foto Anda):
 *
 * export const experiences: Experience[] = [
 *   {
 *     id: "exp-1",
 *     type: "work", // "work" | "education" | "organization"
 *     institution: "Nama Perusahaan / Startup",
 *     role: "Frontend Developer",
 *     duration: "2024 — Sekarang",
 *     startDate: "2024-01",
 *     endDate: "present",
 *     description: [
 *       "Mengembangkan fitur antarmuka web modern dengan Next.js dan Tailwind CSS.",
 *       "Meningkatkan performa web dan kepuasan pengguna sebesar 35%.",
 *       "Berkolaborasi langsung dengan product manager dan UI/UX designer.",
 *     ],
 *     color: "#FFE925", // Warna Neo-Brutalism (#FFE925, #4D96FF, #6BCB77, #FF6B9D, #FF8C42)
 *     // 👇 KODE UNTUK MENARUH GAMBAR BUKTI / SERTIFIKAT 👇
 *     proofImage: "/images/experience/bukti-kerja.jpg", // Simpan gambar di folder public/images/experience/
 *     proofCaption: "Sertifikat Rekomendasi Kerja / Surat Keterangan Kerja",
 *     proofUrl: "https://linkedin.com/in/username", // Opsional
 *   },
 * ];
 * =====================================================================
 */
export const experiences: Experience[] = [];
