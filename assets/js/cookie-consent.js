/* ─────────────────────────────────────────────────────────────
   SpicyNoodles Cookie Consent
   ───────────────────────────────────────────────────────────── */

const CONSENT_KEY = 'spicynoodles_consent';

function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted';
  } catch (e) {
    return false;
  }
}

function grantConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, 'granted');
    // Set a real cookie with 365-day expiry as well
    const exp = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${CONSENT_KEY}=granted; expires=${exp}; path=/; SameSite=Lax`;
  } catch (e) {}
  document.getElementById('cookie-banner')?.remove();
}

function declineConsent() {
  // Keeping browsing possible but no cart persistence
  document.getElementById('cookie-banner')?.remove();
}

function showCookieBanner() {
  if (hasConsent()) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <div class="cookie-inner">
      <div class="cookie-text">
        <p class="cookie-title">&#x1F36A; We use cookies</p>
        <p class="cookie-body">We store your cart in your browser (localStorage) so it persists between visits. No tracking or third-party cookies are used.</p>
      </div>
      <div class="cookie-actions">
        <button id="cookie-accept" class="cookie-btn-accept">Accept &amp; continue</button>
        <button id="cookie-decline" class="cookie-btn-decline">No thanks</button>
      </div>
    </div>`;
  document.body.appendChild(banner);

  // Animate in
  requestAnimationFrame(() => banner.classList.add('cookie-visible'));

  document.getElementById('cookie-accept').addEventListener('click', grantConsent);
  document.getElementById('cookie-decline').addEventListener('click', declineConsent);
}

document.addEventListener('DOMContentLoaded', showCookieBanner);
