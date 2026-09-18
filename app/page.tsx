import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import SpotifyWidget from "@/components/SpotifyWidget";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Divider */}
      <div className="w-full border-t-3 border-brutal-black dark:border-brutal-white" />

      <About />

      <Skills />

      {/* Divider */}
      <div className="w-full border-t-3 border-brutal-black dark:border-brutal-white" />

      <Projects />

      <Experience />

      {/* Divider */}
      <div className="w-full border-t-3 border-brutal-black dark:border-brutal-white" />

      <Contact />

      {/* Floating Spotify Mini-Bar */}
      <SpotifyWidget />
    </main>
  );
}
