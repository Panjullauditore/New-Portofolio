export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  category: "Web" | "Mobile" | "Design" | string;
  featured?: boolean;
  color: string; // e.g. "#FFE925", "#4D96FF", "#6BCB77", "#FF6B9D"
}

/**
 * =====================================================================
 * FEATURED PROJECTS DATA
 * =====================================================================
 * Saat ini dikosongkan (Coming Soon) sesuai permintaan.
 * Anda dapat menambahkan proyek Anda sendiri kapan saja ke dalam array di bawah ini.
 *
 * CONTOH STRUKTUR PROYEK (Cukup uncomment dan sesuaikan data Anda):
 *
 * export const projects: Project[] = [
 *   {
 *     id: "nama-proyek-1",
 *     title: "Nama Proyek Keren",
 *     description: "Deskripsi singkat proyek untuk ditampilkan pada kartu.",
 *     longDescription: "Deskripsi lengkap arsitektur dan solusi yang muncul di modal detail.",
 *     thumbnail: "/projects/nama-gambar.jpg", // Taruh gambar di folder /public/projects/
 *     techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
 *     demoUrl: "https://demo-proyek.vercel.app", // Opsional (kosongkan jika belum ada)
 *     repoUrl: "https://github.com/username/proyek", // Opsional
 *     category: "Web", // "Web" | "Mobile" | "Design"
 *     featured: true, // true untuk memberi badge FEATURED
 *     color: "#FFE925", // Warna Neo-Brutalism header kartu
 *   },
 * ];
 * =====================================================================
 */
export const projects: Project[] = [];

export const projectCategories = ["All", "Web", "Mobile", "Design"];
