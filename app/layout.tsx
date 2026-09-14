import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Ahmad Fahrezi — Frontend Developer & Designer | Portfolio",
  description:
    "Website portofolio pribadi Ahmad Fahrezi — Frontend Developer & Designer. Lihat proyek, pengalaman, dan keahlian saya. Dibuat dengan gaya Neo Brutalism.",
  keywords: [
    "portfolio",
    "frontend developer",
    "web developer",
    "designer",
    "neo brutalism",
    "react",
    "next.js",
  ],
  authors: [{ name: "Ahmad Fahrezi" }],
  openGraph: {
    title: "Ahmad Fahrezi — Frontend Developer & Designer",
    description:
      "Website portofolio pribadi Ahmad Fahrezi. Lihat proyek, pengalaman, dan keahlian.",
    url: "https://ahmadfahrezi.dev",
    siteName: "Ahmad Fahrezi Portfolio",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Fahrezi — Frontend Developer & Designer",
    description:
      "Website portofolio pribadi Ahmad Fahrezi. Neo Brutalism style.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

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
          <SmoothScroll />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
