import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SLIDES, pad } from '../core/site.data';
import { RevealDirective } from '../shared/reveal.directive';
import { ParallaxDirective } from '../shared/parallax.directive';

const INTERVAL_MS = 6000;

@Component({
  selector: 'app-hero',
  imports: [RevealDirective, ParallaxDirective],
  template: `
    <section id="top" class="hero">
      <div class="copy">
        <div>
          <div class="eyebrow kicker" reveal>Flowers · Café · Events</div>
          <h1 reveal [delay]="120">
            The first Parisian <span class="accent">Pink</span> Themed Flower Atelier
          </h1>
          <div class="script" reveal [delay]="240">Surreal's Cadeau</div>
          <p reveal [delay]="340">+ Café/Catering + Event Styling Brand</p>
        </div>

        <div class="switcher" reveal [delay]="440">
          @for (s of slides; track s.src; let i = $index) {
            <button type="button" [class.active]="i === slide()" (click)="go(i)">
              <span class="num">{{ num(i) }}</span>
              <span class="cap">{{ s.caption }}</span>
              <span class="bar"></span>
            </button>
          }
        </div>
      </div>

      <div class="media">
        <div class="stack" [parallax]="-0.25">
          @for (s of slides; track s.src; let i = $index) {
            <div class="slide" [class.active]="i === slide()">
              <img
                [src]="s.src"
                [alt]="s.caption"
                [attr.fetchpriority]="i === 0 ? 'high' : null"
                [attr.loading]="i === 0 ? null : 'lazy'"
              />
            </div>
          }
        </div>
        <div class="arrows">
          <button type="button" class="prev" aria-label="Previous" (click)="go(slide() - 1)">←</button>
          <button type="button" class="next" aria-label="Next" (click)="go(slide() + 1)">→</button>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      min-height: 100vh;
      min-height: 100svh;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 460px), 1fr));
      padding-top: 96px;
    }
    .copy {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 56px;
      padding: clamp(40px, 6vw, 96px) clamp(20px, 5vw, 72px);
    }
    .kicker {
      margin-bottom: 28px;
    }
    h1 {
      margin: 0;
      font-family: var(--serif);
      font-weight: 400;
      font-size: clamp(48px, 6.4vw, 104px);
      line-height: 0.98;
      letter-spacing: -0.01em;
    }
    .script {
      font-family: var(--script);
      font-size: clamp(40px, 4.6vw, 68px);
      color: var(--gold);
      margin-top: 18px;
    }
    p {
      margin: 28px 0 0;
      max-width: 420px;
      font-size: 16px;
      line-height: 1.75;
      font-weight: 300;
      color: var(--muted);
    }
    .switcher {
      display: grid;
      max-width: 440px;
    }
    .switcher button {
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr) auto;
      align-items: center;
      gap: 14px;
      padding: 14px 0;
      border: 0;
      border-top: 1px solid var(--line);
      background: none;
      cursor: pointer;
      text-align: left;
      color: var(--ink);
      transition: color 0.4s;
    }
    .switcher button:hover,
    .switcher button.active {
      color: var(--rose);
    }
    .num {
      font-family: var(--serif);
      font-size: 18px;
    }
    .cap {
      font-size: 12px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
    .bar {
      display: block;
      height: 1px;
      width: 0;
      background: var(--rose);
      transition: width 0.6s ease;
    }
    .active .bar {
      width: 48px;
    }

    .media {
      position: relative;
      min-height: 70vh;
      overflow: hidden;
      background: var(--blush);
    }
    .stack {
      position: absolute;
      inset: -12% 0;
    }
    .slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      clip-path: inset(0 0 0 100%);
      transition:
        opacity 1s ease,
        clip-path 1.2s cubic-bezier(0.7, 0, 0.2, 1);
    }
    .slide.active {
      opacity: 1;
      clip-path: inset(0 0 0 0);
    }
    .slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: transform 8s ease-out;
    }
    .slide.active img {
      transform: scale(1.08);
    }
    .arrows {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
    }
    .arrows button {
      width: 64px;
      height: 64px;
      border: 0;
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .prev {
      background: var(--cream);
      color: var(--ink);
    }
    .prev:hover {
      background: var(--blush);
    }
    .next {
      background: var(--ink);
      color: var(--cream);
    }
    .next:hover {
      background: var(--rose);
    }

    @media (max-width: 599px) {
      .hero {
        padding-top: 80px;
      }
      .copy {
        gap: 40px;
      }
      .media {
        min-height: 62vh;
      }
      .arrows button {
        width: 56px;
        height: 56px;
      }
    }
  `,
})
export class Hero implements OnInit, OnDestroy {
  protected readonly slides = SLIDES;
  protected readonly slide = signal(0);
  protected readonly num = (i: number) => pad(i + 1);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.restart();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  protected go(i: number, auto = false) {
    const n = this.slides.length;
    this.slide.set((i + n) % n);
    if (!auto) this.restart();
  }

  private restart() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.go(this.slide() + 1, true), INTERVAL_MS);
  }
}
