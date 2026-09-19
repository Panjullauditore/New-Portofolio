import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmdfahrezi.vercel.app"),
  alternates: {
    canonical: "https://ahmdfahrezi.vercel.app",
  },
  title: "Ahmad Fahrezi — Fullstack Developer | Portfolio",
  description:
    "Website portofolio pribadi Ahmad Fahrezi — Fullstack Developer. Lihat proyek, pengalaman, dan keahlian saya. Dibuat dengan gaya Neo Brutalism.",
  keywords: [
    "portfolio",
    "fullstack developer",
    "web developer",
    "software engineer",
    "neo brutalism",
    "react",
    "next.js",
    "laravel",
    "node.js",
    "typescript",
  ],
  authors: [{ name: "Ahmad Fahrezi" }],
  openGraph: {
    title: "Ahmad Fahrezi — Fullstack Developer",
    description:
      "Website portofolio pribadi Ahmad Fahrezi — Fullstack Developer. Lihat proyek, pengalaman, dan keahlian.",
    url: "https://ahmdfahrezi.vercel.app",
    siteName: "Ahmad Fahrezi Portfolio",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Fahrezi — Fullstack Developer",
    description:
      "Website portofolio pribadi Ahmad Fahrezi — Fullstack Developer. Neo Brutalism style.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";

// Script to prevent dark mode flash on page load - defaults to dark mode
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || !theme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <CustomCursor />
          <SmoothScroll />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
