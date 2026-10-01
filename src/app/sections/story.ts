import { Component } from '@angular/core';
import { LOGO } from '../core/site.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-story',
  imports: [RevealDirective],
  template: `
    <section id="story">
      <img reveal="fade" [src]="logo" alt="" />
      <h2 reveal>
        Owned by a Flight Attendant couple, inspired by their daughter
        <span class="name">Surreal</span>
      </h2>
      <p reveal [delay]="150">
        "<span class="word">Cadeau</span>" meanwhile, is a French word for gift/present, for special
        occasions.
      </p>
    </section>
  `,
  styles: `
    section {
      padding: clamp(100px, 14vw, 200px) clamp(20px, 6vw, 96px);
      text-align: center;
      max-width: 1100px;
      margin: 0 auto;
      scroll-margin-top: 60px;
    }
    img {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      margin: 0 auto 40px;
    }
    h2 {
      margin: 0;
      font-family: var(--serif);
      font-weight: 400;
      font-size: clamp(34px, 4.4vw, 60px);
      line-height: 1.18;
      text-wrap: balance;
    }
    .name {
      font-family: var(--script);
      color: var(--rose);
      font-size: 1.25em;
    }
    p {
      margin: 40px auto 0;
      max-width: 560px;
      font-size: 17px;
      line-height: 1.75;
      font-weight: 300;
      color: var(--muted);
    }
    .word {
      font-family: var(--serif);
      font-style: italic;
      font-size: 21px;
      color: var(--ink);
    }
  `,
})
export class Story {
  protected readonly logo = LOGO;
}
