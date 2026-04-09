---
layout: default
title: Terms and Conditions
permalink: /terms/
---

{% assign legal = site.data.legal %}

These Terms and Conditions apply to all purchases and order inquiries made through {{ legal.trading_name | default: site.title }}.

## Trader information

- Trading name: {{ legal.trading_name | default: site.title }}
- Legal entity: {% if legal.legal_entity_name and legal.legal_entity_name != "" %}{{ legal.legal_entity_name }}{% else %}Please add legal entity name in _data/legal.yml{% endif %}
- Contact email: {{ legal.contact_email }}
- Contact phone: {{ legal.contact_phone }}
- Registered address: {% if legal.registered_address and legal.registered_address != "" %}{{ legal.registered_address }}{% else %}Please add registered address in _data/legal.yml{% endif %}

## Ordering process

1. You add products to the cart and submit an order via WhatsApp or email.
2. We confirm stock availability before payment.
3. We confirm final order details and payment instructions.
4. After confirmation, we prepare and ship your order.

## Prices and payment

- All prices are shown in EUR.
- Shipping is calculated at checkout.
- Current payment method shown in checkout applies unless otherwise agreed in writing.
- Tax treatment (including VAT) follows Dutch and EU law based on your order context.

## Delivery

- Delivery times are estimates and may vary by availability and carrier performance.
- Risk transfers to the consumer upon delivery, unless mandatory law states otherwise.

## Right of withdrawal and returns

Consumers in the EU may have a statutory right of withdrawal for distance contracts, subject to legal exceptions.

See the full policy on the Returns and Withdrawal page: [/returns/](/returns/).

## Conformity and complaints

You are entitled to the legal guarantee of conformity under applicable consumer law.

For complaints, contact {{ legal.contact_email }}. We aim to respond as quickly as possible.

## Liability

Nothing in these terms excludes or limits rights that cannot be excluded under mandatory consumer law.

## Governing law

These terms are governed by Dutch law, without prejudice to mandatory consumer protections in your country of residence.

Last updated: {{ legal.last_updated | default: "2026-04-09" }}
