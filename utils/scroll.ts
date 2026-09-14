/**
 * Calculates the exact scroll target position for a given section or element,
 * ensuring the section title/badge sits cleanly and comfortably right below
 * the fixed navbar with zero awkward whitespace (matching the desired snug fit).
 */
export function getSectionScrollPosition(targetElement: Element): number {
  // Find the title element or heading inside the section
  const titleEl =
    targetElement.querySelector<HTMLElement>(".section-title") ||
    targetElement.querySelector<HTMLElement>("h2") ||
    (targetElement as HTMLElement);

  // Find the header container (with the number badge and title)
  const headerBlock =
    titleEl.closest<HTMLElement>(".flex, .mb-12, .mb-8, .text-center") || titleEl;

  const headerRect = headerBlock.getBoundingClientRect();
  const headerTop = headerRect.top + window.scrollY;

  // Fixed navbar height: 64px on mobile (< 768px), 80px on desktop (>= 768px)
  const isDesktop = window.innerWidth >= 768;
  const navHeight = isDesktop ? 80 : 64;

  // Exactly as in Image 2: a clean, tight 24px gap right below the navbar bottom border
  const paddingBelowNav = 24;

  return Math.max(0, headerTop - navHeight - paddingBelowNav);
}

/**
 * Smoothly scrolls to the exact section header position using Lenis if available,
 * or native window.scrollTo as a robust fallback.
 */
export function smoothScrollToSection(targetElement: Element, duration = 1.1): void {
  const targetScrollTop = getSectionScrollPosition(targetElement);
  const lenis = (window as any).lenis;

  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(targetScrollTop, { duration });
  } else {
    window.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  }
}
