/* ─────────────────────────────────────────────────────────────
   SpicyNoodles Cart  —  localStorage-backed shopping cart
   ───────────────────────────────────────────────────────────── */

const CART_KEY = 'spicynoodles_cart';
const SHIPPING_COST = 3.95;
const FREE_SHIPPING_THRESHOLD = 50;
const DEFAULT_PAYMENT_METHOD = 'Cash on Delivery';

let _cartPageListenerAdded = false;

function getPackKey(product) {
  if (!product || !product.packKey) return 'single';
  return String(product.packKey);
}

function getCartItemKey(product) {
  return String(product.id) + '::' + getPackKey(product);
}

function getDisplayTitle(item) {
  if (item && item.packCount && item.packCount > 0) {
    return item.title + ' (X' + item.packCount + ')';
  }
  if (item && item.packLabel) {
    return item.title + ' (' + item.packLabel + ')';
  }
  return item.title;
}

/* ── Shipping helpers ────────────────────────────────────── */
function getShipping(subtotal) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

/* ── Storage helpers ─────────────────────────────────────── */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  dispatchCartChange();
}

function dispatchCartChange() {
  document.dispatchEvent(new CustomEvent('cartchange', { detail: getCart() }));
}

/* ── Cart operations ─────────────────────────────────────── */
function addToCart(product) {
  const cart = getCart();
  const cartKey = getCartItemKey(product);
  const existing = cart.find(item => item.cartKey === cartKey);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      ...product,
      cartKey,
      packKey: getPackKey(product),
      packLabel: product.packLabel || '',
      packCount: parseInt(product.packCount || 0, 10) || 0,
      qty: 1
    });
  }
  saveCart(cart);
  return existing ? existing.qty : 1;
}

function removeFromCart(cartKey) {
  const key = String(cartKey);
  const cart = getCart().filter(item => {
    const itemKey = item.cartKey || (String(item.id) + '::single');
    return itemKey !== key;
  });
  saveCart(cart);
}

function updateQty(cartKey, qty) {
  const key = String(cartKey);
  const cart = getCart();
  const item = cart.find(i => {
    const itemKey = i.cartKey || (String(i.id) + '::single');
    return itemKey === key;
  });
  if (!item) return;
  if (qty <= 0) {
    removeFromCart(key);
    return;
  }
  item.qty = qty;
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
  dispatchCartChange();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* ── Navbar badge ─────────────────────────────────────────── */
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

/* ── Add-to-cart buttons ──────────────────────────────────── */
function initAddToCartButtons() {
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var selectedPackOption = null;
      if (this.dataset.packSelectId) {
        var select = document.getElementById(this.dataset.packSelectId);
        if (select && select.selectedOptions && select.selectedOptions.length) {
          selectedPackOption = select.selectedOptions[0];
        }
      }

      const product = {
        id:       parseInt(this.dataset.id),
        title:    this.dataset.title,
        price:    selectedPackOption ? parseFloat(selectedPackOption.dataset.price) : parseFloat(this.dataset.price),
        image:    this.dataset.image,
        folder:   this.dataset.folder,
        weight:   selectedPackOption ? (selectedPackOption.dataset.weight || this.dataset.weight || '') : (this.dataset.weight || ''),
        packKey:  selectedPackOption ? (selectedPackOption.value || 'single') : 'single',
        packLabel:selectedPackOption ? (selectedPackOption.dataset.label || '') : '',
        packCount:selectedPackOption ? parseInt(selectedPackOption.dataset.count || '0', 10) : 0
      };

      const newQty = addToCart(product);
      flashButton(this, newQty);
    });
  });
}

function flashButton(btn, qty) {
  const original = btn.innerHTML;
  btn.innerHTML = '&#10003; Added (' + qty + ')';
  btn.classList.add('atc-added');
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.classList.remove('atc-added');
    btn.disabled = false;
  }, 1400);
}

