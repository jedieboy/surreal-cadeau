let locks = 0;

/** Ref-counted body scroll lock for overlays (mobile menu, lightbox). */
export function lockScroll(on: boolean) {
  locks = Math.max(0, locks + (on ? 1 : -1));
  document.body.classList.toggle('no-scroll', locks > 0);
}
