---
layout: default
title: SpicyNoodles Articles
description: Nepal-inspired noodle guides, cooking ideas, and flavor tips from SpicyNoodles.
breadcrumb: <a href="/">Home</a> / Articles
---

<style>
  .articles-shell {
    display: grid;
    gap: 2.2rem;
  }

  .articles-head {
    display: grid;
    gap: 0.75rem;
    max-width: 72ch;
  }

  .articles-eyebrow {
    display: inline-block;
    width: fit-content;
    padding: 0.22rem 0.68rem;
    border-radius: 999px;
    background: var(--chili-blush);
    color: var(--deep-chili);
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .articles-head h1 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.1;
    color: var(--ink);
  }

  .articles-head p {
    margin: 0;
    color: var(--mist);
    font-size: 1rem;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.2rem;
  }

  .article-card {
    background: #fff;
    border: 1px solid rgba(74, 48, 32, 0.1);
    border-radius: 14px;
    padding: 0;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    display: grid;
    gap: 0;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .article-card-cover {
    position: relative;
    min-height: 124px;
    padding: 0.9rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    overflow: hidden;
    border-bottom: 1px solid rgba(74, 48, 32, 0.08);
  }

  .article-card-cover::before,
  .article-card-cover::after {
    content: '';
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
  }

  .article-card-cover::before {
    width: 160px;
    height: 160px;
    top: -70px;
    right: -36px;
    background: rgba(255, 255, 255, 0.28);
  }

  .article-card-cover::after {
    width: 130px;
    height: 130px;
    bottom: -62px;
    left: -24px;
    background: rgba(255, 255, 255, 0.18);
  }

  .theme-ember {
    background: linear-gradient(145deg, #d8421f 0%, #8c1a04 100%);
  }

  .theme-saffron {
    background: linear-gradient(145deg, #d79b3d 0%, #9c6516 100%);
  }

  .theme-herb {
    background: linear-gradient(145deg, #4d8146 0%, #2f5a2d 100%);
  }

  .theme-ink {
    background: linear-gradient(145deg, #4a3020 0%, #1c1007 100%);
  }

  .article-card-cover-chip {
    position: relative;
    z-index: 1;
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.58rem;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.84);
    color: #2f1d13;
    border-radius: 999px;
    padding: 0.18rem 0.52rem;
  }

  .article-card-cover-glyph {
    position: relative;
    z-index: 1;
    font-family: 'Playfair Display', serif;
    font-size: 2.6rem;
    font-weight: 900;
    line-height: 1;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }

  .article-card-body {
    padding: 1.05rem 1.15rem 1.1rem;
    display: grid;
    gap: 0.68rem;
  }

  .article-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(28, 16, 7, 0.09);
  }

  .article-card h2 {
    margin: 0;
    font-size: 1.3rem;
    color: var(--ink);
    line-height: 1.22;
  }

  .article-card p {
    margin: 0;
    color: var(--earth);
    line-height: 1.65;
    font-size: 0.95rem;
  }

  .article-card-meta {
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.64rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--mist);
  }
</style>

<div class="articles-shell">
  <header class="articles-head">
    <span class="articles-eyebrow">Knowledge Hub</span>
    <h1>Nepal-Inspired Noodle Articles</h1>
    <p>Learn heat levels, meal ideas, and buying tips for SpicyNoodles in the Netherlands. Each article is built to answer real search questions clearly and quickly.</p>
  </header>

  <section class="articles-grid" aria-label="Article list">
    {% assign sorted_articles = site.data.articles.articles | sort: 'published_at' | reverse %}
    {% for article in sorted_articles %}
    {% assign label_lc = article.hero_label | downcase %}
    {% assign cover_theme = 'theme-ink' %}
    {% if label_lc contains 'buy' or label_lc contains 'order' %}
      {% assign cover_theme = 'theme-saffron' %}
    {% elsif label_lc contains 'idea' %}
      {% assign cover_theme = 'theme-herb' %}
    {% elsif label_lc contains 'guide' %}
      {% assign cover_theme = 'theme-ember' %}
    {% endif %}
    <a class="article-card" href="{{ '/articles/' | append: article.slug | append: '/' | relative_url }}">
      <div class="article-card-cover {{ cover_theme }}">
        <span class="article-card-cover-chip">{{ article.hero_label }}</span>
        <span class="article-card-cover-glyph">{{ article.hero_label | slice: 0, 1 | upcase }}</span>
      </div>
      <div class="article-card-body">
        <h2>{{ article.title }}</h2>
        <p>{{ article.intro }}</p>
        <span class="article-card-meta">{{ article.read_time }} &middot; {{ article.published_at }}</span>
      </div>
    </a>
    {% endfor %}
  </section>
</div>

{% assign sorted_articles = site.data.articles.articles | sort: 'published_at' | reverse %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{{ page.title | escape }}",
  "url": "{{ page.url | absolute_url }}",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {% for article in sorted_articles %}
      {
        "@type": "ListItem",
        "position": {{ forloop.index }},
        "url": "{{ '/articles/' | append: article.slug | append: '/' | absolute_url }}",
        "name": "{{ article.title | escape }}"
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  }
}
</script>
