export type Language = "en" | "id";

export interface TranslationDictionary {
  navbar: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    contact: string;
    downloadCv: string;
    cvFileName: string;
  };
  hero: {
    greeting: string;
    roles: string[];
    bio: string;
    viewProjects: string;
    downloadCv: string;
    scrollDown: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    facts: {
      location: { label: string; value: string };
      education: { label: string; value: string };
      status: { label: string; value: string };
      experience: { label: string; value: string };
    };
    storyP1: string;
    storyP2: string;
    storyP3: string;
    currentFocusTitle: string;
    currentFocusItems: string[];
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    skillsCountSuffix: string;
    categories: {
      frontend: string;
      backend: string;
      tools: string;
      softSkills: string;
    };
    softSkillsList: Record<string, string>;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterWeb: string;
    filterMobile: string;
    filterDesign: string;
    categories: {
      web: string;
      mobile: string;
      design: string;
    };
    viewDetails: string;
    liveDemo: string;
    sourceCode: string;
    featured: string;
    modal: {
      problem: string;
      solution: string;
      keyFeatures: string;
      technologies: string;
      close: string;
      backToProjects: string;
    };
    comingSoon: {
      badge: string;
      title: string;
      description: string;
      hint: string;
    };
    items: {
      id: string;
      title: string;
      description: string;
      longDescription: string;
      problem: string;
      solution: string;
      keyFeatures: string[];
    }[];
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
    comingSoon: {
      badge: string;
      title: string;
      description: string;
      hint: string;
    };
    proofBadge: string;
    viewProof: string;
    closeProof: string;
    viewCredentialUrl: string;
    typeLabels: {
      work: string;
      education: string;
      organization: string;
    };
    items: {
      period: string;
      role: string;
      company: string;
      location: string;
      description: string;
      achievements: string[];
      technologies?: string[];
    }[];
  };
  spotify: {
    nowPlaying: string;
    recentlyPlayed: string;
    onSpotify: string;
    offline: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    form: {
      formTitle: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      submittingBtn: string;
      sendAnother: string;
      successAlert: string;
      errorAlert: string;
    };
    directHeading: string;
    socialConnect: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    downloadCv: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    navbar: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      downloadCv: "Download CV",
      cvFileName: "CV-Ahmad-Fahrezi-2026.pdf",
    },
    hero: {
      greeting: "👋 Hi, I am",
      roles: [
        "Fullstack Developer",
        "Backend & Frontend Engineer",
        "Creative Coder",
        "Problem Solver",
      ],
      bio: "Passionate fullstack developer engineering scalable web applications, robust backend architectures, and pixel-perfect digital interfaces. Skilled across modern frontend, server-side frameworks, and database engineering.",
      viewProjects: "View Projects",
      downloadCv: "Download CV",
      scrollDown: "Scroll down",
    },
    about: {
      badge: "01 About Me",
      title: "Fullstack Developer & Digital Craftsman",
      subtitle:
        "Crafting modern, responsive & user-centric digital experiences with high visual fidelity and robust backend foundations.",
      facts: {
        location: { label: "Location", value: "Semarang, ID" },
        education: { label: "Education", value: "B.S. in CS - Undip" },
        status: { label: "Status", value: "Open to Work / Collab" },
        experience: { label: "Experience", value: "2.5 Years" },
      },
      storyP1:
        "I am a fullstack developer based in Semarang, Indonesia, holding a Bachelor's degree in Computer Science from Diponegoro University (Undip). Skilled across modern frontend engineering, robust backend services, databases, and bold interactive web aesthetics.",
      storyP2:
        "My journey began with basic web experiments and has evolved into building scalable full-stack web applications, rich design systems, and fluid digital interfaces.",
      storyP3:
        "I believe software should not only work reliably under the hood, but also surprise and delight users through thoughtful micro-interactions and tactile feedback.",
      currentFocusTitle: "Current Tech Focus",
      currentFocusItems: [
        "Next.js & React Fullstack Ecosystem",
        "Laravel, Node.js & RESTful APIs",
        "MySQL, Prisma ORM & Database Architecture",
        "Tailwind CSS, TypeScript & UI Systems",
      ],
    },
    skills: {
      badge: "02 Skills & Tech Stack",
      title: "Tools of the Craft",
      subtitle:
        "The languages, frameworks, and tools I use to turn ambitious concepts into reality.",
      skillsCountSuffix: "skills",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        tools: "Tools & DevOps",
        softSkills: "Soft Skills",
      },
      softSkillsList: {
        "Problem Solving": "Problem Solving",
        "Team Work": "Team Work",
        "Communication": "Communication",
        "Leadership": "Leadership",
        "Agile/Scrum": "Agile/Scrum",
      },
    },
    projects: {
      badge: "03 Featured Projects",
      title: "Handcrafted Digital Products",
      subtitle:
        "A curated selection of web applications, platforms, and interactive experiences I've engineered.",
      filterAll: "All",
      filterWeb: "Web",
      filterMobile: "Mobile",
      filterDesign: "Design",
      categories: {
        web: "Web",
        mobile: "Mobile",
        design: "Design",
      },
      viewDetails: "View Details",
      liveDemo: "Live Demo",
      sourceCode: "Source Code",
      featured: "FEATURED",
      comingSoon: {
        badge: "COMING SOON",
        title: "Featured Projects Under Construction",
        description:
          "I am currently preparing, curating, and polishing my latest web applications, client solutions, and open-source experiments. Projects will appear here shortly!",
        hint: "Fill in your real projects anytime in data/projects.ts",
      },
      modal: {
        problem: "The Challenge",
        solution: "The Solution & Architecture",
        keyFeatures: "Key Highlights",
        technologies: "Technologies Used",
        close: "Close",
        backToProjects: "Back to Projects",
      },
      items: [
        {
          id: "ecommerce-platform",
          title: "E-Commerce Platform",
          description:
            "Full-stack e-commerce platform with real-time cart, secure checkout, and interactive admin metrics.",
          longDescription:
            "A full-scale modern e-commerce platform engineered for high conversion and blazing speed. Features real-time inventory management, PCI-DSS compliant Stripe checkout, role-based auth, and deep sales analytics.",
          problem:
            "Traditional e-commerce templates often suffer from sluggish page transitions, cluttered UI, and high cart abandonment during checkout.",
          solution:
            "Built with Next.js Server Components for sub-second loads, Prisma ORM with PostgreSQL for reliable inventory consistency, and an ultra-clean Neo-Brutalist checkout experience.",
          keyFeatures: [
            "End-to-end Stripe payment intent flow with instant webhooks",
            "Real-time stock reservation and low-inventory alerts",
            "Comprehensive Admin dashboard with revenue analytics",
            "Fully responsive and mobile-optimized cart drawer",
          ],
        },
        {
          id: "task-management",
          title: "Task Management App",
          description:
            "Real-time collaborative Kanban board with smooth drag-and-drop, notifications, and team boards.",
          longDescription:
            "An interactive team productivity tool inspired by Linear and Notion. Features instantaneous multi-user drag-and-drop board sync via WebSockets, smart priority tags, time estimations, and audit logs.",
          problem:
            "Remote teams need lightweight, clutter-free task management without the overwhelming complexity of legacy enterprise software.",
          solution:
            "Created a snappy React Kanban board backed by Node.js and Socket.io for instantaneous multi-client board synchronization and zero perceptible lag.",
          keyFeatures: [
            "Real-time drag-and-drop card movements synced across devices",
            "Rich Markdown editor with file attachment uploads",
            "Activity timeline and custom label filter matrix",
            "Keyboard shortcuts for rapid task triage",
          ],
        },
        {
          id: "weather-dashboard",
          title: "Weather Dashboard",
          description:
            "Interactive meteorological dashboard with dynamic data visualizations, 7-day forecast, and GPS.",
          longDescription:
            "Comprehensive meteorological visualization displaying hourly temperature curves, UV indices, humidity, wind patterns, and precipitation radars via D3.js with automatic geolocation.",
          problem:
            "Most weather apps present raw tables of numbers without intuitive visual context on how weather shifts throughout the day.",
          solution:
            "Implemented custom interactive D3.js SVG chart components that visually plot temperature gradients, air quality indexes, and hourly weather changes.",
          keyFeatures: [
            "Auto GPS detection with search autocomplete for 50,000+ cities",
            "Interactive D3.js hourly temperature and rainfall chart curves",
            "Air quality index (AQI) gauge and sunrise/sunset tracker",
            "Cached local preferences for instant return visits",
          ],
        },
        {
          id: "portfolio-design",
          title: "Portfolio Design System",
          description:
            "Comprehensive UI kit and design tokens engineered for high contrast, bold aesthetics, and accessibility.",
          longDescription:
            "A comprehensive design system comprising 50+ modular UI components, high-contrast typography and color guidelines, automated design tokens via Figma, and full Storybook documentation.",
          problem:
            "Fast-moving product teams frequently create fragmented styling and accessibility issues when lacking a unified design token contract.",
          solution:
            "Engineered a production-ready token pipeline connecting Figma Variables to Tailwind utility classes, complete with WCAG AAA accessibility contrast validation.",
          keyFeatures: [
            "50+ reusable components documented in interactive Storybook",
            "High-contrast color palettes adhering to WCAG AAA standards",
            "Tokens for typography, spacing, shadows, and radii",
            "Dark and light mode variable token synchronization",
          ],
        },
        {
          id: "chat-app",
          title: "Real-Time Chat App",
          description:
            "Cross-platform instant messaging app with end-to-end encryption, group channels, and file sharing.",
          longDescription:
            "Mobile-first instant messaging app with Signal Protocol end-to-end encryption, WebRTC peer-to-peer voice/video channels, and rich media previews.",
          problem:
            "Modern users demand end-to-end privacy without sacrificing modern chat conveniences like typing indicators, read receipts, and voice calls.",
          solution:
            "Engineered on React Native and Firebase with WebSockets and WebRTC for direct encrypted media communication.",
          keyFeatures: [
            "End-to-end client encrypted text and media messaging",
            "Group channels with granular admin role controls",
            "Real-time typing indicators and delivered/read checkmarks",
            "One-tap audio/video voice calling using WebRTC",
          ],
        },
        {
          id: "ai-image-generator",
          title: "AI Image Generator",
          description:
            "Web application for creative AI image synthesis with prompt assistance, style filters, and community gallery.",
          longDescription:
            "AI-powered creative synthesis platform backed by asynchronous FastAPI and Celery job queues. Offers prompt expansion, style presets, seed variation, and public community voting.",
          problem:
            "Complex generative AI models require intricate prompt syntax and long generation times that leave end users confused.",
          solution:
            "Built an intuitive visual prompt builder paired with background asynchronous job processing and live progress webhooks.",
          keyFeatures: [
            "Interactive prompt builder with artistic style presets",
            "Async queue processing with live generation progress bar",
            "Community showcase gallery with search, like, and download",
            "Export images in high-resolution PNG or WebP formats",
          ],
        },
      ],
    },
    experience: {
      badge: "04 Experience & Journey",
      title: "Career & Education",
      subtitle:
        "My professional journey, academic background, and community contributions.",
      comingSoon: {
        badge: "COMING SOON",
        title: "Experience & Journey Coming Soon",
        description:
          "My professional career milestones, academic degrees, and verified certificates are currently being compiled with image evidence. Check back soon!",
        hint: "Fill in your experience & upload proof images in data/experience.ts",
      },
      proofBadge: "CERTIFICATE & EVIDENCE",
      viewProof: "View Certificate / Proof",
      closeProof: "Close Preview",
      viewCredentialUrl: "Verify Original Credential ↗",
      typeLabels: {
        work: "Work",
        education: "Education",
        organization: "Organization",
      },
      items: [
        {
          period: "2024 — Present",
          role: "Frontend Developer",
          company: "Tech Startup ABC",
          location: "Jakarta, Indonesia",
          description:
            "Building and maintaining modern high-traffic web applications with React & Next.js.",
          achievements: [
            "Build and scale user-facing web applications using React & Next.js",
            "Boosted primary landing page performance by 40% (Lighthouse Score)",
            "Collaborated with product designers to implement modular design systems",
            "Mentored junior developers in frontend engineering best practices",
          ],
          technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        },
        {
          period: "2022 — 2024",
          role: "Junior Web Developer",
          company: "Digital Agency XYZ",
          location: "Jakarta, Indonesia",
          description:
            "Engineered client websites and high-converting campaign landing pages.",
          achievements: [
            "Developed responsive client websites utilizing Vue.js and modern CMS",
            "Optimized technical SEO and load times for 10+ agency client websites",
            "Crafted fluid, accessible landing pages for digital marketing campaigns",
          ],
          technologies: ["Vue.js", "WordPress", "JavaScript", "CSS3"],
        },
        {
          period: "2018 — 2022",
          role: "B.S. in Computer Science",
          company: "Universitas Indonesia",
          location: "Depok, Indonesia",
          description:
            "Graduated with honors in Computer Science, focusing on Software Engineering and AI.",
          achievements: [
            "GPA: 3.75 / 4.00 (Cum Laude)",
            "Undergraduate Thesis: Recommendation System based on Machine Learning",
            "Active competitor in national hackathons and competitive programming club",
          ],
          technologies: ["Python", "Machine Learning", "Algorithms", "Databases"],
        },
        {
          period: "2020 — 2021",
          role: "Lead",
          company: "Google Developer Student Club",
          location: "Depok, Indonesia",
          description:
            "Directed student developer community programs and technical workshops.",
          achievements: [
            "Led an active student developer community with over 100+ active members",
            "Organized 12+ technical workshops, study jams, and guest speaker sessions",
            "Established industry partnerships to support student mentoring programs",
          ],
          technologies: ["Community Leadership", "Event Organizing", "Public Speaking"],
        },
      ],
    },
    spotify: {
      nowPlaying: "Now Playing",
      recentlyPlayed: "Recently Played",
      onSpotify: "on Spotify",
      offline: "Offline / Not Playing",
    },
    contact: {
      badge: "05 Contact Me",
      title: "Let's Build Something Great",
      subtitle:
        "Have an exciting project, open role, or just want to chat? Send me a message and I'll get back to you promptly!",
      form: {
        formTitle: "Send a Message",
        nameLabel: "Your Name",
        namePlaceholder: "Enter your full name",
        emailLabel: "Your Email",
        emailPlaceholder: "name@example.com",
        messageLabel: "Your Message",
        messagePlaceholder:
          "Tell me about your project, goals, timeline, or just say hello...",
        submitBtn: "Send Message",
        submittingBtn: "Sending Message...",
        sendAnother: "Send Another Message",
        successAlert:
          "Your message has been sent successfully! I'll get back to you within 24 hours.",
        errorAlert: "Failed to send message. Please try again or reach out directly.",
      },
      directHeading: "Or reach out directly 👇",
      socialConnect: "Connect on Social Media",
    },
    footer: {
      builtWith: "Built with",
      rights: "All rights reserved.",
      downloadCv: "Download CV",
    },
  },
  id: {
    navbar: {
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
      experience: "Pengalaman",
      contact: "Kontak",
      downloadCv: "Download CV",
      cvFileName: "CV-Ahmad-Fahrezi-2026.pdf",
    },
    hero: {
      greeting: "👋 Halo, saya",
      roles: [
        "Fullstack Developer",
        "Backend & Frontend Engineer",
        "Creative Coder",
        "Pemecah Masalah",
      ],
      bio: "Fullstack Developer yang berdedikasi membangun aplikasi web end-to-end, arsitektur backend yang tangguh, serta antarmuka digital yang mulus dan berkinerja tinggi. Senang memadukan logika teknis yang kuat dengan desain modern yang presisi.",
      viewProjects: "Lihat Proyek",
      downloadCv: "Download CV",
      scrollDown: "Scroll ke bawah",
    },
    about: {
      badge: "01 Tentang Saya",
      title: "Fullstack Developer & Kreator Digital",
      subtitle:
        "Membangun pengalaman digital yang modern, responsif, dan berorientasi pengguna dengan estetika visual tinggi serta pondasi backend yang kokoh.",
      facts: {
        location: { label: "Lokasi", value: "Semarang, ID" },
        education: { label: "Pendidikan", value: "S1 Informatika Undip" },
        status: { label: "Status", value: "Siap Kerja / Kolaborasi" },
        experience: { label: "Pengalaman", value: "2,5 Tahun" },
      },
      storyP1:
        "Saya adalah seorang fullstack developer yang berdomisili di Semarang, Indonesia, lulusan S1 Informatika di Universitas Diponegoro (Undip). Menguasai pengembangan frontend modern, backend tangguh, pengelolaan database, serta estetika web interaktif.",
      storyP2:
        "Perjalanan saya dimulai dari eksplorasi dasar web development dan berkembang menjadi pembangunan aplikasi full-stack yang scalable, sistem desain, serta antarmuka digital yang mulus.",
      storyP3:
        "Saya percaya bahwa perangkat lunak tidak hanya harus andal secara teknis, tetapi juga harus memberikan pengalaman visual yang memikat dan interaksi taktil yang menyenangkan bagi pengguna.",
      currentFocusTitle: "Fokus Teknologi Saat Ini",
      currentFocusItems: [
        "Ekosistem Fullstack Next.js & React",
        "Laravel, Node.js & RESTful APIs",
        "MySQL, Prisma ORM & Desain Database",
        "Tailwind CSS, TypeScript & Desain Modern",
      ],
    },
    skills: {
      badge: "02 Keahlian & Teknologi",
      title: "Alat & Senjata Andalan",
      subtitle:
        "Bahasa pemrograman, framework, dan perangkat yang saya gunakan untuk mewujudkan konsep menjadi nyata.",
      skillsCountSuffix: "keahlian",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        tools: "Tools & DevOps",
        softSkills: "Soft Skills",
      },
      softSkillsList: {
        "Problem Solving": "Pemecahan Masalah",
        "Team Work": "Kerja Tim",
        "Communication": "Komunikasi",
        "Leadership": "Kepemimpinan",
        "Agile/Scrum": "Agile/Scrum",
      },
    },
    projects: {
      badge: "03 Proyek Unggulan",
      title: "Karya & Produk Digital",
      subtitle:
        "Kumpulan karya terbaik yang pernah saya bangun, mulai dari aplikasi web skala penuh hingga sistem desain.",
      filterAll: "Semua",
      filterWeb: "Web",
      filterMobile: "Mobile",
      filterDesign: "Desain",
      categories: {
        web: "Web",
        mobile: "Mobile",
        design: "Desain",
      },
      viewDetails: "Lihat Detail",
      liveDemo: "Live Demo",
      sourceCode: "Source Code",
      featured: "UNGGULAN",
      comingSoon: {
        badge: "SEGERA HADIR",
        title: "Proyek Unggulan Sedang Disiapkan",
        description:
          "Saya sedang menyusun, memoles, dan mempersiapkan showcase aplikasi web, solusi klien, dan eksperimen kreatif terbaru. Karya-karya unggulan akan segera hadir di sini!",
        hint: "Isi proyek Anda kapan saja di data/projects.ts",
      },
      modal: {
        problem: "Tantangan Masalah",
        solution: "Solusi & Arsitektur",
        keyFeatures: "Fitur Utama",
        technologies: "Teknologi yang Digunakan",
        close: "Tutup",
        backToProjects: "Kembali ke Proyek",
      },
      items: [
        {
          id: "ecommerce-platform",
          title: "E-Commerce Platform",
          description:
            "Platform e-commerce full-stack dengan keranjang belanja real-time, pembayaran aman, dan dashboard admin.",
          longDescription:
            "Platform e-commerce modern berskala penuh yang dirancang untuk performa tinggi dan konversi optimal. Dilengkapi manajemen inventaris real-time, integrasi gateway pembayaran Stripe berstandar PCI-DSS, serta dashboard analytics penjualan.",
          problem:
            "Template toko online konvensional sering kali lambat, memiliki navigasi yang rumit, dan tingkat pembatalan pesanan yang tinggi saat checkout.",
          solution:
            "Dibangun menggunakan Next.js Server Components untuk loading instan, Prisma ORM dengan PostgreSQL untuk konsistensi stok, dan alur pembayaran Neo-Brutalist yang bersih.",
          keyFeatures: [
            "Alur pembayaran Stripe lengkap dengan webhook instan",
            "Manajemen stok real-time dengan notifikasi batas minimum",
            "Dashboard analitik admin dengan grafik pendapatan penjualan",
            "Keranjang belanja responsif yang dioptimalkan untuk mobile",
          ],
        },
        {
          id: "task-management",
          title: "Task Management App",
          description:
            "Aplikasi papan Kanban kolaboratif real-time dengan drag-and-drop, notifikasi, dan workspace tim.",
          longDescription:
            "Aplikasi produktivitas tim interaktif yang terinspirasi dari Linear dan Notion. Menyediakan sinkronisasi drag-and-drop multi-pengguna secara instan via WebSockets, tag prioritas, dan riwayat aktivitas.",
          problem:
            "Tim kerja jarak jauh membutuhkan alat manajemen tugas yang ringan dan responsif tanpa kompleksitas berlebihan dari software enterprise lawas.",
          solution:
            "Membangun papan Kanban interaktif berbasis React dan Socket.io untuk sinkronisasi seketika antar perangkat tanpa jeda yang terasa.",
          keyFeatures: [
            "Perpindahan kartu drag-and-drop real-time lintas perangkat",
            "Editor catatan Markdown lengkap dengan lampiran berkas",
            "Garis waktu aktivitas tim dan filter label kustom",
            "Pintasan keyboard untuk pengelolaan tugas cepat",
          ],
        },
        {
          id: "weather-dashboard",
          title: "Weather Dashboard",
          description:
            "Dashboard meteorologi interaktif dengan visualisasi data cuaca, ramalan 7 hari, dan pelacak GPS.",
          longDescription:
            "Visualisasi data meteorologi komprehensif yang menampilkan grafik kurva suhu per jam, indeks UV, kelembapan, arah angin, serta radar presipitasi interaktif berbasis D3.js dengan geolokasi otomatis.",
          problem:
            "Sebagian besar aplikasi cuaca hanya menyajikan angka mentah tanpa gambaran visual yang intuitif tentang perubahan cuaca sepanjang hari.",
          solution:
            "Mengembangkan komponen grafik SVG kustom berbasis D3.js yang memvisualisasikan kurva temperatur dan indeks kualitas udara secara interaktif.",
          keyFeatures: [
            "Deteksi GPS otomatis dan pencarian ke 50.000+ kota di dunia",
            "Grafik kurva suhu dan curah hujan per jam berbasis D3.js",
            "Indikator kualitas udara (AQI) dan waktu matahari terbit/terbenam",
            "Penyimpanan lokasi favorit secara lokal untuk akses cepat",
          ],
        },
        {
          id: "portfolio-design",
          title: "Portfolio Design System",
          description:
            "Kit UI dan token desain komprehensif dengan kontras tinggi, estetika berani, dan standar aksesibilitas.",
          longDescription:
            "Sistem desain komprehensif yang mencakup 50+ komponen modular, pedoman tipografi dan palet warna kontras tinggi, token desain otomatis via Figma, serta dokumentasi Storybook interaktif.",
          problem:
            "Tim pengembang sering menghadapi inkonsistensi styling dan kendala aksesibilitas saat tidak memiliki standarisasi token desain yang terpusat.",
          solution:
            "Membangun alur token desain yang menghubungkan Figma Variables langsung ke class utilitas Tailwind dengan kepatuhan kontras WCAG AAA.",
          keyFeatures: [
            "50+ komponen siap pakai terdokumentasi di Storybook",
            "Palet warna kontras tinggi yang memenuhi standar WCAG AAA",
            "Token lengkap untuk tipografi, spasi, bayangan, dan sudut",
            "Sinkronisasi otomatis untuk variabel tema gelap dan terang",
          ],
        },
        {
          id: "chat-app",
          title: "Real-Time Chat App",
          description:
            "Aplikasi perpesanan instan cross-platform dengan enkripsi end-to-end, obrolan grup, dan panggilan suara.",
          longDescription:
            "Aplikasi chatting mobile-first dengan enkripsi end-to-end Signal Protocol, ruang obrolan grup, serta panggilan audio/video peer-to-peer via WebRTC.",
          problem:
            "Pengguna saat ini menuntut privasi percakapan mutlak tanpa harus mengorbankan kenyamanan fitur modern seperti status mengetik dan panggilan suara.",
          solution:
            "Dibangun menggunakan React Native dan Firebase dipadukan dengan WebRTC untuk transmisi audio/video terenkripsi langsung antar pengguna.",
          keyFeatures: [
            "Enkripsi end-to-end menyeluruh pada pesan teks dan media",
            "Kanal obrolan grup dengan kontrol hak akses admin",
            "Indikator sedang mengetik dan tanda centang terkirim/terbaca",
            "Panggilan suara dan video satu ketukan via WebRTC",
          ],
        },
        {
          id: "ai-image-generator",
          title: "AI Image Generator",
          description:
            "Aplikasi web pembuatan gambar bertenaga AI dengan bantuan prompt, preset filter gaya, dan galeri publik.",
          longDescription:
            "Platform sintesis visual bertenaga kecerdasan buatan dengan pemrosesan antrean asinkronus via FastAPI dan Celery. Dilengkapi preset gaya seni dan galeri komunitas.",
          problem:
            "Model generative AI sering memerlukan sintaks prompt yang rumit dan waktu tunggu lama yang membingungkan pengguna awam.",
          solution:
            "Menghadirkan pembuat prompt visual yang interaktif dipadukan dengan antrean proses latar belakang serta indikator progres langsung.",
          keyFeatures: [
            "Penyusun prompt interaktif dengan berbagai preset artistik",
            "Pemrosesan antrean asinkronus dengan bar progres live",
            "Galeri komunitas publik dengan fitur pencarian dan unduh",
            "Ekspor hasil gambar dalam format PNG atau WebP resolusi tinggi",
          ],
        },
      ],
    },
    experience: {
      badge: "04 Pengalaman & Riwayat",
      title: "Karier & Pendidikan",
      subtitle:
        "Jejak langkah profesional, latar belakang akademis, serta kontribusi komunitas saya.",
      comingSoon: {
        badge: "SEGERA HADIR",
        title: "Pengalaman & Riwayat Karir Segera Hadir",
        description:
          "Riwayat karir profesional, pendidikan, dan sertifikat bukti pengalaman sedang dalam proses pembaruan dan dokumentasi. Nantikan segera!",
        hint: "Isi riwayat pengalaman & upload foto bukti kapan saja di data/experience.ts",
      },
      proofBadge: "BUKTI & SERTIFIKAT",
      viewProof: "Lihat Bukti / Sertifikat",
      closeProof: "Tutup Preview",
      viewCredentialUrl: "Verifikasi Tautan Asli ↗",
      typeLabels: {
        work: "Kerja",
        education: "Pendidikan",
        organization: "Organisasi",
      },
      items: [
        {
          period: "2024 — Sekarang",
          role: "Frontend Developer",
          company: "Tech Startup ABC",
          location: "Jakarta, Indonesia",
          description:
            "Membangun dan mengembangkan aplikasi web performa tinggi dengan React & Next.js.",
          achievements: [
            "Membangun dan memelihara aplikasi web skala besar menggunakan React & Next.js",
            "Meningkatkan performa halaman utama hingga 40% (skor Lighthouse)",
            "Berkolaborasi dengan desainer produk untuk menyusun design system modular",
            "Mementori developer junior dalam best practices arsitektur frontend",
          ],
          technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        },
        {
          period: "2022 — 2024",
          role: "Junior Web Developer",
          company: "Digital Agency XYZ",
          location: "Jakarta, Indonesia",
          description:
            "Mengembangkan website klien dan landing page kampanye pemasaran.",
          achievements: [
            "Mengembangkan website klien yang responsif menggunakan Vue.js dan CMS modern",
            "Mengoptimasi arsitektur SEO teknis dan kecepatan loading untuk 10+ website klien",
            "Membuat landing page interaktif dengan konversi tinggi untuk kampanye digital",
          ],
          technologies: ["Vue.js", "WordPress", "JavaScript", "CSS3"],
        },
        {
          period: "2018 — 2022",
          role: "S1 Teknik Informatika",
          company: "Universitas Indonesia",
          location: "Depok, Indonesia",
          description:
            "Lulus dengan predikat memuaskan pada program studi Ilmu Komputer / Teknik Informatika.",
          achievements: [
            "IPK: 3.75 / 4.00 (Cum Laude)",
            "Tugas Akhir: Sistem Rekomendasi berbasis Machine Learning",
            "Aktif dalam kompetisi hackathon nasional dan klub competitive programming",
          ],
          technologies: ["Python", "Machine Learning", "Algoritma", "Basis Data"],
        },
        {
          period: "2020 — 2021",
          role: "Lead",
          company: "Google Developer Student Club",
          location: "Depok, Indonesia",
          description:
            "Memimpin komunitas pengembang mahasiswa dan program pelatihan teknologi.",
          achievements: [
            "Memimpin komunitas teknologi mahasiswa dengan 100+ anggota aktif",
            "Mengorganisir 12+ workshop teknis, sesi study jam, dan talkshow industri",
            "Menjalin kolaborasi dengan industri untuk program mentoring karier mahasiswa",
          ],
          technologies: ["Kepemimpinan Komunitas", "Manajemen Event", "Public Speaking"],
        },
      ],
    },
    spotify: {
      nowPlaying: "Sedang Diputar",
      recentlyPlayed: "Terakhir Diputar",
      onSpotify: "di Spotify",
      offline: "Sedang tidak memutar musik",
    },
    contact: {
      badge: "05 Hubungi Saya",
      title: "Mari Berkolaborasi",
      subtitle:
        "Tertarik untuk bekerja sama atau memiliki proyek yang ingin diwujudkan? Kirimkan pesan di bawah dan saya akan segera membalas!",
      form: {
        formTitle: "Kirim Pesan",
        nameLabel: "Nama Anda",
        namePlaceholder: "Masukkan nama lengkap",
        emailLabel: "Alamat Email",
        emailPlaceholder: "nama@contoh.com",
        messageLabel: "Pesan Anda",
        messagePlaceholder:
          "Ceritakan tentang proyek, ide, estimasi waktu, atau sekadar menyapa...",
        submitBtn: "Kirim Pesan",
        submittingBtn: "Mengirim Pesan...",
        sendAnother: "Kirim Pesan Lainnya",
        successAlert:
          "Pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda dalam 24 jam.",
        errorAlert:
          "Gagal mengirim pesan. Silakan coba lagi atau hubungi kontak langsung di bawah.",
      },
      directHeading: "Atau hubungi langsung 👇",
      socialConnect: "Terhubung di Media Sosial",
    },
    footer: {
      builtWith: "Dibangun dengan",
      rights: "Hak cipta dilindungi undang-undang.",
      downloadCv: "Download CV",
    },
  },
};
