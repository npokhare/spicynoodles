/* ─────────────────────────────────────────────────────────────
   SpicyNoodles Cart  —  localStorage-backed shopping cart
   ───────────────────────────────────────────────────────────── */

const CART_KEY = 'spicynoodles_cart';
const SHIPPING_COST = 3.95;
const FREE_SHIPPING_THRESHOLD = 50;
const DEFAULT_PAYMENT_METHOD = 'Cash on Delivery';

let _cartPageListenerAdded = false;

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
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  return existing ? existing.qty : 1;
}

function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
}

function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  if (qty <= 0) {
    removeFromCart(id);
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

      const product = {
        id:       parseInt(this.dataset.id),
        title:    this.dataset.title,
        price:    parseFloat(this.dataset.price),
        image:    this.dataset.image,
        folder:   this.dataset.folder,
        weight:   this.dataset.weight || ''
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
          ${cart.map(i => `<div class="cart-summary-row"><span>${i.title} &times; ${i.qty}</span><span>&euro; ${(i.price * i.qty).toFixed(2)}</span></div>`).join('')}
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
        <div class="cart-cta-stack">
          <a href="#" id="cart-wa-btn" target="_blank" rel="noopener" class="cart-btn-wa" onclick="return handleOrderClick(event,'wa')">
            &#x1F4AC; Order via WhatsApp
          </a>
          <a href="#" id="cart-email-btn" class="cart-btn-email" onclick="return handleOrderClick(event,'email')">
            &#x2709; Order via Email
          </a>
        </div>
        <button onclick="clearCart()" class="cart-clear-btn">Clear cart</button>
      </aside>
    </div>`;

  root.querySelectorAll('[data-action="remove"]').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.cartId)));
  });
  root.querySelectorAll('[data-action="qty"]').forEach(input => {
    input.addEventListener('change', () => updateQty(parseInt(input.dataset.cartId), parseInt(input.value)));
  });
}

function renderCartItem(item) {
  return `
    <div class="cart-item">
      <div class="cart-item-img-wrap">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="cart-item-info">
        <p class="cart-item-title">${item.title}</p>
        <p class="cart-item-weight">${item.weight}</p>
        <p class="cart-item-unit">&euro; ${item.price.toFixed(2)} each</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="updateQty(${item.id}, ${item.qty - 1})">&#x2212;</button>
        <input type="number" class="qty-input" value="${item.qty}" min="1" max="99"
               data-action="qty" data-cart-id="${item.id}">
        <button class="qty-btn" onclick="updateQty(${item.id}, ${item.qty + 1})">&#x2B;</button>
      </div>
      <div class="cart-item-line-total">
        &euro; ${(item.price * item.qty).toFixed(2)}
      </div>
      <button class="cart-item-remove" data-action="remove" data-cart-id="${item.id}" title="Remove">&#x2715;</button>
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

function handleOrderClick(e, type) {
  e.preventDefault();
  if (!validateAddress()) return false;
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
  const lines = cart.map(i => `  • ${i.title} × ${i.qty}  (€ ${(i.price * i.qty).toFixed(2)})`).join('\n');
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
  const lines = cart.map(i => `  - ${i.title} x${i.qty}  (EUR ${(i.price * i.qty).toFixed(2)})`).join('\n');
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