/* ── Cart page renderer ───────────────────────────────────── */
function renderCartPage() {
  const root = document.getElementById('cart-root');
  if (!root) return;

  if (!_cartPageListenerAdded) {
    document.addEventListener('cartchange', () => renderCartPage());
    _cartPageListenerAdded = true;
  }

  const cart = getCart();
  if (cart.length === 0) {
    root.innerHTML = renderEmptyCart();
    return;
  }

  const savedAddr = getAddressFromForm();
  const subtotal  = getCartTotal();
  const shipping  = getShipping(subtotal);
  const grandTotal = (subtotal + shipping).toFixed(2);
  const subtotalStr = subtotal.toFixed(2);
  const itemsHtml = cart.map(item => renderCartItem(item)).join('');

  const freeLeft = FREE_SHIPPING_THRESHOLD - subtotal;
  const nudgeHtml = freeLeft > 0
    ? `<div class="shipping-nudge">Add <strong>&euro;&thinsp;${freeLeft.toFixed(2)}</strong> more for <strong>free shipping</strong></div>`
    : `<div class="shipping-nudge shipping-free-unlocked">&#127881;&nbsp;Free shipping unlocked!</div>`;

  root.innerHTML = `
    <div class="cart-shell">
      <div class="cart-left">
        <div class="cart-items">
          ${itemsHtml}
        </div>
        <div class="shipping-section">
          <p class="shipping-section-title">Shipping details</p>
          <form class="shipping-form" id="shipping-form" autocomplete="on">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="ship-name">Full name</label>
                <input class="form-input" id="ship-name" type="text" placeholder="Jan de Vries" autocomplete="name" value="${savedAddr.name}">
              </div>
              <div class="form-group">
                <label class="form-label" for="ship-phone">Phone (optional)</label>
                <input class="form-input" id="ship-phone" type="tel" placeholder="+31 6 …" autocomplete="tel" value="${savedAddr.phone}">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="ship-street">Street &amp; house number</label>
              <input class="form-input" id="ship-street" type="text" placeholder="Keizersgracht 123" autocomplete="street-address" value="${savedAddr.street}">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="ship-postcode">Postcode</label>
                <input class="form-input" id="ship-postcode" type="text" placeholder="1234 AB" autocomplete="postal-code" value="${savedAddr.postcode}">
              </div>
              <div class="form-group">
                <label class="form-label" for="ship-city">City</label>
                <input class="form-input" id="ship-city" type="text" placeholder="Amsterdam" autocomplete="address-level2" value="${savedAddr.city}">
              </div>
            </div>
          </form>
        </div>
      </div>

      <aside class="cart-summary">
        <p class="cart-summary-label">Order summary</p>
        <div class="cart-summary-rows">
          ${cart.map(i => `<div class="cart-summary-row"><span>${getDisplayTitle(i)} &times; ${i.qty}</span><span>&euro; ${(i.price * i.qty).toFixed(2)}</span></div>`).join('')}
        </div>
        <div class="cart-subtotal-row">
          <span>Subtotal</span><span>&euro; ${subtotalStr}</span>
        </div>
        <div class="cart-shipping-row">
          <span>Shipping</span><span>${shipping === 0 ? '<span class="shipping-free-badge">FREE</span>' : '&euro; ' + shipping.toFixed(2)}</span>
        </div>
        ${nudgeHtml}
        <div class="cart-total-row">
          <span>Total</span><span>&euro; ${grandTotal}</span>
        </div>
        <div class="cart-payment-row" style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;font-family:'DM Mono',ui-monospace,monospace;font-size:0.64rem;letter-spacing:0.08em;text-transform:uppercase;color:#8A7060;border-top:1px solid rgba(74,48,32,0.12);padding-top:0.6rem;">
          <span>Payment</span>
          <span style="background:#EBF4EA;color:#3A6B35;border:1px solid rgba(58,107,53,0.3);border-radius:999px;padding:0.16rem 0.52rem;">${DEFAULT_PAYMENT_METHOD}</span>
        </div>
        <div class="cart-legal-box" style="border:1px solid rgba(74,48,32,0.12);border-radius:10px;padding:0.7rem 0.75rem;background:#FFFBF5;">
          <label style="display:flex;gap:0.55rem;align-items:flex-start;font-size:0.78rem;line-height:1.45;color:#4A3020;">
            <input id="cart-legal-ack" type="checkbox" style="margin-top:0.15rem;">
            <span>I have read and agree to the <a href="/terms/" target="_blank" rel="noopener">Terms</a>, <a href="/privacy/" target="_blank" rel="noopener">Privacy Policy</a>, and <a href="/returns/" target="_blank" rel="noopener">Returns policy</a>.</span>
          </label>
          <p style="margin:0.5rem 0 0;font-size:0.72rem;color:#8A7060;line-height:1.4;">By ordering, you request a purchase confirmation by WhatsApp or email. Full trader details are available in the <a href="/legal/" target="_blank" rel="noopener">Legal Notice</a>.</p>
        </div>
        <div class="cart-cta-stack">
          <a href="#" id="cart-wa-btn" target="_blank" rel="noopener" class="cart-btn-wa" onclick="return handleOrderClick(event,'wa')">
            &#x1F4AC; Order via WhatsApp
          </a>
          <a href="#" id="cart-email-btn" class="cart-btn-email" onclick="return handleOrderClick(event,'email')">
            &#x2709; Order via Email
          </a>
        </div>
        <p id="cart-legal-error" style="display:none;margin:0.2rem 0 0;color:#8C1A04;font-size:0.74rem;line-height:1.4;">Please confirm the legal terms before placing your order.</p>
        <button onclick="clearCart()" class="cart-clear-btn">Clear cart</button>
      </aside>
    </div>`;

  root.querySelectorAll('[data-action="remove"]').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.cartKey));
  });
  root.querySelectorAll('[data-action="qty-decrease"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.cartKey;
      const item = cart.find(i => (i.cartKey || (String(i.id) + '::single')) === key);
      if (!item) return;
      updateQty(key, item.qty - 1);
    });
  });
  root.querySelectorAll('[data-action="qty-increase"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.cartKey;
      const item = cart.find(i => (i.cartKey || (String(i.id) + '::single')) === key);
      if (!item) return;
      updateQty(key, item.qty + 1);
    });
  });
  root.querySelectorAll('[data-action="qty"]').forEach(input => {
    input.addEventListener('change', () => updateQty(input.dataset.cartKey, parseInt(input.value)));
  });
}

