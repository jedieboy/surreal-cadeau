import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

export type RevealFrom = 'up' | 'left' | 'right' | 'fade';

let observer: IntersectionObserver | undefined;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer!.unobserve(entry.target);
      }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  return observer;
}

/** Fades / slides an element in the first time it scrolls into view. */
@Directive({
  selector: '[reveal]',
  host: {
    '[attr.data-reveal]': 'reveal() || "up"',
    '[style.--rv-delay.ms]': 'delay()',
  },
})
export class RevealDirective implements OnInit, OnDestroy {
  readonly reveal = input<RevealFrom | ''>('up');
  readonly delay = input(0);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngOnInit() {
    getObserver().observe(this.el);
  }

  ngOnDestroy() {
    observer?.unobserve(this.el);
  }
}
