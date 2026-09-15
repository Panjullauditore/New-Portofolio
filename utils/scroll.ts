/**
 * Smoothly scrolls to the target section with fixed navbar offset,
 * ensuring the section is beautifully centered and framed in the viewport
 * without any clipping or overlap.
 */
export function smoothScrollToSection(targetElement: Element, duration = 1.1): void {
  const lenis = (window as any).lenis;

  if (lenis && typeof lenis.scrollTo === "function") {
    // Lenis automatically respects html scroll-padding-top (4rem / 5rem for navbar)
    lenis.scrollTo(targetElement as HTMLElement, {
      duration,
      offset: 0,
    });
  } else {
    // Native fallback respecting CSS scroll-padding-top
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

