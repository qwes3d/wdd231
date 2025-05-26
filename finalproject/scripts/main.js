
import { fetchWeather } from './weather.js';
import { initModal } from './modal.js';

// URLs for local JSON data (you will provide these JSON files)
const PRODUCTS_JSON = './data/products.json';
const COMPANIES_JSON = './data/companies.json';

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const currentYearEl = document.getElementById('currentYear');
const lastModifiedEl = document.getElementById('lastModified');

const productGrid = document.getElementById('productGrid');
const adGrid = document.getElementById('adGrid');
const companyGrid = document.getElementById('companyGrid');
const weatherInfo = document.getElementById('weatherInfo');
const searchBox = document.getElementById('searchBox');
const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

document.addEventListener('DOMContentLoaded', () => {
  currentYearEl.textContent = new Date().getFullYear();
  lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;

  // Navigation toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
    });
  }

  // Fetch and display weather if on index.html
  if (weatherInfo) {
    fetchWeather().then(data => {
      weatherInfo.textContent = `${data.city}: ${data.description}, ${data.temp}°C`;
    }).catch(() => {
      weatherInfo.textContent = 'Weather data unavailable.';
    });
  }

  // Load products and ads on index page
  if (productGrid && adGrid) {
    loadProducts();
    loadAds();
  }

  // Load companies on directory page
  if (companyGrid) {
    loadCompanies();
  }

  // Search functionality on products
  if (searchBox) {
    searchBox.addEventListener('input', (e) => {
      filterProducts(e.target.value);
    });
  }

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit();
    });
  }

  // Initialize modal dialogs
  initModal();
});

// Fetch products.json and display first 15 products
async function loadProducts() {
  try {
    const response = await fetch(PRODUCTS_JSON);
    if (!response.ok) throw new Error('Products fetch failed');
    const data = await response.json();
    displayProducts(data.products.slice(0, 15));
    localStorage.setItem('lastProducts', JSON.stringify(data.products));
  } catch (error) {
    productGrid.textContent = 'Failed to load products.';
  }
}

function displayProducts(products) {
  productGrid.innerHTML = products.map(p => `
    <article class="product-card" tabindex="0" aria-label="Product: ${p.name}">
      <img src="${p.image}" alt="${p.name} image" loading="lazy" />
      <h3 class="product-name">${p.name}</h3>
      <p class="price">Price: $${p.price.toFixed(2)}</p>
      <p>${p.description}</p>
      <button class="details-btn" data-id="${p.id}" aria-haspopup="dialog" aria-controls="modal">Details</button>
    </article>
  `).join('');
  attachProductDetailsListeners();
}

function attachProductDetailsListeners() {
  const detailButtons = document.querySelectorAll('.details-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      openModalWithProduct(productId);
    });
  });
}

function filterProducts(searchTerm) {
  let products = [];
  try {
    products = JSON.parse(localStorage.getItem('lastProducts')) || [];
  } catch {
    products = [];
  }
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayProducts(filtered.slice(0, 15));
}

// Load company ads into adGrid (first 5 companies)
async function loadAds() {
  try {
    const response = await fetch(COMPANIES_JSON);
    if (!response.ok) throw new Error('Companies fetch failed');
    const data = await response.json();
    adGrid.innerHTML = data.companies.slice(0, 5).map(c => `
      <article class="ad-card" tabindex="0" aria-label="Advertisement: ${c.name}">
        <img src="${c.logo}" alt="${c.name} logo" loading="lazy" />
        <h3 class="company-name">${c.name}</h3>
        <p>${c.description}</p>
        <a href="${c.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      </article>
    `).join('');
  } catch {
    adGrid.textContent = 'Failed to load ads.';
  }
}

// Load companies for directory page
async function loadCompanies() {
  try {
    const response = await fetch(COMPANIES_JSON);
    if (!response.ok) throw new Error('Companies fetch failed');
    const data = await response.json();
    companyGrid.innerHTML = data.companies.map(c => `
      <article class="company-card" tabindex="0" aria-label="Company: ${c.name}">
        <img src="${c.logo}" alt="${c.name} logo" loading="lazy" />
        <h3 class="company-name">${c.name}</h3>
        <p>${c.description}</p>
        <p><strong>Contact:</strong> ${c.contact}</p>
        <p><strong>Phone:</strong> ${c.phone}</p>
        <p><strong>Email:</strong> <a href="mailto:${c.email}">${c.email}</a></p>
        <a href="${c.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      </article>
    `).join('');
  } catch {
    companyGrid.textContent = 'Failed to load companies.';
  }
}

// Handle contact form submit
function handleFormSubmit() {
  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();

  if (!name || !email || !message) {
    formResult.textContent = 'Please fill in all fields.';
    formResult.style.color = 'red';
    return;
  }

  // Simulate sending form data...
  setTimeout(() => {
    formResult.textContent = `Thank you, ${name}! Your message has been sent.`;
    formResult.style.color = 'green';
    contactForm.reset();
  }, 500);
}

// Modal functionality (see modal.js for details)
function openModalWithProduct(productId) {
  // Use modal.js exported method
  import('./modal.js').then(({ openModal }) => {
    let products = [];
    try {
      products = JSON.parse(localStorage.getItem('lastProducts')) || [];
    } catch {
      products = [];
    }
    const product = products.find(p => p.id === productId);
    if (product) openModal(product);
  });
}
