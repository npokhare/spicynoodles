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
    padding: 1.2rem;
    text-decoration: none;
    color: inherit;
    display: grid;
    gap: 0.7rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .article-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(28, 16, 7, 0.09);
  }

  .article-card-label {
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.64rem;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: var(--saffron-gold);
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
    <a class="article-card" href="{{ '/articles/' | append: article.slug | append: '/' | relative_url }}">
      <span class="article-card-label">{{ article.hero_label }}</span>
      <h2>{{ article.title }}</h2>
      <p>{{ article.intro }}</p>
      <span class="article-card-meta">{{ article.read_time }} &middot; {{ article.published_at }}</span>
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
