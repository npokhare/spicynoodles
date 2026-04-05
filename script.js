// SpicyNoodles Script
// Minimal JS for loading products and handling interactions

document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
  setupContactButtons();
  initSlideshow();
});

function loadProducts() {
  const grid = document.getElementById('product-grid');
  products.forEach(product => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement('a');
  card.className = 'product-card';
  card.href = `products/${product.folder}/index.html`;

  const status = availabilityStatuses[product.availability];
  const heatIndicator = getHeatIndicator(product.heatLevel);

  card.innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <div class="availability ${status.class}">
      <div class="status-dot"></div>
      <span class="status-label">${status.label}</span>
    </div>
    <div class="heat-level">Heat: ${heatIndicator}</div>
    <p class="caption">${product.origin}</p>
  `;

  return card;
}

function setupContactButtons() {
  const emailBtn = document.getElementById('email-btn');
  const whatsappBtn = document.getElementById('whatsapp-btn');

  emailBtn.href = `mailto:${config.email}?subject=Noodle Order Inquiry`;
  whatsappBtn.href = config.whatsapp;
}

function initSlideshow() {
  const images = document.querySelectorAll('.slideshow-image');
  let currentIndex = 0;

  function showNextImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }

  // Change image every 3 seconds
  setInterval(showNextImage, 3000);
}