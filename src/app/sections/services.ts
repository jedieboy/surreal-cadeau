import { Component } from '@angular/core';
import { HOUSES, pad } from '../core/site.data';
import { RevealDirective } from '../shared/reveal.directive';
import { ParallaxDirective } from '../shared/parallax.directive';

@Component({
  selector: 'app-services',
  imports: [RevealDirective, ParallaxDirective],
  template: `
    <section>
      @for (h of houses; track h.id; let i = $index; let odd = $odd) {
        <div class="house" [id]="h.id" [class.reverse]="odd">
          <div class="media" [reveal]="odd ? 'left' : 'right'">
            <img [parallax]="0.08" [src]="h.src" [alt]="h.title" loading="lazy" />
          </div>
          <div class="copy">
            <div class="num" reveal>{{ num(i) }}</div>
            <h3 reveal [delay]="100">{{ h.title }}</h3>
            <p reveal [delay]="200">{{ h.body }}</p>
            <a class="link-line" reveal [delay]="300" [href]="h.href">{{ h.cta }} →</a>
          </div>
        </div>
      }
    </section>
  `,
  styles: `
    section {
      padding: 0 clamp(20px, 6vw, 96px) clamp(80px, 10vw, 140px);
      max-width: 1440px;
      margin: 0 auto;
      display: grid;
      gap: clamp(80px, 10vw, 140px);
    }
    .house {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: clamp(40px, 6vw, 96px);
      scroll-margin-top: 100px;
    }
    .house.reverse {
      flex-direction: row-reverse;
    }
    .media {
      flex: 1 1 440px;
      position: relative;
      aspect-ratio: 5 / 4;
      overflow: hidden;
    }
    .media img {
      width: 100%;
      height: 120%;
      margin-top: -10%;
      object-fit: cover;
    }
    .copy {
      flex: 1 1 340px;
      max-width: 480px;
    }
    .num {
      font-family: var(--serif);
      font-size: 96px;
      line-height: 1;
      color: var(--pink);
    }
    h3 {
      margin: 8px 0 18px;
      font-family: var(--serif);
      font-weight: 400;
      font-size: clamp(36px, 4vw, 54px);
      line-height: 1.05;
    }
    p {
      margin: 0;
      font-size: 16px;
      line-height: 1.75;
      font-weight: 300;
      color: var(--muted);
      text-wrap: pretty;
    }

    @media (max-width: 599px) {
      .media {
        flex-basis: 100%;
      }
      .num {
        font-size: 72px;
      }
    }
  `,
})
export class Services {
  protected readonly houses = HOUSES;
  protected readonly num = (i: number) => pad(i + 1);
}
