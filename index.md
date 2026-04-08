---
layout: default
title: SpicyNoodles
---
{% assign noodle_products = site.data.noodles.products %}
{% assign achar_products = site.data.achar.products %}
{% assign all_products = noodle_products | concat: achar_products %}
{% assign promo_settings = site.data.homepage.promo_home %}
{% assign promo_ids = promo_settings.item_ids %}
{% assign promo_limit = promo_settings.max_items | default: 6 %}
{% assign has_custom_promo_ids = false %}
{% if promo_ids and promo_ids.size > 0 %}
  {% assign has_custom_promo_ids = true %}
{% endif %}
{% assign promo_product = nil %}
{% if has_custom_promo_ids %}
  {% for pid in promo_ids %}
    {% assign candidate = all_products | where: 'id', pid | first %}
    {% if candidate %}
      {% assign promo_product = candidate %}
      {% break %}
    {% endif %}
  {% endfor %}
{% else %}
  {% assign promo_product = all_products | where: 'promo', true | first %}
{% endif %}
{% if promo_product == nil %}
  {% assign promo_product = all_products | first %}
{% endif %}

<style>
  .home-shell {
    display: grid;
    gap: 5rem;
  }

  .section-frame {
    background: var(--sand);
    border: 1px solid rgba(74, 48, 32, 0.13);
    border-radius: 16px;
    padding: 2.8rem 2.5rem;
  }

  .hero-section {
    background: transparent;
    padding: 2rem 0 1rem;
  }

  /* transparent section — sits open on the page cream */
  .section-open {
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0;
  }

  /* dark showcase section */
  .section-dark {
    background: var(--ink);
    border: none;
    border-radius: 20px;
    padding: 3rem 2.8rem;
  }

  .section-dark .section-eyebrow {
    background: rgba(201, 138, 45, 0.2);
    color: var(--saffron-gold);
  }

  .section-dark .section-title {
    color: var(--cream);
  }

  .section-dark .home-promo-link {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.28);
    border-color: rgba(255, 255, 255, 0.04);
  }

  .section-head {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .section-eyebrow {
    display: inline-block;
    padding: 0.2rem 0.62rem;
    border-radius: 999px;
    background: var(--chili-blush);
    color: var(--deep-chili);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-family: 'DM Mono', ui-monospace, monospace;
    font-weight: 500;
  }

  .section-title {
    margin: 0.45rem 0 0;
    font-family: 'Playfair Display', serif;
    color: var(--ink);
    font-size: clamp(1.45rem, 2.4vw, 2.35rem);
    line-height: 1.15;
  }

  .section-title.display {
    font-size: clamp(2.6rem, 4.5vw, 4.2rem);
    font-weight: 900;
    letter-spacing: -0.5px;
    line-height: 1.05;
  }

  .section-copy {
    margin: 0;
    color: var(--earth);
    max-width: 60ch;
  }

  .home-hero-grid {
    position: relative;
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2.25rem;
  }

  .hero-btn {
    display: inline-block;
    min-height: 48px;
    padding: 0.85rem 1.5rem;
    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 0.88rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    line-height: 1.4;
  }

  .hero-btn-primary {
    background: var(--chili-red);
    color: #fff;
  }

  .hero-btn-primary:hover {
    background: var(--deep-chili);
    color: #fff;
  }

  .hero-btn-ghost {
    border-color: rgba(74, 48, 32, 0.3);
    color: var(--earth);
    background: transparent;
  }

  .hero-btn-ghost:hover {
    border-color: var(--chili-red);
    color: var(--chili-red);
  }

  .hero-note-box {
    position: relative;
    background: #fff;
    border: 1px solid rgba(74, 48, 32, 0.13);
    border-top: 3px solid var(--chili-red);
    border-radius: 12px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    box-shadow: 0 4px 24px rgba(28,16,7,0.06);
  }

  .hero-note-box--hidden {
    display: none;
  }

  .hero-note-dismiss {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 1.7rem;
    height: 1.7rem;
    border: 1px solid rgba(74, 48, 32, 0.2);
    border-radius: 999px;
    background: var(--cream);
    color: var(--earth);
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .hero-note-dismiss:hover {
    background: var(--chili-blush);
    color: var(--deep-chili);
    border-color: rgba(208, 41, 10, 0.35);
  }

  .hero-note-reopen {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    border: 1px solid rgba(74, 48, 32, 0.24);
    border-radius: 999px;
    background: #fff;
    color: var(--earth);
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 18px rgba(28, 16, 7, 0.12);
    z-index: 5;
  }

  .hero-note-reopen.is-visible {
    display: inline-flex;
  }

  .hero-note-reopen:hover {
    background: var(--chili-blush);
    color: var(--deep-chili);
    border-color: rgba(208, 41, 10, 0.35);
  }

  .hero-note-box h3 {
    margin: 0 0 0.15rem;
    font-size: 1.1rem;
    color: var(--ink);
    font-family: 'Playfair Display', serif;
  }

  .hero-note-box p {
    margin: 0;
    color: var(--mist);
    font-size: 0.88rem;
    line-height: 1.6;
  }

  .hero-note-divider {
    border: none;
    border-top: 1px solid rgba(74,48,32,0.12);
    margin: 0;
  }

  .hero-note-contact {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .hero-contact-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    padding: 0.6rem 0.85rem;
    border-radius: 8px;
    font-size: 0.84rem;
    font-weight: 600;
    line-height: 1.2;
    transition: background 0.15s, color 0.15s;
  }

  .hero-contact-btn.whatsapp {
    background: #128c7e;
    color: #fff;
  }

  .hero-contact-btn.whatsapp:hover {
    background: #0a6d61;
    color: #fff;
  }

  .hero-contact-btn.email {
    background: var(--sand);
    color: var(--earth);
    border: 1px solid rgba(74,48,32,0.18);
  }

  .hero-contact-btn.email:hover {
    background: var(--chili-blush);
    color: var(--deep-chili);
  }

  .hero-contact-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .hero-contact-label {
    display: flex;
    flex-direction: column;
  }

  .hero-contact-label span {
    font-size: 0.7rem;
    font-family: 'DM Mono', ui-monospace, monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.75;
    font-weight: 400;
  }

  .hero-note-fact {
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--mist);
  }

  .trust-strip {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .trust-nav-link {
    display: none;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 999px;
    border: 1px solid rgba(74, 48, 32, 0.2);
    background: #fff;
    color: var(--earth);
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 1.05rem;
    font-weight: 700;
    text-decoration: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    box-shadow: 0 6px 18px rgba(28, 16, 7, 0.12);
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    pointer-events: auto;
    animation: trustNavFloat 1.8s ease-in-out infinite;
  }

  .trust-nav-link:hover {
    transform: translateY(-50%) scale(1.06);
    box-shadow: 0 10px 24px rgba(28, 16, 7, 0.16);
  }

  .trust-nav-link--prev {
    left: -0.55rem;
  }

  .trust-nav-link--next {
    right: -0.55rem;
  }

  .trust-nav-link.is-hidden {
    opacity: 0;
    pointer-events: none;
  }

  .trust-nav-link.is-disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  @keyframes trustNavFloat {
    0% {
      transform: translateY(-50%) translateX(0);
    }
    50% {
      transform: translateY(-50%) translateX(2px);
    }
    100% {
      transform: translateY(-50%) translateX(0);
    }
  }

  .trust-card {
    border: 1px solid rgba(74, 48, 32, 0.14);
    border-radius: 14px;
    padding: 1.25rem 1.15rem 1.1rem;
    background: #fff;
    display: grid;
    gap: 0.62rem;
  }

  .trust-card--spice {
    background: linear-gradient(180deg, #fff5f2 0%, #fff9f7 100%);
    border-color: rgba(208, 41, 10, 0.2);
  }

  .trust-card--gold {
    background: linear-gradient(180deg, #fff9ef 0%, #fffdf8 100%);
    border-color: rgba(201, 138, 45, 0.24);
  }

  .trust-card--green {
    background: linear-gradient(180deg, #f0f7f1 0%, #f9fdf9 100%);
    border-color: rgba(58, 107, 53, 0.24);
  }

  .trust-stephead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .trust-stepnum {
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    color: #fff;
    background: var(--chili-red);
    box-shadow: 0 4px 14px rgba(208, 41, 10, 0.25);
  }

  .trust-steptag {
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 999px;
    padding: 0.22rem 0.52rem;
    color: var(--earth);
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(74, 48, 32, 0.14);
  }

  .trust-proof {
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.6rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--mist);
    border-top: 1px dashed rgba(74, 48, 32, 0.24);
    padding-top: 0.62rem;
  }

  .trust-card h3 {
    margin: 0;
    font-size: 1.02rem;
    color: var(--ink);
    font-weight: 700;
  }

  .trust-card p {
    margin: 0;
    font-size: 0.87rem;
    color: var(--earth);
    opacity: 0.78;
    line-height: 1.5;
  }

  .trust-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.38rem;
  }

  .trust-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.28rem;
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.56rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--earth);
    border: 1px solid rgba(74, 48, 32, 0.2);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 999px;
    padding: 0.2rem 0.45rem;
  }

  /* ── Featured banner ─────────────────────────────── */
  .promoband {
    border-radius: 20px;
    overflow: hidden;
  }

  .promoband-inner {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 500px;
    background: radial-gradient(ellipse at 28% 68%, #7a1508 0%, #2e0905 45%, #1C1007 100%);
  }

  .promoband-left {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    isolation: isolate;
  }

  .promoband-left::before {
    content: '';
    position: absolute;
    bottom: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    padding-bottom: 80%;
    background: radial-gradient(circle, rgba(208, 41, 10, 0.4) 0%, transparent 68%);
    border-radius: 50%;
    filter: blur(28px);
    pointer-events: none;
  }

  .promoband-left::after {
    content: '';
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 58%;
    height: 36px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.35);
    filter: blur(18px);
    pointer-events: none;
    z-index: 0;
  }

  .promoband-product-img {
    position: relative;
    z-index: 1;
    width: auto;
    height: auto;
    max-width: 90%;
    max-height: 440px;
    object-fit: contain;
    object-position: center center;
    mix-blend-mode: multiply;
    filter: drop-shadow(0 28px 48px rgba(0,0,0,0.6)) saturate(1.05) contrast(1.04);
    transform: scale(1.03);
    transform-origin: center center;
  }

  .promoband-right {
    position: relative;
    z-index: 1;
    padding: 3rem 3rem 2.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.85rem;
    max-width: 560px;
    justify-self: start;
  }

  .promoband-brand-logo {
    height: 2.4rem;
    width: auto;
    object-fit: contain;
    opacity: 0.85;
    align-self: flex-start;
    margin-bottom: 0.25rem;
  }

  .promoband-eyebrow {
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--saffron-gold);
    margin: 0;
  }

  .promoband-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.75rem, 2.6vw, 2.8rem);
    font-weight: 900;
    color: #fff;
    line-height: 1.06;
    letter-spacing: -0.5px;
    margin: 0;
    max-width: 13ch;
  }

  .promoband-desc {
    color: rgba(247, 239, 228, 0.68);
    font-size: 0.93rem;
    line-height: 1.65;
    max-width: 33ch;
    margin: 0;
  }

  .promoband-btn {
    display: inline-block;
    width: fit-content;
    background: var(--chili-red);
    color: #fff !important;
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.85rem 1.9rem;
    border-radius: 6px;
    box-shadow: 0 4px 20px rgba(208, 41, 10, 0.5);
    transition: background 0.2s, box-shadow 0.2s;
    margin-top: 0.3rem;
  }

  .promoband-btn:hover {
    background: var(--deep-chili);
    box-shadow: 0 6px 28px rgba(208, 41, 10, 0.7);
  }

  .promoband-actions {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    flex-wrap: wrap;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    padding-top: 0.8rem;
    margin-top: 0.2rem;
  }

  .promoband-thumbs {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0;
  }

  .promoband-thumb {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 58px;
    height: 58px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 2px solid rgba(255,255,255,0.1);
    overflow: hidden;
    flex-shrink: 0;
    transition: border-color 0.2s, background 0.2s;
    appearance: none;
    padding: 0;
    cursor: pointer;
    isolation: isolate;
  }

  .promoband-thumb img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    padding: 4px;
    mix-blend-mode: multiply;
  }

  .promoband-thumb--active {
    border-color: var(--chili-red);
    background: rgba(208, 41, 10, 0.15);
  }

  .promoband-thumb:hover {
    border-color: var(--saffron-gold);
    background: rgba(201, 138, 45, 0.1);
  }

  .promoband-price {
    position: absolute;
    top: 15%;
    left: calc(48% - 0.9rem);
    transform: translate(-50%, -50%) rotate(-12deg);
    z-index: 3;
    pointer-events: none;
    filter: drop-shadow(0 6px 18px rgba(208, 41, 10, 0.7));
  }

  .promoband-price-star {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 96px;
    background: var(--chili-red);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 1.1rem;
    font-weight: 900;
    line-height: 1.2;
    text-align: center;
    clip-path: polygon(50% 0%,56% 20%,73% 5%,66% 25%,85% 15%,75% 33%,95% 30%,82% 46%,100% 50%,82% 54%,95% 70%,75% 67%,85% 85%,66% 75%,73% 95%,56% 80%,50% 100%,44% 80%,27% 95%,34% 75%,15% 85%,25% 67%,5% 70%,18% 54%,0% 50%,18% 46%,5% 30%,25% 33%,15% 15%,34% 25%,27% 5%,44% 20%);
  }

  .mini-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .mini-card {
    background: #fff;
    border: 1px solid rgba(74, 48, 32, 0.08);
    border-radius: 14px;
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 16px rgba(28, 16, 7, 0.07);
    transition: box-shadow 0.25s, transform 0.25s;
  }

  .mini-card:hover {
    box-shadow: 0 8px 32px rgba(28, 16, 7, 0.13);
    transform: translateY(-3px);
  }

  .mini-card-img {
    width: 100%;
    display: block;
    height: 180px;
    object-fit: contain;
    background: var(--cream);
    border-bottom: 1px solid rgba(74, 48, 32, 0.08);
  }

  .mini-card-body {
    padding: 1.4rem 1.4rem 1.6rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    border-top: 1px solid rgba(74, 48, 32, 0.07);
  }

  .mini-card h4 {
    margin: 0;
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    line-height: 1.3;
    color: var(--ink);
  }

  .mini-card p {
    margin: 0.6rem 0 1rem;
    color: var(--mist);
    font-size: 0.88rem;
    line-height: 1.6;
    flex: 1;
  }

  .mini-card a {
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    align-self: flex-start;
  }

  @media (max-width: 1024px) {
    .home-hero-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  @media (max-width: 980px) {
    .trust-strip {
      grid-template-columns: 1fr 1fr;
    }

    .promoband-inner {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .promoband-left {
      min-height: 280px;
    }

    .promoband-product-img {
      max-height: 260px;
      transform: scale(1.02);
    }

    .promoband-right {
      padding: 2rem 2rem 2.5rem;
      max-width: none;
    }

    .promoband-price {
      top: -1%;
      left: 60%;
      bottom: calc(38% + 0.5rem);
      right: 2rem;
      transform: rotate(-14deg);
    }
  }

  @media (max-width: 680px) {
    .trust-strip {
      grid-template-columns: 1fr;
    }

    .home-shell {
      gap: 3rem;
    }

    .section-frame {
      padding: 2rem 1.5rem;
    }

    /* Mobile landing: keep hero clarity, remove secondary long copy */
    .promoband-desc,
    .trust-proof {
      display: none;
    }

    .promoband {
      border-radius: 18px;
      overflow: hidden;
    }

    .promoband-inner {
      --promo-image-zone: 230px;
      overflow: hidden;
      border-radius: 18px;
    }

    .promoband-left {
      min-height: var(--promo-image-zone);
      padding: 1.6rem 0.9rem 0.75rem;
      border-radius: 18px 18px 0 0;
      align-items: flex-end;
    }

    .promoband-right {
      padding: 0.95rem 1rem 1.1rem;
      gap: 0.5rem;
    }

    .promoband-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-top: none;
      padding-top: 0;
      margin-top: 0.15rem;
    }

    .promoband-btn {
      margin-top: 0;
      white-space: nowrap;
    }

    .promoband-title {
      font-size: 1.25rem;
      line-height: 1.12;
      max-width: none;
    }

    .promoband-thumbs {
      gap: 0.4rem;
      margin-top: 0;
      margin-left: auto;
      justify-content: flex-end;
    }

    .promoband-thumb {
      width: 48px;
      height: 48px;
    }

    .promoband-price {
      top: 3%;
      left: 69%;
      transform: rotate(-10deg);
      z-index: 6;
    }
  }

  @media (max-width: 560px) {
    .promoband-inner {
      --promo-image-zone: 205px;
    }

    .promoband-price {
      right: 0.4rem;
      bottom: calc(100% - var(--promo-image-zone) + 0.28rem);
    }

    .promoband-price-star {
      width: 74px;
      height: 74px;
      font-size: 0.9rem;
    }

    .trust-strip {
      display: block;
      grid-template-columns: none;
      position: relative;
    }

    .trust-card {
      display: none;
      margin: 0;
      padding-left: 2.4rem;
      padding-right: 2.4rem;
    }

    .trust-card.is-active {
      display: grid;
    }

    .trust-nav-link {
      display: inline-flex;
    }
  }
</style>

<div class="home-shell">
  <section class="hero-section" aria-label="SpicyNoodles brand story">
    <div class="home-hero-grid">
      <div>
        <span class="section-eyebrow">Nepal-inspired &middot; Small batch &middot; Netherlands</span>
        <h1 class="section-title display">Authentic Nepal- Noodles &amp; Achar</h1>
        <p class="section-copy" style="margin-top:1.2rem;font-size:1.05rem;line-height:1.75;">Welcome to SpicyNoodles &mdash; from instant noodles to spicy achar jars, discover bold Himalayan flavors and order with easy stock confirmation.</p>
        <div class="hero-actions">
          <a class="hero-btn hero-btn-primary" href="{{ '/products/' | relative_url }}">Shop all products</a>
          <a class="hero-btn hero-btn-ghost" href="{{ '/achar/' | relative_url }}">Browse achar</a>
        </div>
      </div>
      <aside id="order-clarity-card" class="hero-note-box" aria-label="Ordering promise">
        <button id="order-clarity-dismiss" class="hero-note-dismiss" type="button" aria-label="Close ordering details">&times;</button>
        <div>
          <h3>Order with clarity</h3>
          <p>We confirm availability before payment. No surprises, no prepayment without confirmation.</p>
        </div>
        <hr class="hero-note-divider">
        <div class="hero-note-contact">
          <a href="https://wa.me/31621153774" target="_blank" rel="noopener" class="hero-contact-btn whatsapp">
            <span class="hero-contact-icon">&#x1F4AC;</span>
            <span class="hero-contact-label">WhatsApp<span>+31 6 2115 3774</span></span>
          </a>
          <a href="mailto:niru.nirajanpokharel@gmail.com" class="hero-contact-btn email">
            <span class="hero-contact-icon">&#x2709;</span>
            <span class="hero-contact-label">Contact us</span>
          </a>
        </div>
        <hr class="hero-note-divider">
        <p class="hero-note-fact">&#127758; Ships within the Netherlands</p>
      </aside>
      <button id="order-clarity-reopen" class="hero-note-reopen" type="button" aria-label="Show ordering details">i</button>
    </div>
  </section>

    <section class="promoband" aria-label="Featured product">
    <div class="promoband-inner">
      <div class="promoband-left">
        <img id="promoband-main-image" class="promoband-product-img" src="{{ promo_product.image | relative_url }}" alt="{{ promo_product.title }}">
      </div>
      <div class="promoband-right">
        {%- if promo_product.brandLogo %}
        <img id="promoband-brand-logo" class="promoband-brand-logo" src="{{ promo_product.brandLogo }}" alt="{{ promo_product.brandName }}" loading="lazy">
        {%- endif %}
        <p id="promoband-eyebrow" class="promoband-eyebrow">{{ promo_product.promoLabel | default: 'Featured Pick' }}</p>
        <h2 id="promoband-title" class="promoband-title">{{ promo_product.title }}</h2>
        <p id="promoband-desc" class="promoband-desc">{{ promo_product.description }}</p>
        <div class="promoband-actions">
          <a id="promoband-order-btn" class="promoband-btn" href="{{ '/products/' | append: promo_product.folder | append: '/' | relative_url }}">Order Now &rarr;</a>
          <div class="promoband-thumbs">
          {%- assign promo_rendered = 0 -%}
          {%- if has_custom_promo_ids -%}
            {%- for pid in promo_ids -%}
              {%- if promo_rendered >= promo_limit -%}{%- break -%}{%- endif -%}
              {%- assign product = all_products | where: 'id', pid | first -%}
              {%- if product -%}
              <button type="button" class="promoband-thumb{%- if product.id == promo_product.id %} promoband-thumb--active{%- endif %}" title="{{ product.title }}" data-promoband-id="{{ product.id }}" aria-label="Show {{ product.title }} in featured panel">
                <img src="{{ product.image | relative_url }}" alt="{{ product.title }}">
              </button>
              {%- assign promo_rendered = promo_rendered | plus: 1 -%}
              {%- endif -%}
            {%- endfor -%}
          {%- else -%}
            {%- for product in all_products -%}
              {%- if promo_rendered >= promo_limit -%}{%- break -%}{%- endif -%}
              {%- if product.promo -%}
              <button type="button" class="promoband-thumb{%- if product.id == promo_product.id %} promoband-thumb--active{%- endif %}" title="{{ product.title }}" data-promoband-id="{{ product.id }}" aria-label="Show {{ product.title }} in featured panel">
                <img src="{{ product.image | relative_url }}" alt="{{ product.title }}">
              </button>
              {%- assign promo_rendered = promo_rendered | plus: 1 -%}
              {%- endif -%}
            {%- endfor -%}
          {%- endif -%}
          </div>
        </div>
      </div>
      <div class="promoband-price" aria-hidden="true">
        <span id="promoband-price" class="promoband-price-star">&euro;&nbsp;{{ promo_product.price }}</span>
      </div>
    </div>
  </section>

<section class="section-open" aria-label="Why customers choose SpicyNoodles">
    <div class="section-head">
      <div>
        <span class="section-eyebrow">Why choose us</span>
        <h2 class="section-title">How your noodle order works</h2>
      </div>
    </div>
    <div class="trust-strip">
      <a href="#" class="trust-nav-link trust-nav-link--prev" data-trust-nav="prev" aria-label="Show previous order step">&larr;</a>
      <a href="#" class="trust-nav-link trust-nav-link--next" data-trust-nav="next" aria-label="Show next order step">&rarr;</a>
      <article class="trust-card trust-card--spice">
        <div class="trust-stephead">
          <span class="trust-stepnum">01</span>
          <span class="trust-steptag">Pick your heat</span>
        </div>
        <h3>Pick your vibe</h3>
        <p>Choose mild, bold, or fire in seconds.</p>
        <div class="trust-chips">
          <span class="trust-chip">&#x1F336; Heat scale</span>
          <span class="trust-chip">&#x23F1; Quick compare</span>
        </div>
      </article>
      <article class="trust-card trust-card--gold">
        <div class="trust-stephead">
          <span class="trust-stepnum">02</span>
          <span class="trust-steptag">Confirm stock</span>
        </div>
        <h3>We confirm stock first</h3>
        <p>No surprises. No random swaps.</p>
        <div class="trust-chips">
          <span class="trust-chip">&#x2705; Human check</span>
          <span class="trust-chip">&#x1F4E6; Real availability</span>
        </div>
      </article>
      <article class="trust-card trust-card--green">
        <div class="trust-stephead">
          <span class="trust-stepnum">03</span>
          <span class="trust-steptag">Fast checkout</span>
        </div>
        <h3>Checkout your way</h3>
        <p>WhatsApp or email, done in minutes.</p>
        <div class="trust-chips">
          <span class="trust-chip">&#x1F4AC; WhatsApp</span>
          <span class="trust-chip">&#x2709; Email</span>
        </div>
      </article>
    </div>
  </section>
</div>

<script>
  (function () {
    var featuredProducts = [
      {%- for product in all_products -%}
      {
        id: {{ product.id | jsonify }},
        title: {{ product.title | jsonify }},
        description: {{ product.description | jsonify }},
        image: {{ product.image | relative_url | jsonify }},
        brandName: {{ product.brandName | default: '' | jsonify }},
        brandLogo: {{ product.brandLogo | default: '' | jsonify }},
        folder: {{ product.folder | jsonify }},
        price: {{ product.price | jsonify }},
        promoLabel: {{ product.promoLabel | default: '' | jsonify }},
        promo: {% if product.promo %}true{% else %}false{% endif %}
      }{%- unless forloop.last -%},{%- endunless -%}
      {%- endfor -%}
    ];

    var productsById = {};
    featuredProducts.forEach(function (product) {
      productsById[String(product.id)] = product;
    });

    var mainImage = document.getElementById('promoband-main-image');
    var brandLogo = document.getElementById('promoband-brand-logo');
    var eyebrow = document.getElementById('promoband-eyebrow');
    var title = document.getElementById('promoband-title');
    var desc = document.getElementById('promoband-desc');    var price = document.getElementById('promoband-price');
    var orderBtn = document.getElementById('promoband-order-btn');
    var thumbs = Array.prototype.slice.call(document.querySelectorAll('[data-promoband-id]'));
    var orderClarityCard = document.getElementById('order-clarity-card');
    var orderClarityDismiss = document.getElementById('order-clarity-dismiss');
    var orderClarityReopen = document.getElementById('order-clarity-reopen');
    var trustCards = Array.prototype.slice.call(document.querySelectorAll('.trust-strip .trust-card'));
    var trustPrev = document.querySelector('[data-trust-nav="prev"]');
    var trustNext = document.querySelector('[data-trust-nav="next"]');
    var trustMobileQuery = window.matchMedia('(max-width: 560px)');
    var ORDER_CLARITY_KEY = 'spicynoodles.orderClarityDismissed';
    var activeTrustIndex = 0;

    if (mainImage && eyebrow && title && desc && price && orderBtn && thumbs.length) {
      function updateThumbStates(activeId) {
        thumbs.forEach(function (thumb) {
          var isActive = thumb.getAttribute('data-promoband-id') === String(activeId);
          thumb.classList.toggle('promoband-thumb--active', isActive);
          thumb.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      }

      function setFeaturedProduct(productId) {
        var product = productsById[String(productId)];
        if (!product) return;

        mainImage.src = product.image;
        mainImage.alt = product.title;
        title.textContent = product.title;
        desc.textContent = product.description;
        price.innerHTML = '&euro;&nbsp;' + product.price;
        if (product.promo) {
          eyebrow.textContent = product.promoLabel || 'Featured Pick';
        } else {
          eyebrow.textContent = 'Collection Pick';
        }
        orderBtn.href = '/products/' + product.folder + '/';

        if (brandLogo) {
          if (product.brandLogo) {
            brandLogo.src = product.brandLogo;
            brandLogo.alt = product.brandName || 'Brand logo';
            brandLogo.style.display = 'block';
          } else {
            brandLogo.style.display = 'none';
          }
        }

        updateThumbStates(product.id);
      }

      thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          setFeaturedProduct(thumb.getAttribute('data-promoband-id'));
        });
      });

      setFeaturedProduct({{ promo_product.id | jsonify }});
    }

    if (orderClarityCard) {
      try {
        if (window.localStorage.getItem(ORDER_CLARITY_KEY) === '1') {
          orderClarityCard.classList.add('hero-note-box--hidden');
          if (orderClarityReopen) {
            orderClarityReopen.classList.add('is-visible');
          }
        }
      } catch (e) {
      }
    }

    if (orderClarityCard && orderClarityDismiss) {
      orderClarityDismiss.addEventListener('click', function () {
        orderClarityCard.classList.add('hero-note-box--hidden');
        if (orderClarityReopen) {
          orderClarityReopen.classList.add('is-visible');
        }
        try {
          window.localStorage.setItem(ORDER_CLARITY_KEY, '1');
        } catch (e) {
        }
      });
    }

    if (orderClarityCard && orderClarityReopen) {
      orderClarityReopen.addEventListener('click', function () {
        orderClarityCard.classList.remove('hero-note-box--hidden');
        orderClarityReopen.classList.remove('is-visible');
        try {
          window.localStorage.removeItem(ORDER_CLARITY_KEY);
        } catch (e) {
        }
      });
    }

    function renderTrustCards() {
      var mobileMode = trustMobileQuery.matches;

      trustCards.forEach(function (card, index) {
        if (mobileMode) {
          var isActive = index === activeTrustIndex;
          card.classList.toggle('is-active', isActive);
          card.hidden = !isActive;
        } else {
          card.classList.remove('is-active');
          card.hidden = false;
        }
      });

      if (trustPrev && trustNext) {
        if (!mobileMode || trustCards.length < 2) {
          trustPrev.classList.add('is-disabled');
          trustNext.classList.add('is-disabled');
          trustPrev.classList.add('is-hidden');
          trustNext.classList.add('is-hidden');
          trustPrev.setAttribute('aria-disabled', 'true');
          trustNext.setAttribute('aria-disabled', 'true');
        } else {
          trustPrev.classList.remove('is-disabled');
          trustNext.classList.remove('is-disabled');
          trustPrev.classList.toggle('is-hidden', activeTrustIndex <= 0);
          trustNext.classList.toggle('is-hidden', activeTrustIndex >= trustCards.length - 1);
          trustPrev.setAttribute('aria-disabled', 'false');
          trustNext.setAttribute('aria-disabled', 'false');
        }
      }
    }

    function moveTrust(step) {
      if (!trustCards.length) return;
      activeTrustIndex = activeTrustIndex + step;
      if (activeTrustIndex < 0) {
        activeTrustIndex = 0;
      }
      if (activeTrustIndex > trustCards.length - 1) {
        activeTrustIndex = trustCards.length - 1;
      }
      renderTrustCards();
    }

    if (trustPrev) {
      trustPrev.addEventListener('click', function (event) {
        event.preventDefault();
        moveTrust(-1);
      });
    }

    if (trustNext) {
      trustNext.addEventListener('click', function (event) {
        event.preventDefault();
        moveTrust(1);
      });
    }

    if (typeof trustMobileQuery.addEventListener === 'function') {
      trustMobileQuery.addEventListener('change', renderTrustCards);
    } else if (typeof trustMobileQuery.addListener === 'function') {
      trustMobileQuery.addListener(renderTrustCards);
    }

    renderTrustCards();
  })();
</script>
