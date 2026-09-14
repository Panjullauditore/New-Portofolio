"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { smoothScrollToSection } from "@/utils/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Expose lenis globally
    (window as any).lenis = lenis;

    // Handle internal anchor links (#about, #projects, etc.) smoothly with exact section positioning
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          try {
            const targetElement = document.querySelector(href);
            if (targetElement) {
              e.preventDefault();
              smoothScrollToSection(targetElement, 1.1);
              history.pushState(null, "", href);
            }
          } catch {
            // ignore
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, true);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      delete (window as any).lenis;
      document.removeEventListener("click", handleAnchorClick, true);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
