import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Global strength multiplier from the design ("parallax" prop). */
const STRENGTH = 0.6;
const items = new Set<ParallaxDirective>();
let raf = 0;

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function schedule() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    const vh = window.innerHeight;
    items.forEach((item) => item.update(vh));
  });
}

/**
 * Translates the element vertically relative to its parent's position in the
 * viewport. Negative speeds drift slower than the page, positive ones faster.
 */
@Directive({ selector: '[parallax]' })
export class ParallaxDirective implements OnInit, OnDestroy {
  readonly parallax = input.required<number>();
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngOnInit() {
    if (reduced()) return;
    if (!items.size) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    }
    items.add(this);
    schedule();
  }

  ngOnDestroy() {
    if (!items.delete(this) || items.size) return;
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  }

  update(vh: number) {
    const parent = this.el.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    const y = (r.top + r.height / 2 - vh / 2) * this.parallax() * STRENGTH;
    this.el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
  }
}
