---
layout: default
title: SpicyNoodles
---
{% assign noodle_products = site.data.noodles.products %}
{% assign achar_products = site.data.achar.products %}
{% assign all_products = noodle_products | concat: achar_products %}
{% assign promo_product = all_products | where: 'promo', true | first %}
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
  }

  .promoband-desc {
    color: rgba(247, 239, 228, 0.68);
    font-size: 0.93rem;
    line-height: 1.65;
    max-width: 38ch;
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

  .promoband-thumbs {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.6rem;
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
    top: 50%;
    left: 50%;
    transform: translate(-58%, -50%) rotate(-14deg);
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
    }

    .promoband-price {
      top: auto;
      left: auto;
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
  }
</style>

<div class="home-shell">
  <section class="hero-section" aria-label="SpicyNoodles brand story">
    <div class="home-hero-grid">
      <div>
        <span class="section-eyebrow">Nepal-inspired &middot; Small batch &middot; Netherlands</span>
        <h1 class="section-title display">Authentic Nepal-Inspired Noodles</h1>
        <p class="section-copy" style="margin-top:1.2rem;font-size:1.05rem;line-height:1.75;">Welcome to SpicyNoodles &mdash; bold Himalayan flavors in every pack. Browse our curated batch selection and order directly via WhatsApp.</p>
        <div class="hero-actions">
          <a class="hero-btn hero-btn-primary" href="{{ '/noodles/' | relative_url }}">Browse all noodles</a>
        </div>
      </div>
      <aside class="hero-note-box" aria-label="Ordering promise">
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
        <a id="promoband-order-btn" class="promoband-btn" href="{{ '/products/' | append: promo_product.folder | append: '/' | relative_url }}">Order Now &rarr;</a>
        <div class="promoband-thumbs">
          {%- for product in all_products %}
          <button type="button" class="promoband-thumb{%- if product.id == promo_product.id %} promoband-thumb--active{%- endif %}" title="{{ product.title }}" data-promoband-id="{{ product.id }}" aria-label="Show {{ product.title }} in featured panel">
            <img src="{{ product.image | relative_url }}" alt="{{ product.title }}">
          </button>
          {%- endfor %}
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
    var desc = document.getElementById('promoband-desc');
    var price = document.getElementById('promoband-price');
    var orderBtn = document.getElementById('promoband-order-btn');
    var thumbs = Array.prototype.slice.call(document.querySelectorAll('[data-promoband-id]'));

    if (!mainImage || !eyebrow || !title || !desc || !price || !orderBtn || !thumbs.length) return;

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
  })();
</script>
