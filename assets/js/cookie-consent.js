/* ─────────────────────────────────────────────────────────────
   SpicyNoodles Cookie and Storage Notice
   ───────────────────────────────────────────────────────────── */

const NOTICE_KEY = 'spicynoodles_cookie_notice_seen';

function hasSeenNotice() {
  try {
    return localStorage.getItem(NOTICE_KEY) === 'yes';
  } catch (e) {
    return false;
  }
}

function closeNotice() {
  try {
    localStorage.setItem(NOTICE_KEY, 'yes');
  } catch (e) {}
  document.getElementById('cookie-banner')?.remove();
}

function showCookieBanner() {
  if (hasSeenNotice()) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie and storage notice');
  banner.innerHTML = `
    <div class="cookie-inner">
      <div class="cookie-text">
        <p class="cookie-title">Essential cookies and storage</p>
        <p class="cookie-body">We use essential browser storage to keep your cart working and to remember this notice. For details, see our <a href="/privacy/#cookies" style="color:#C98A2D;text-decoration:underline;">Privacy Policy</a>.</p>
      </div>
      <div class="cookie-actions">
        <button id="cookie-ok" class="cookie-btn-accept">OK</button>
      </div>
    </div>`;
  document.body.appendChild(banner);

  requestAnimationFrame(() => banner.classList.add('cookie-visible'));

  document.getElementById('cookie-ok').addEventListener('click', closeNotice);
}

document.addEventListener('DOMContentLoaded', showCookieBanner);
