"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const pointerRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLDivElement>(null);

  // Positions for smooth trailing animation
  const mousePos = useRef({ x: -100, y: -100 });
  const trailerPos = useRef({ x: -100, y: -100 });
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

      // Direct transform on main triangle pointer for zero latency
      // Offset by -2px so tip (2, 2) lands precisely on client coordinates
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
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

    // Smooth RAF loop for the trailing triangle (spring lag interpolation)
    const animate = () => {
      const speed = 0.16; // smooth spring lag
      trailerPos.current.x += (mousePos.current.x - trailerPos.current.x) * speed;
      trailerPos.current.y += (mousePos.current.y - trailerPos.current.y) * speed;

      if (trailerRef.current) {
        trailerRef.current.style.transform = `translate3d(${trailerPos.current.x}px, ${trailerPos.current.y}px, 0)`;
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
      {/* 1. Trailing Wireframe Triangle (Echo Reticle) */}
      <div
        ref={trailerRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[99998] transition-opacity duration-300 will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`transition-all duration-300 ease-out flex items-center justify-center -translate-x-1/2 -translate-y-1/2 ${
            isHovering
              ? "scale-125 rotate-45"
              : isClicking
              ? "scale-75 -rotate-12"
              : "scale-100 rotate-0"
          }`}
        >
          {isDark ? (
            /* Dark Mode Trailing Triangle: Neon Wireframe & Glow */
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              className="transition-all duration-300"
              style={{
                filter: isHovering
                  ? "drop-shadow(0 0 16px rgba(29, 185, 84, 0.8))"
                  : "drop-shadow(0 0 8px rgba(29, 185, 84, 0.4))",
              }}
            >
              <polygon
                points="22,6 38,36 6,36"
                stroke={isHovering ? "#FFFFFF" : "#1DB954"}
                strokeWidth={isHovering ? "2.5" : "2"}
                strokeDasharray={isHovering ? "none" : "4 2"}
                fill={isHovering ? "rgba(29, 185, 84, 0.25)" : "rgba(29, 185, 84, 0.08)"}
              />
            </svg>
          ) : (
            /* Light Mode Trailing Triangle: Neo-Brutalist Sharp Black & Yellow Inset */
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              className="transition-all duration-300"
              style={{
                filter: isHovering
                  ? "drop-shadow(3px 3px 0px #1A1A2E)"
                  : "drop-shadow(2px 2px 0px rgba(26, 26, 46, 0.3))",
              }}
            >
              <polygon
                points="22,6 38,36 6,36"
                stroke="#1A1A2E"
                strokeWidth={isHovering ? "2.5" : "2"}
                strokeDasharray={isHovering ? "none" : "4 2"}
                fill={isHovering ? "rgba(255, 233, 37, 0.4)" : "rgba(255, 233, 37, 0.15)"}
              />
            </svg>
          )}
        </div>
      </div>

      {/* 2. Main Sharp Triangle Pointer (Precision Arrowhead) */}
      <div
        ref={pointerRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-150 will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`origin-top-left transition-transform duration-150 ease-out ${
            isClicking
              ? "scale-90 translate-x-0.5 translate-y-0.5"
              : isHovering
              ? "scale-115 rotate-[-8deg]"
              : "scale-100 rotate-0"
          }`}
        >
          {isDark ? (
            /* Dark Mode Triangle Cursor: Electric Spotify Neon Green with White Edge & Glow */
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              style={{
                filter: isHovering
                  ? "drop-shadow(0 0 12px #FFE925) drop-shadow(1px 1px 0px #000)"
                  : "drop-shadow(0 0 10px #1DB954) drop-shadow(1.5px 1.5px 0px #000)",
              }}
            >
              {/* Solid Triangle Shape: Tip at (2, 2) */}
              <polygon
                points="2,2 5,23 21,15"
                fill={isHovering ? "#FFE925" : "#1DB954"}
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Inner geometric accent notch */}
              <polygon
                points="4,5 6,17 16,13"
                fill={isHovering ? "#FF8C42" : "#14833B"}
                opacity="0.75"
              />
            </svg>
          ) : (
            /* Light Mode Triangle Cursor: Vivid Neo-Brutal Yellow / Red with Bold Black Stroke & Hard Shadow */
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              style={{
                filter: isHovering
                  ? "drop-shadow(3px 3px 0px #1A1A2E)"
                  : "drop-shadow(2px 2px 0px #1A1A2E)",
              }}
            >
              {/* Solid Triangle Shape: Tip at (2, 2) */}
              <polygon
                points="2,2 5,23 21,15"
                fill={isHovering ? "#FF5C5C" : "#FFE925"}
                stroke="#1A1A2E"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Inner geometric accent notch */}
              <polygon
                points="4,5 6,17 16,13"
                fill={isHovering ? "#FFE925" : "#FF6B9D"}
                opacity="0.8"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