function renderCartItem(item) {
  const cartKey = item.cartKey || (String(item.id) + '::single');
  const safeKey = cartKey.replace(/"/g, '&quot;');
  const displayTitle = getDisplayTitle(item);
  const details = [item.weight || ''];
  if (item.packLabel) {
    details.unshift(item.packLabel);
  }
  const detailLine = details.filter(Boolean).join(' · ');
  return `
    <div class="cart-item">
      <div class="cart-item-img-wrap">
        <img src="${item.image}" alt="${displayTitle}">
      </div>
      <div class="cart-item-info">
        <p class="cart-item-title">${displayTitle}</p>
        <p class="cart-item-weight">${detailLine}</p>
        <p class="cart-item-unit">&euro; ${item.price.toFixed(2)} each</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="qty-decrease" data-cart-key="${safeKey}">&#x2212;</button>
        <input type="number" class="qty-input" value="${item.qty}" min="1" max="99"
               data-action="qty" data-cart-key="${safeKey}">
        <button class="qty-btn" data-action="qty-increase" data-cart-key="${safeKey}">&#x2B;</button>
      </div>
      <div class="cart-item-line-total">
        &euro; ${(item.price * item.qty).toFixed(2)}
      </div>
      <button class="cart-item-remove" data-action="remove" data-cart-key="${safeKey}" title="Remove">&#x2715;</button>
    </div>`;
}

function renderEmptyCart() {
  return `
    <div class="cart-empty">
      <p class="cart-empty-icon">&#x1F6D2;</p>
      <h2>Your cart is empty</h2>
      <p>Browse our noodles and achar, then add your favorites.</p>
      <a href="/products/" class="cart-empty-cta">Browse all products &rarr;</a>
    </div>`;
}

/* ── Address helpers ────────────────────────────────────────── */
function getAddressFromForm() {
  const get = id => (document.getElementById(id) || { value: '' }).value.trim();
  return {
    name:     get('ship-name'),
    phone:    get('ship-phone'),
    street:   get('ship-street'),
    postcode: get('ship-postcode'),
    city:     get('ship-city')
  };
}

function validateAddress() {
  const required = [
    { id: 'ship-name',     label: 'Full name' },
    { id: 'ship-street',  label: 'Street & house number' },
    { id: 'ship-postcode',label: 'Postcode' },
    { id: 'ship-city',    label: 'City' }
  ];
  let valid = true;
  required.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const empty = !el.value.trim();
    el.classList.toggle('input-error', empty);
    if (empty) valid = false;
  });
  if (!valid) {
    const form = document.getElementById('shipping-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // shake the shipping section
      const section = form.closest('.shipping-section');
      if (section) {
        section.classList.remove('shake');
        void section.offsetWidth; // reflow
        section.classList.add('shake');
      }
    }
  }
  return valid;
}

