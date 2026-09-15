/**
 * Calculates the exact scroll target position for a given section element,
 * positioning the section right below the fixed navbar with generous,
 * comfortable vertical breathing room (matching natural section framing).
 */
export function getSectionScrollPosition(targetElement: Element): number {
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
  const navHeight = isDesktop ? 80 : 64;

  const rect = targetElement.getBoundingClientRect();
  const currentScroll =
    (typeof window !== "undefined" && (window as any).lenis?.scroll) ??
    (typeof window !== "undefined" ? window.scrollY : 0) ??
    (typeof document !== "undefined" ? document.documentElement.scrollTop : 0) ??
    0;

  // Absolute document position of the section minus fixed navbar height
  return Math.max(0, rect.top + currentScroll - navHeight);
}

let lastScrollTime = 0;
let lastTarget = -1;
let currentAnimationId: number | null = null;

/**
 * High-performance, silky-smooth fallback scroll animation using requestAnimationFrame
 * and an exponential/quartic deceleration curve.
 */
function animateScroll(targetY: number, durationMs = 1100): void {
  if (typeof window === "undefined") return;

  if (currentAnimationId !== null) {
    cancelAnimationFrame(currentAnimationId);
    currentAnimationId = null;
  }

  const startY = window.scrollY || document.documentElement.scrollTop || 0;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return;

  const startTime = performance.now();

  function easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  }

  function frame(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const ease = easeOutQuart(progress);

    window.scrollTo(0, Math.round(startY + diff * ease));

    if (progress < 1) {
      currentAnimationId = requestAnimationFrame(frame);
    } else {
      currentAnimationId = null;
    }
  }

  currentAnimationId = requestAnimationFrame(frame);
}

/**
 * Smoothly scrolls to the section using Lenis if active,
 * or custom fluid rAF animation as a guaranteed smooth fallback.
 */
export function smoothScrollToSection(targetElement: Element, duration = 1.1): void {
  if (typeof window === "undefined" || !targetElement) return;

  const targetScrollTop = getSectionScrollPosition(targetElement);
  const now = Date.now();

  // Deduplicate identical triggers within 200ms (e.g. rapid clicks or overlapping handlers)
  if (Math.abs(targetScrollTop - lastTarget) < 2 && now - lastScrollTime < 200) {
    return;
  }
  lastScrollTime = now;
  lastTarget = targetScrollTop;

  const lenis = (window as any).lenis;

  if (lenis && typeof lenis.scrollTo === "function" && !lenis.isStopped) {
    lenis.scrollTo(targetScrollTop, {
      duration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      force: true,
    });
  } else {
    animateScroll(targetScrollTop, duration * 1000);
  }
}
