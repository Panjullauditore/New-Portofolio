"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Positions for smooth trailing animation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate on devices with a mouse (fine pointer)
    const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!mediaQuery.matches) return;

    setMounted(true);
    document.body.classList.add("has-custom-cursor");

    // Initialize theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    // Observe theme changes (when ThemeToggle is clicked)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Mouse movement listener
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Direct transform on dot for zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], .cursor-pointer'
          )
        );
        setIsHovering(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // Smooth RAF loop for the trailing ring (lerp interpolation)
    const animate = () => {
      const speed = 0.18; // smooth spring lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * speed;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * speed;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[99998] transition-opacity duration-300 will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      >
        <div
          className={`transition-all duration-200 ease-out flex items-center justify-center ${
            isDark
              ? /* Dark Mode Ring: Neon Spotify Green & Glowing White */
                isHovering
                ? "w-14 h-14 rounded-md border-3 border-brutal-white bg-[#1DB954]/25 shadow-[0_0_22px_rgba(29,185,84,0.7)] rotate-12"
                : isClicking
                ? "w-7 h-7 rounded-full border-2 border-[#1DB954] bg-[#1DB954]/40 scale-90"
                : "w-9 h-9 rounded-full border-2 border-[#1DB954] bg-[#1DB954]/10 shadow-[0_0_12px_rgba(29,185,84,0.35)]"
              : /* Light Mode Ring: Neo-Brutalist Sharp Black & Yellow Inset */
                isHovering
                ? "w-14 h-14 rounded-md border-3 border-brutal-black bg-brutal-yellow/40 shadow-[3px_3px_0px_#1A1A2E] -rotate-12"
                : isClicking
                ? "w-7 h-7 rounded-full border-2 border-brutal-black bg-brutal-black/20 scale-90"
                : "w-9 h-9 rounded-full border-2 border-brutal-black bg-brutal-white/40 shadow-[2px_2px_0px_#1A1A2E]"
          }`}
        >
          {/* Micro indicator in center when hovering in Light / Dark */}
          {isHovering && (
            <span
              className={`font-mono text-[10px] font-black uppercase select-none transition-transform duration-200 ${
                isDark ? "text-white" : "text-brutal-black"
              }`}
            >
              ✦
            </span>
          )}
        </div>
      </div>

      {/* Immediate Inner Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-200 will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      >
        <div
          className={`transition-all duration-150 ease-out ${
            isDark
              ? /* Dark Mode Dot: Glowing Spotify Green or Bright Yellow */
                isHovering
                ? "w-4 h-4 rounded-full bg-brutal-yellow border-2 border-brutal-black shadow-[0_0_15px_#FFE925] scale-125"
                : isClicking
                ? "w-2.5 h-2.5 rounded-full bg-[#1DB954] border-2 border-white scale-75 shadow-[0_0_8px_#1DB954]"
                : "w-3 h-3 rounded-full bg-[#1DB954] border-2 border-white shadow-[0_0_10px_#1DB954]"
              : /* Light Mode Dot: Vibrant Neo-Yellow or Pink Alert */
                isHovering
                ? "w-4 h-4 rounded-full bg-brutal-red border-2 border-brutal-black shadow-[2px_2px_0px_#1A1A2E] scale-125"
                : isClicking
                ? "w-2.5 h-2.5 rounded-full bg-brutal-black scale-75"
                : "w-3 h-3 rounded-full bg-brutal-yellow border-2 border-brutal-black shadow-[1.5px_1.5px_0px_#1A1A2E]"
          }`}
        />
      </div>
    </>
  );
}