function validateLegalAcknowledgement() {
  const checkbox = document.getElementById('cart-legal-ack');
  const errorEl = document.getElementById('cart-legal-error');
  if (!checkbox) return true;

  const accepted = !!checkbox.checked;
  if (errorEl) {
    errorEl.style.display = accepted ? 'none' : 'block';
  }
  return accepted;
}

function handleOrderClick(e, type) {
  e.preventDefault();
  if (!validateAddress()) return false;
  if (!validateLegalAcknowledgement()) return false;
  const cart     = getCart();
  const subtotal = getCartTotal();
  const shipping = getShipping(subtotal);
  const grandTotal = (subtotal + shipping).toFixed(2);
  const address  = getAddressFromForm();
  const url = type === 'wa'
    ? buildWhatsAppUrl(cart, grandTotal, shipping, address)
    : buildEmailUrl(cart, grandTotal, shipping, address);
  if (type === 'wa') { window.open(url, '_blank', 'noopener'); }
  else               { window.location.href = url; }
  return false;
}

/* ── WhatsApp & Email URL builders ────────────────────────── */
function buildWhatsAppUrl(cart, total, shipping, address) {
  const lines = cart.map(i => `  • ${getDisplayTitle(i)} × ${i.qty}  (€ ${(i.price * i.qty).toFixed(2)})`).join('\n');
  const shippingLine = shipping === 0 ? '  Shipping: Free 🎉' : `  Shipping: € ${shipping.toFixed(2)}`;
  const paymentLine = `  Payment: ${DEFAULT_PAYMENT_METHOD}`;
  let addrBlock = '';
  if (address && (address.name || address.street)) {
    addrBlock = `\n\nShip to:\n  ${address.name}\n  ${address.street}\n  ${address.postcode} ${address.city}`;
    if (address.phone) addrBlock += `\n  ${address.phone}`;
  }
  const body = `Hi SpicyNoodles! 👋\n\nI'd like to place an order:\n\n${lines}\n\n${shippingLine}\n${paymentLine}\nTotal: € ${total}${addrBlock}\n\nPlease confirm availability. Thanks!`;
  return `https://wa.me/31621153774?text=${encodeURIComponent(body)}`;
}

function buildEmailUrl(cart, total, shipping, address) {
  const lines = cart.map(i => `  - ${getDisplayTitle(i)} x${i.qty}  (EUR ${(i.price * i.qty).toFixed(2)})`).join('\n');
  const shippingLine = shipping === 0 ? '  Shipping: Free' : `  Shipping: EUR ${shipping.toFixed(2)}`;
  const paymentLine = `  Payment: ${DEFAULT_PAYMENT_METHOD}`;
  const subject = `Order inquiry — SpicyNoodles (€ ${total})`;
  let addrBlock = '';
  if (address && (address.name || address.street)) {
    addrBlock = `\n\nShipping address:\n  Name: ${address.name}\n  Street: ${address.street}\n  Postcode: ${address.postcode}\n  City: ${address.city}`;
    if (address.phone) addrBlock += `\n  Phone: ${address.phone}`;
  }
  const body = `Hi,\n\nI would like to order the following:\n\n${lines}\n\n${shippingLine}\n${paymentLine}\nTotal: EUR ${total}${addrBlock}\n\nPlease confirm stock availability before payment.\n\nThank you!`;
  return `mailto:niru.nirajanpokharel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initAddToCartButtons();
  renderCartPage();
});
