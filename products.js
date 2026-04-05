// SpicyNoodles Product Catalog
// CUSTOMIZE: Update product data, availability, and heat levels here

const products = [
  {
    id: 1,
    name: 'Current Hot & Spicy Noodles',
    folder: 'current-hot-spicy-noodles',
    description: 'Spice up your day with good blend of fiery spices and aromatic ingredients to fill up your belly.',
    origin: '🇳🇵 Nepal-inspired',
    availability: 'available',
    heatLevel: 4
  },
  {
    id: 2,
    name: 'Current 2x Spicy Noodles',
    folder: 'current-2x-spicy-noodles',
    description: 'Elevate your taste buds with 2X Spicy Hot Noodles, delivering extra heat and irresistible flavor.',
    origin: '🇳🇵 Nepal-inspired',
    availability: 'limited',
    heatLevel: 5
  },
  {
    id: 3,
    name: 'Current Schezwan Instant Noodles',
    folder: 'current-schezwan-instant-noodles',
    description: 'Delight in the yummy, easy-to-eat Schezwan flavored hot and spicy noodles experience.',
    origin: '🇳🇵 Nepal-inspired',
    availability: 'check',
    heatLevel: 3
  },
  {
    id: 4,
    name: 'Current Hot \'n\' Lemon Veggie Soup Noodles',
    folder: 'current-hot-n-lemon-veggie-soup-noodles',
    description: 'Combination of Hot and Lemon that tingles your taste buds, and aromatic ingredients to fill up your belly.',
    origin: '🇳🇵 Nepal-inspired',
    availability: 'available',
    heatLevel: 3
  }
];

// Availability status mapping
const availabilityStatuses = {
  available: { label: 'Available Now', class: 'status-available' },
  limited: { label: 'Limited Stock', class: 'status-limited' },
  check: { label: 'Check Availability', class: 'status-check' },
  reserve: { label: 'Reserve Yours', class: 'status-reserve' }
};

// Heat level indicators
function getHeatIndicator(level) {
  const filled = '●'.repeat(level);
  const empty = '○'.repeat(5 - level);
  return filled + empty + (level === 5 ? ' 🔥' : '');
}