---
layout: default
title: Privacy Policy
permalink: /privacy/
---

{% assign legal = site.data.legal %}

This Privacy Policy explains how {{ legal.trading_name | default: site.title }} handles personal data when you browse the website and place an order.

## Data controller

- Trading name: {{ legal.trading_name | default: site.title }}
- Legal entity: {% if legal.legal_entity_name and legal.legal_entity_name != "" %}{{ legal.legal_entity_name }}{% else %}Please add legal entity name in _data/legal.yml{% endif %}
- Contact email: {{ legal.privacy_contact_email | default: legal.contact_email }}
- Contact phone: {{ legal.contact_phone }}
- Country: {{ legal.country | default: "Netherlands" }}

## What data we process

- Order data: selected products, quantities, prices, shipping costs.
- Shipping data: full name, street and house number, postcode, city, optional phone number.
- Contact data: messages sent via email or WhatsApp.
- Technical data: essential browser storage values for cart and cookie notice preferences.

## Why we process data (legal bases)

- To take steps at your request before a contract and to perform a contract (GDPR Art. 6(1)(b)).
- To comply with legal obligations, such as accounting and tax requirements (GDPR Art. 6(1)(c)).
- To protect legitimate interests in running and securing the store (GDPR Art. 6(1)(f)).

## Cookies and browser storage {#cookies}

We use essential browser storage to operate the store:

- `spicynoodles_cart` in localStorage to keep your cart between pages.
- `spicynoodles_cookie_notice_seen` in localStorage to remember that you dismissed the cookie notice.

These are used only for core shop functionality. No analytics or advertising trackers are intentionally loaded by this website.

## Recipients and third parties

- Hosting and website delivery providers.
- Email provider when you place an order by email.
- WhatsApp/Meta when you place an order through WhatsApp.

If personal data is transferred outside the EEA through third-party tools, those providers are responsible for applying transfer safeguards under their terms.

## Retention

- Cart/browser storage: until you clear browser data or it is overwritten.
- Order inquiries and communication: kept as long as needed to handle orders, customer service, accounting, and legal obligations.

## Your GDPR rights

You may request access, correction, deletion, restriction, portability, or object to processing where applicable.

To exercise your rights, contact {{ legal.privacy_contact_email | default: legal.contact_email }}.

You also have the right to lodge a complaint with your local supervisory authority. In the Netherlands this is the Autoriteit Persoonsgegevens.

## Changes to this policy

We may update this page when legal or operational changes require it.

Last updated: {{ legal.last_updated | default: "2026-04-09" }}
