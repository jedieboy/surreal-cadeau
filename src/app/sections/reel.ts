import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SITE } from '../core/site.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-reel',
  imports: [RevealDirective],
  template: `
    <section id="reel">
      <div class="video" reveal>
        <iframe
          [src]="embed"
          title="Surreal's Cadeau reel"
          loading="lazy"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div class="copy">
        <div class="eyebrow" reveal>Inside the atelier</div>
        <h2 class="section-title" reveal [delay]="100">
          A room full of <span class="accent">blooms</span>
        </h2>
        <div class="pair">
          <div class="shot" reveal [delay]="200">
            <img src="img/hd/shop-girl.jpg" alt="Inside the flower shop" loading="lazy" />
          </div>
          <div class="shot offset" reveal [delay]="320">
            <img src="img/hd/shop.jpg" alt="Bouquet wall" loading="lazy" />
          </div>
        </div>
        <a class="link-line" reveal [delay]="400" [href]="reelUrl" target="_blank" rel="noopener"
          >Watch on Facebook →</a
        >
      </div>
    </section>
  `,
  styles: `
    section {
      padding: clamp(80px, 10vw, 140px) clamp(20px, 6vw, 96px);
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: clamp(40px, 6vw, 96px);
    }
    .video {
      flex: 0 1 340px;
      width: 100%;
      max-width: 340px;
      aspect-ratio: 9 / 16;
      background: var(--ink);
      overflow: hidden;
      box-shadow: 0 40px 80px -40px rgba(43, 26, 34, 0.5);
    }
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }
    .copy {
      flex: 1 1 360px;
      max-width: 520px;
    }
    .pair {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-top: 36px;
    }
    .shot {
      aspect-ratio: 4 / 5;
      overflow: hidden;
    }
    .shot.offset {
      margin-top: 40px;
    }
    .shot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .link-line {
      margin-top: 32px;
    }

    @media (max-width: 599px) {
      .copy {
        flex-basis: 100%;
      }
      .shot.offset {
        margin-top: 28px;
      }
    }
  `,
})
export class Reel {
  protected readonly reelUrl = SITE.reelUrl;
  protected readonly embed = inject(DomSanitizer).bypassSecurityTrustResourceUrl(SITE.reelEmbed);
}
