import { Component } from '@angular/core';
import { CONTACTS, SITE } from '../core/site.data';
import { RevealDirective } from '../shared/reveal.directive';
import { ParallaxDirective } from '../shared/parallax.directive';

@Component({
  selector: 'app-visit',
  imports: [RevealDirective, ParallaxDirective],
  template: `
    <section id="visit">
      <div class="bg" [parallax]="-0.2">
        <img src="img/hd/storefront.jpg" alt="" loading="lazy" />
      </div>
      <div class="veil"></div>
      <div class="card" reveal>
        <div class="eyebrow">Visit the atelier</div>
        <h2>Come for flowers, <span class="accent">stay for café.</span></h2>
        @for (c of contacts; track c.label) {
          <div class="row">
            <span class="label">{{ c.label }}</span>
            <a
              [href]="c.href"
              [attr.target]="c.href.startsWith('http') ? '_blank' : null"
              [attr.rel]="c.href.startsWith('http') ? 'noopener' : null"
              >{{ c.value }}</a
            >
          </div>
        }
        <div class="actions">
          <a class="solid" [href]="site.messenger" target="_blank" rel="noopener">Message us</a>
          <a class="ghost" [href]="site.phone">Call us</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    section {
      position: relative;
      padding: clamp(80px, 10vw, 140px) clamp(20px, 6vw, 96px);
      overflow: hidden;
      scroll-margin-top: 40px;
    }
    .bg {
      position: absolute;
      inset: -20% 0;
    }
    .bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .veil {
      position: absolute;
      inset: 0;
      background: rgba(43, 26, 34, 0.35);
    }
    .card {
      position: relative;
      max-width: 640px;
      margin: 0 auto;
      background: var(--cream);
      padding: clamp(32px, 5vw, 64px);
    }
    .eyebrow {
      margin-bottom: 16px;
    }
    h2 {
      margin: 0 0 32px;
      font-family: var(--serif);
      font-weight: 400;
      font-size: clamp(34px, 4vw, 52px);
      line-height: 1.05;
    }
    .row {
      display: grid;
      grid-template-columns: 110px minmax(0, 1fr);
      gap: 16px;
      padding: 16px 0;
      border-top: 1px solid var(--line);
    }
    .label {
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--gold);
      padding-top: 4px;
    }
    .row a {
      color: var(--ink);
      font-family: var(--serif);
      font-size: 20px;
      line-height: 1.35;
      overflow-wrap: anywhere;
    }
    .row a:hover {
      color: var(--rose);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 32px;
    }
    .actions a {
      padding: 15px 26px;
      font-size: 12px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      text-align: center;
    }
    .solid {
      background: var(--ink);
      color: var(--cream);
    }
    .solid:hover {
      background: var(--rose);
      color: var(--cream);
    }
    .ghost {
      border: 1px solid var(--ink);
      color: var(--ink);
    }
    .ghost:hover {
      background: var(--blush);
      color: var(--ink);
    }

    @media (max-width: 479px) {
      .row {
        grid-template-columns: 1fr;
        gap: 6px;
      }
      .label {
        padding-top: 0;
      }
      .actions a {
        flex: 1 1 100%;
      }
    }
  `,
})
export class Visit {
  protected readonly contacts = CONTACTS;
  protected readonly site = SITE;
}
