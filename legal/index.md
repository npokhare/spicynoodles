---
layout: default
title: Legal Notice
permalink: /legal/
---

{% assign legal = site.data.legal %}

## Company details

- Trading name: {{ legal.trading_name | default: site.title }}
- Legal entity name: {% if legal.legal_entity_name and legal.legal_entity_name != "" %}{{ legal.legal_entity_name }}{% else %}Please add legal entity name in _data/legal.yml{% endif %}
- Registered address: {% if legal.registered_address and legal.registered_address != "" %}{{ legal.registered_address }}{% else %}Please add registered address in _data/legal.yml{% endif %}
- Country: {{ legal.country | default: "Netherlands" }}
- Chamber of Commerce number: {% if legal.chamber_of_commerce_number and legal.chamber_of_commerce_number != "" %}{{ legal.chamber_of_commerce_number }}{% else %}Please add Chamber of Commerce number in _data/legal.yml{% endif %}
- VAT number: {% if legal.vat_number and legal.vat_number != "" %}{{ legal.vat_number }}{% else %}Please add VAT number in _data/legal.yml if applicable{% endif %}

## Contact

- Email: {{ legal.contact_email }}
- Phone: {{ legal.contact_phone }}
- Customer service hours: {{ legal.customer_service_hours }}

## Legal note

Please keep the company details above complete and up to date to meet applicable ecommerce and consumer information obligations.

Last updated: {{ legal.last_updated | default: "2026-04-09" }}
