import { Component } from '@angular/core';
import { SITE } from '../core/site.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-site-footer',
  imports: [RevealDirective],
  template: `
    <footer>
      <span class="script" reveal>Surreal's Cadeau</span>
      <span class="meta">Flowers · Café · Events — Sorsogon, Philippines</span>
      <a [href]="site.instagram" target="_blank" rel="noopener">{{ site.instagramHandle }}</a>
    </footer>
  `,
  styles: `
    footer {
      padding: 56px clamp(20px, 6vw, 96px) 40px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }
    .script {
      font-family: var(--script);
      font-size: clamp(48px, 7vw, 96px);
      line-height: 1;
      color: var(--rose);
    }
    .meta {
      font-size: 12px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
      line-height: 1.8;
    }
    a {
      font-size: 14px;
    }
  `,
})
export class SiteFooter {
  protected readonly site = SITE;
}
