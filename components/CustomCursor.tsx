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

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);

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
    const observer = new MutationObserver(() => {
      checkTheme();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Interactive element detection helper
    const checkInteractive = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], .cursor-pointer, label'
        )
      );
    };

    // Mouse movement listener
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Direct transform on dot for zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Update hover state only when it changes (avoid React re-render thrashing)
      const interactive = checkInteractive(e.target);
      if (interactive !== isHoveringRef.current) {
        isHoveringRef.current = interactive;
        setIsHovering(interactive);
      }
    };

    // Capture phase listeners so child stopPropagation cannot block click feedback
    const onMouseDown = () => {
      isClickingRef.current = true;
      setIsClicking(true);
    };

    const onMouseUp = () => {
      isClickingRef.current = false;
      setIsClicking(false);
    };

    const onMouseOver = (e: MouseEvent) => {
      const interactive = checkInteractive(e.target);
      if (interactive !== isHoveringRef.current) {
        isHoveringRef.current = interactive;
        setIsHovering(interactive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { capture: true });
    window.addEventListener("mouseup", onMouseUp, { capture: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // Smooth RAF loop for the trailing ring (lerp spring interpolation)
    const animate = () => {
      const speed = 0.18; // smooth spring lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * speed;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * speed;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown, { capture: true });
      window.removeEventListener("mouseup", onMouseUp, { capture: true });
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 1. Trailing Outer Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-16 h-16 pointer-events-none z-[99998] transition-opacity duration-300 will-change-transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`transition-all duration-200 ease-out flex items-center justify-center ${
            /* Click state takes highest priority */
            isClicking
              ? isDark
                ? "w-8 h-8 rounded-full border-3 border-white bg-[#1DB954]/60 scale-75 shadow-none"
                : "w-8 h-8 rounded-full border-3 border-brutal-black bg-brutal-black/40 scale-75 shadow-none"
              : isHovering
              ? isDark
                ? "w-14 h-14 rounded-full border-3 border-dashed border-white bg-[#1DB954]/25 shadow-[0_0_25px_rgba(29,185,84,0.75)] rotate-45"
                : "w-14 h-14 rounded-full border-3 border-dashed border-brutal-black bg-brutal-yellow/40 shadow-[4px_4px_0px_#1A1A2E] rotate-45"
              : isDark
              ? "w-10 h-10 rounded-full border-2 border-[#1DB954] bg-[#1DB954]/15 shadow-[0_0_14px_rgba(29,185,84,0.4)]"
              : "w-10 h-10 rounded-full border-2 border-brutal-black bg-white/40 shadow-[2.5px_2.5px_0px_#1A1A2E]"
          }`}
        />
      </div>

      {/* 2. Immediate Inner Dot / Hover Icon */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] transition-opacity duration-150 will-change-transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {isHovering && !isClicking ? (
          /* Prominent star icon on hover, clearly visible in both light & dark mode */
          <span
            className={`font-mono text-sm font-black select-none transition-transform duration-150 scale-125 animate-pulse ${
              isDark
                ? "text-brutal-yellow drop-shadow-[0_0_8px_#FFE925]"
                : "text-brutal-red drop-shadow-[1px_1px_0px_#1A1A2E]"
            }`}
          >
            ✦
          </span>
        ) : (
          /* Normal / Clicking round dot */
          <div
            className={`transition-all duration-150 ease-out rounded-full ${
              isClicking
                ? "w-2 h-2 scale-60"
                : "w-3.5 h-3.5 scale-100"
            } ${
              isDark
                ? "bg-[#1DB954] border-2 border-white shadow-[0_0_10px_#1DB954]"
                : "bg-brutal-yellow border-2 border-brutal-black shadow-[1.5px_1.5px_0px_#1A1A2E]"
            }`}
          />
        )}
      </div>
    </>
  );
}
