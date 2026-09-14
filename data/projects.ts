export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  category: string;
  featured?: boolean;
  color: string;
}

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce platform dengan fitur keranjang, pembayaran, dan dashboard admin. Dibangun untuk memberikan pengalaman belanja yang seamless.",
    longDescription: "Platform e-commerce modern berskala penuh yang dirancang untuk performa tinggi dan konversi optimal. Dilengkapi manajemen inventaris real-time, integrasi gateway pembayaran Stripe berstandar PCI-DSS, sistem autentikasi aman, serta dashboard analytics untuk memantau performa penjualan dan produk terlaris.",
    thumbnail: "/projects/ecommerce.jpg",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    demoUrl: "https://demo-ecommerce.vercel.app",
    repoUrl: "https://github.com/ahmadfahrezi/ecommerce",
    category: "Web",
    featured: true,
    color: "#FFE925",
  },
  {
    id: "task-management",
    title: "Task Management App",
    description: "Aplikasi manajemen tugas real-time dengan drag-and-drop, kolaborasi tim, dan notifikasi. Inspired by Trello & Notion.",
    longDescription: "Aplikasi produktivitas berbasis papan Kanban interaktif dengan sinkronisasi multi-user secara instan via WebSockets. Menyediakan fitur filter prioritas cerdas, estimasi waktu, pelacakan riwayat aktivitas, dan integrasi webhook untuk alur kerja tim modern.",
    thumbnail: "/projects/taskapp.jpg",
    techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind"],
    demoUrl: "https://demo-taskapp.vercel.app",
    repoUrl: "https://github.com/ahmadfahrezi/taskapp",
    category: "Web",
    featured: true,
    color: "#4D96FF",
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Dashboard cuaca interaktif dengan visualisasi data, prakiraan 7 hari, dan lokasi GPS otomatis.",
    longDescription: "Visualisasi data meteorologi komprehensif yang menampilkan grafik perubahan suhu per jam, indeks UV, kelembapan, kecepatan angin, serta radar presipitasi interaktif berbasis D3.js dengan dukungan geolokasi otomatis dan penyimpanan preferensi kota favorit.",
    thumbnail: "/projects/weather.jpg",
    techStack: ["Vue.js", "D3.js", "OpenWeather API", "CSS3"],
    demoUrl: "https://demo-weather.vercel.app",
    repoUrl: "https://github.com/ahmadfahrezi/weather",
    category: "Web",
    color: "#6BCB77",
  },
  {
    id: "portfolio-design",
    title: "Portfolio Design System",
    description: "Design system lengkap dengan komponen reusable, token desain, dan dokumentasi. Dibangun untuk konsistensi visual.",
    longDescription: "Sistem desain komprehensif yang mencakup 50+ komponen UI modular, pedoman tipografi dan palet warna kontras tinggi, token desain otomatis via Figma Tokens, serta dokumentasi interaktif Storybook yang ramah aksesibilitas (WCAG AAA compliant).",
    thumbnail: "/projects/design.jpg",
    techStack: ["Figma", "Storybook", "React", "Styled Components"],
    demoUrl: "https://demo-design.vercel.app",
    repoUrl: "https://github.com/ahmadfahrezi/design-system",
    category: "Design",
    featured: true,
    color: "#FF6B9D",
  },
  {
    id: "chat-app",
    title: "Real-Time Chat App",
    description: "Aplikasi chat real-time dengan fitur grup, emoji, file sharing, dan enkripsi end-to-end.",
    longDescription: "Aplikasi perpesanan instan cross-platform (iOS & Android) dengan enkripsi end-to-end Signal Protocol, fitur panggilan audio/video peer-to-peer via WebRTC, ruang obrolan grup dengan peran admin, dan media preview.",
    thumbnail: "/projects/chat.jpg",
    techStack: ["React Native", "Firebase", "TypeScript", "WebRTC"],
    demoUrl: "https://demo-chat.vercel.app",
    repoUrl: "https://github.com/ahmadfahrezi/chatapp",
    category: "Mobile",
    color: "#FF8C42",
  },
  {
    id: "ai-image-generator",
    title: "AI Image Generator",
    description: "Web app untuk generate gambar menggunakan AI dengan prompt engineering, style transfer, dan gallery.",
    longDescription: "Platform pembuatan gambar bertenaga AI dengan pipeline asinkronus menggunakan FastAPI dan Celery. Menawarkan panduan prompt interaktif, pemilihan filter gaya artistik, opsi variasi gambar, serta galeri publik dengan voting komunitas.",
    thumbnail: "/projects/aigenerator.jpg",
    techStack: ["Python", "FastAPI", "React", "Stable Diffusion", "Docker"],
    demoUrl: "https://demo-aigen.vercel.app",
    repoUrl: "https://github.com/ahmadfahrezi/ai-image",
    category: "Web",
    color: "#B388FF",
  },
];

export const projectCategories = ["All", "Web", "Mobile", "Design"];
