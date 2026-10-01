import { Component, HostListener, effect, signal } from '@angular/core';
import { LOGO, NAV_LINKS } from '../core/site.data';
import { lockScroll } from '../core/scroll-lock';

@Component({
  selector: 'app-site-header',
  template: `
    <header class="nav" [class.scrolled]="scrolled()">
      <nav class="links left" aria-label="Primary">
        @for (l of linksL; track l.href) {
          <a [href]="l.href">{{ l.label }}</a>
        }
      </nav>
      <button
        class="burger"
        type="button"
        aria-label="Menu"
        [attr.aria-expanded]="menuOpen()"
        (click)="menuOpen.set(true)"
      >
        <span></span><span></span><span class="short"></span>
      </button>

      <a href="#top" class="brand">
        <img [src]="logo" alt="Surreal's Cadeau" />
      </a>

      <div class="right">
        <nav class="links" aria-label="Secondary">
          @for (l of linksR; track l.href) {
            <a [href]="l.href">{{ l.label }}</a>
          }
        </nav>
        <a href="#visit" class="book">Book</a>
      </div>
    </header>

    @if (menuOpen()) {
      <div class="menu" role="dialog" aria-modal="true" aria-label="Menu">
        <button class="close" type="button" aria-label="Close menu" (click)="menuOpen.set(false)">
          ×
        </button>
        <img [src]="logo" alt="" class="menu-logo" />
        @for (l of links; track l.href; let i = $index) {
          <a [href]="l.href" [style.animation-delay.ms]="80 + i * 60" (click)="menuOpen.set(false)">{{
            l.label
          }}</a>
        }
      </div>
    }
  `,
  styles: `
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 24px;
      padding: 18px clamp(20px, 5vw, 72px);
      background: var(--cream);
      border-bottom: 1px solid transparent;
      transition: all 0.4s ease;
    }
    .nav.scrolled {
      padding-block: 10px;
      background: rgba(251, 246, 242, 0.92);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom-color: rgba(43, 26, 34, 0.08);
    }
    .links {
      display: flex;
      gap: 32px;
    }
    .links a {
      color: var(--ink);
      font-size: 12px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
    .links a:hover {
      color: var(--rose);
    }
    .brand {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .brand img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid rgba(176, 141, 87, 0.6);
      transition: all 0.4s ease;
    }
    .scrolled .brand img {
      width: 44px;
      height: 44px;
    }
    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 32px;
    }
    .book {
      padding: 11px 20px;
      background: var(--ink);
      color: var(--cream);
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .book:hover {
      background: var(--rose);
      color: var(--cream);
    }
    .burger {
      display: none;
      justify-self: start;
      background: none;
      border: 0;
      padding: 10px 0;
      cursor: pointer;
      flex-direction: column;
      gap: 6px;
    }
    .burger span {
      display: block;
      width: 26px;
      height: 1px;
      background: var(--ink);
    }
    .burger .short {
      width: 18px;
    }

    @media (max-width: 899px) {
      .links {
        display: none;
      }
      .burger {
        display: flex;
      }
      .nav {
        gap: 12px;
      }
    }

    .menu {
      position: fixed;
      inset: 0;
      z-index: 60;
      background: var(--blush);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 26px;
      padding: 24px;
      overflow-y: auto;
      animation: fade 0.35s ease;
    }
    .close {
      position: absolute;
      top: 20px;
      right: 24px;
      background: none;
      border: 0;
      font-size: 34px;
      font-family: var(--serif);
      color: var(--ink);
      cursor: pointer;
      line-height: 1;
    }
    .menu-logo {
      width: 88px;
      height: 88px;
      border-radius: 50%;
    }
    .menu a {
      font-family: var(--serif);
      font-size: 36px;
      color: var(--ink);
      animation: rise 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;
    }
    .menu a:hover {
      color: var(--rose);
    }
    @keyframes fade {
      from { opacity: 0; }
    }
    @keyframes rise {
      from { opacity: 0; transform: translateY(16px); }
    }
  `,
})
export class SiteHeader {
  protected readonly logo = LOGO;
  protected readonly links = NAV_LINKS;
  protected readonly linksL = NAV_LINKS.slice(0, 3);
  protected readonly linksR = NAV_LINKS.slice(3);
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  constructor() {
    this.onScroll();
    effect((onCleanup) => {
      if (!this.menuOpen()) return;
      lockScroll(true);
      onCleanup(() => lockScroll(false));
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 60);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 900) this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.menuOpen.set(false);
  }
}
