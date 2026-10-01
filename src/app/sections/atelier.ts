import { Component, ElementRef, viewChild } from '@angular/core';
import { PIECES, pad } from '../core/site.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-atelier',
  imports: [RevealDirective],
  template: `
    <section id="atelier">
      <div class="head">
        <div>
          <div class="eyebrow" reveal>The flower atelier</div>
          <h2 class="section-title" reveal [delay]="100">
            Wrapped by <span class="accent">hand</span>
          </h2>
        </div>
        <div class="controls" reveal="fade">
          <button type="button" class="round-btn" aria-label="Previous" (click)="scroll(-1)">←</button>
          <button type="button" class="round-btn" aria-label="Next" (click)="scroll(1)">→</button>
        </div>
      </div>

      <div class="track" #track>
        @for (p of pieces; track p.src; let i = $index) {
          <article class="piece" reveal="left" [delay]="i * 90">
            <div class="frame">
              <img [src]="p.src" [alt]="p.name" loading="lazy" />
            </div>
            <div class="meta">
              <h3>{{ p.name }}</h3>
              <span>{{ num(i) }}</span>
            </div>
            <p>{{ p.note }}</p>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    section {
      background: var(--blush);
      padding: clamp(80px, 10vw, 140px) 0;
      scroll-margin-top: 60px;
    }
    .head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
      flex-wrap: wrap;
      padding: 0 var(--gutter);
      margin-bottom: 48px;
    }
    .controls {
      display: flex;
      gap: 10px;
    }
    .track {
      display: flex;
      gap: 24px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      padding: 0 var(--gutter);
      scroll-padding: 0 var(--gutter);
      -webkit-overflow-scrolling: touch;
    }
    .track::-webkit-scrollbar {
      display: none;
    }
    .piece {
      flex: 0 0 clamp(260px, 28vw, 380px);
      scroll-snap-align: start;
    }
    .frame {
      aspect-ratio: 4 / 5;
      overflow: hidden;
      background: var(--cream);
    }
    .frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 1s ease;
    }
    .frame:hover img {
      transform: scale(1.05);
    }
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      margin-top: 18px;
    }
    h3 {
      margin: 0;
      font-family: var(--serif);
      font-weight: 500;
      font-size: 24px;
    }
    .meta span {
      font-family: var(--serif);
      font-size: 16px;
      color: var(--gold);
    }
    p {
      margin: 8px 0 0;
      font-size: 14px;
      line-height: 1.65;
      font-weight: 300;
      color: var(--muted);
    }

    @media (max-width: 599px) {
      .piece {
        flex-basis: 78vw;
      }
      .track {
        gap: 16px;
      }
    }
  `,
})
export class Atelier {
  protected readonly pieces = PIECES;
  protected readonly num = (i: number) => pad(i + 1);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  protected scroll(dir: number) {
    const el = this.track().nativeElement;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 420), behavior: 'smooth' });
  }
}
