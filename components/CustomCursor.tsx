"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const pointerRef = useRef<HTMLDivElement>(null);

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

    // Mouse movement listener with zero latency
    const onMouseMove = (e: MouseEvent) => {
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

    return () => {
      document.body.classList.remove("has-custom-cursor");
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      ref={pointerRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-150 will-change-transform ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        className={`origin-top-left transition-all duration-150 ease-out ${
          isClicking
            ? "scale-90 translate-x-0.5 translate-y-0.5"
            : isHovering
            ? "scale-115 rotate-[-6deg]"
            : "scale-100 rotate-0"
        }`}
      >
        {isDark ? (
          /* Dark Mode Triangle Cursor: Electric Spotify Neon Green with White Edge & Neon Glow */
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="transition-all duration-200"
            style={{
              filter: isHovering
                ? "drop-shadow(0 0 12px #FFE925) drop-shadow(1.5px 1.5px 0px #000)"
                : "drop-shadow(0 0 10px #1DB954) drop-shadow(1.5px 1.5px 0px #000)",
            }}
          >
            {/* Solid Triangle Arrowhead: Tip at (2, 2) */}
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
              opacity="0.8"
            />
          </svg>
        ) : (
          /* Light Mode Triangle Cursor: Vivid Neo-Brutalist Yellow with Sharp Black Stroke & Hard Drop Shadow */
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="transition-all duration-200"
            style={{
              filter: isHovering
                ? "drop-shadow(2.5px 2.5px 0px #1A1A2E)"
                : "drop-shadow(2px 2px 0px #1A1A2E)",
            }}
          >
            {/* Solid Triangle Arrowhead: Tip at (2, 2) */}
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
              opacity="0.85"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
