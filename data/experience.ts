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
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    type: "work",
    institution: "Tech Startup ABC",
    role: "Frontend Developer",
    duration: "2024 — Sekarang",
    startDate: "2024-01",
    endDate: "present",
    description: [
      "Membangun dan memelihara aplikasi web menggunakan React & Next.js",
      "Meningkatkan performa halaman utama hingga 40% (Lighthouse score)",
      "Berkolaborasi dengan tim desain untuk implementasi design system",
      "Mentoring 2 junior developer dalam best practices frontend",
    ],
    color: "#FFE925",
  },
  {
    id: "exp-2",
    type: "work",
    institution: "Digital Agency XYZ",
    role: "Junior Web Developer",
    duration: "2022 — 2024",
    startDate: "2022-06",
    endDate: "2024-01",
    description: [
      "Mengembangkan website klien menggunakan Vue.js dan WordPress",
      "Mengoptimasi SEO untuk 10+ website klien",
      "Membuat landing page responsive untuk kampanye digital",
    ],
    color: "#4D96FF",
  },
  {
    id: "exp-3",
    type: "education",
    institution: "Universitas Indonesia",
    role: "S1 Teknik Informatika",
    duration: "2018 — 2022",
    startDate: "2018-08",
    endDate: "2022-07",
    description: [
      "IPK: 3.75/4.00",
      "Tugas Akhir: Sistem Rekomendasi berbasis Machine Learning",
      "Aktif di komunitas coding dan hackathon",
    ],
    color: "#6BCB77",
  },
  {
    id: "exp-4",
    type: "organization",
    institution: "Google Developer Student Club",
    role: "Lead",
    duration: "2020 — 2021",
    startDate: "2020-08",
    endDate: "2021-07",
    description: [
      "Memimpin komunitas 100+ anggota aktif",
      "Mengorganisir 12+ workshop dan tech talk",
      "Menjalin kerja sama dengan industri untuk program mentoring",
    ],
    color: "#FF6B9D",
  },
];
