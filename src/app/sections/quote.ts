import { Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';
import { ParallaxDirective } from '../shared/parallax.directive';

@Component({
  selector: 'app-quote',
  imports: [RevealDirective, ParallaxDirective],
  template: `
    <section>
      <div class="bg" [parallax]="-0.3">
        <img src="img/hd/hall.jpg" alt="" loading="lazy" />
      </div>
      <div class="veil"></div>
      <div class="text">
        <div class="script" reveal>A vision of refined celebrations</div>
        <div class="sign" reveal="fade" [delay]="300">Surreal's Cadeau</div>
      </div>
    </section>
  `,
  styles: `
    section {
      position: relative;
      height: clamp(440px, 80vh, 760px);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .bg {
      position: absolute;
      inset: -25% 0;
    }
    .bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .veil {
      position: absolute;
      inset: 0;
      background: rgba(43, 26, 34, 0.5);
    }
    .text {
      position: relative;
      padding: 0 24px;
      color: var(--cream);
    }
    .script {
      font-family: var(--script);
      font-size: clamp(48px, 8vw, 116px);
      line-height: 1.05;
    }
    .sign {
      margin-top: 22px;
      font-size: 12px;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--champagne);
    }
  `,
})
export class Quote {}
