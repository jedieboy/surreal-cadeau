import { Component, HostListener, computed, effect, signal } from '@angular/core';
import { EVENTS, pad } from '../core/site.data';
import { lockScroll } from '../core/scroll-lock';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-events',
  imports: [RevealDirective],
  template: `
    <section id="events">
      <div class="head">
        <div class="eyebrow" reveal>Event styling</div>
        <h2 class="section-title" reveal [delay]="100">
          Rooms we've <span class="accent">dressed</span>
        </h2>
      </div>

      <div class="bento">
        @for (e of events; track e.src + e.title; let i = $index) {
          <button
            type="button"
            reveal
            [delay]="(i % 4) * 80"
            [class.wide]="e.col === 2"
            [class.tall]="e.row === 2"
            [attr.aria-label]="'View ' + e.title"
            (click)="open.set(i)"
          >
            <img [src]="e.src" [alt]="e.title" loading="lazy" />
            <span class="tag">{{ e.title }}</span>
          </button>
        }
      </div>
    </section>

    @if (current(); as c) {
      <div class="lightbox" role="dialog" aria-modal="true" [attr.aria-label]="c.title" (click)="close()">
        <img [src]="c.src" [alt]="c.title" (click)="$event.stopPropagation()" />
        <div class="caption">
          {{ c.title }} <span>{{ counter() }}</span>
        </div>
        <button type="button" class="round-btn lb-prev" aria-label="Previous" (click)="step(-1, $event)">←</button>
        <button type="button" class="round-btn lb-next" aria-label="Next" (click)="step(1, $event)">→</button>
        <button type="button" class="lb-close" aria-label="Close" (click)="close()">×</button>
      </div>
    }
  `,
  styles: `
    section {
      padding: clamp(80px, 12vw, 160px) clamp(20px, 6vw, 96px);
      max-width: 1440px;
      margin: 0 auto;
      scroll-margin-top: 40px;
    }
    .head {
      text-align: center;
      margin-bottom: 56px;
    }
    .bento {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
      grid-auto-rows: 240px;
      grid-auto-flow: dense;
      gap: 14px;
    }
    .bento button {
      position: relative;
      overflow: hidden;
      padding: 0;
      border: 0;
      background: var(--blush);
      cursor: zoom-in;
    }
    .bento img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.9s ease;
    }
    .bento button:hover img {
      transform: scale(1.06);
    }
    .tag {
      position: absolute;
      left: 14px;
      bottom: 14px;
      background: var(--cream);
      color: var(--ink);
      padding: 8px 14px;
      font-family: var(--serif);
      font-size: 17px;
      text-align: left;
      max-width: calc(100% - 28px);
    }
    /* Bento spans only once there's room for them (design: desktop ≥ 900px). */
    @media (min-width: 900px) {
      .wide { grid-column: span 2; }
      .tall { grid-row: span 2; }
    }
    @media (min-width: 540px) and (max-width: 899px) {
      .tall { grid-row: span 2; }
    }
    @media (max-width: 539px) {
      .bento {
        grid-auto-rows: 280px;
      }
    }

    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 80;
      background: rgba(251, 246, 242, 0.97);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(16px, 5vw, 72px);
      animation: fade 0.3s ease;
    }
    .lightbox > img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
    }
    .caption {
      position: absolute;
      bottom: 24px;
      left: 0;
      right: 0;
      padding: 0 16px;
      text-align: center;
      font-family: var(--serif);
      font-size: 22px;
      color: var(--ink);
    }
    .caption span {
      font-family: var(--sans);
      font-size: 12px;
      letter-spacing: 0.2em;
      color: var(--gold);
      margin-left: 12px;
      white-space: nowrap;
    }
    .lb-prev,
    .lb-next {
      position: absolute;
      top: 50%;
      margin-top: -26px;
      background: var(--cream);
    }
    .lb-prev { left: clamp(8px, 2vw, 32px); }
    .lb-next { right: clamp(8px, 2vw, 32px); }
    .lb-close {
      position: absolute;
      top: 18px;
      right: 22px;
      background: none;
      border: 0;
      color: var(--ink);
      font-size: 36px;
      line-height: 1;
      font-family: var(--serif);
      cursor: pointer;
    }
    @media (max-width: 599px) {
      .lightbox > img {
        max-height: 70vh;
      }
      .lb-prev,
      .lb-next {
        top: auto;
        bottom: 70px;
        margin-top: 0;
      }
    }
    @keyframes fade {
      from { opacity: 0; }
    }
  `,
})
export class Events {
  protected readonly events = EVENTS;
  protected readonly open = signal(-1);
  protected readonly current = computed(() => EVENTS[this.open()] ?? null);
  protected readonly counter = computed(() => `${pad(this.open() + 1)} / ${pad(EVENTS.length)}`);

  constructor() {
    effect((onCleanup) => {
      if (this.open() < 0) return;
      lockScroll(true);
      onCleanup(() => lockScroll(false));
    });
  }

  protected close() {
    this.open.set(-1);
  }

  protected step(d: number, e?: Event) {
    e?.stopPropagation();
    const n = EVENTS.length;
    this.open.update((i) => (i + d + n) % n);
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.open() < 0) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.step(1);
    if (e.key === 'ArrowLeft') this.step(-1);
  }
}
