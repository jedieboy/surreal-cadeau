import { Component } from '@angular/core';
import { SiteHeader } from './sections/site-header';
import { Hero } from './sections/hero';
import { Story } from './sections/story';
import { Services } from './sections/services';
import { Atelier } from './sections/atelier';
import { Reel } from './sections/reel';
import { Quote } from './sections/quote';
import { Events } from './sections/events';
import { Visit } from './sections/visit';
import { SiteFooter } from './sections/site-footer';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, Hero, Story, Services, Atelier, Reel, Quote, Events, Visit, SiteFooter],
  template: `
    <app-site-header />
    <main>
      <app-hero />
      <app-story />
      <app-services />
      <app-atelier />
      <app-reel />
      <app-quote />
      <app-events />
      <app-visit />
    </main>
    <app-site-footer />
  `,
  styles: `:host { display: block; position: relative; overflow-x: clip; }`,
})
export class App {}
