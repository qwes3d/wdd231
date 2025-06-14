document.addEventListener("DOMContentLoaded", () => {
  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");
  const body = document.body;

  if (hamburger && nav && body) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!isExpanded));
      nav.classList.toggle("open");
      body.classList.toggle("nav-open");
    });
  }

  // ===== PRODUCT LISTING & FILTER =====
  const productGrid = document.getElementById("product-grid");
  const categoryFilter = document.getElementById("category-filter");
  const searchInput = document.getElementById("search-input");
  const modal = document.getElementById("product-modal");
  const closeModal = document.getElementById("close-modal");

  let allProducts = [];

  // Add Search Button
  const searchButton = document.createElement("button");
  searchButton.textContent = "Go";
  searchButton.id = "search-button";
  const controls = document.getElementById("controls");
  if (controls) {
    controls.appendChild(searchButton);
  }

  // Fetch product data from JSON
  fetch("scripts/data/products.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch product data.");
      return response.json();
    })
    .then((data) => {
      allProducts = data;
      populateCategoryFilter(allProducts);
      displayProducts(allProducts);
    })
    .catch((error) => {
      console.error("Error loading products:", error);
      if (productGrid) {
        productGrid.innerHTML = "<p>Failed to load products.</p>";
      }
    });

  // Populate category dropdown
  function populateCategoryFilter(products) {
    if (!categoryFilter) return;

    categoryFilter.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "All Categories";
    categoryFilter.appendChild(defaultOption);

    const categories = [...new Set(products.map((p) => p.category))].sort();
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  // Display products
  function displayProducts(products) {
    if (!productGrid) return;

    productGrid.innerHTML = "";
    if (products.length === 0) {
      productGrid.innerHTML = "<p>No products found.</p>";
      return;
    }

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <h4>${product.name}</h4>
        <p>${product.category}</p>
        <p><strong>₵${product.price}</strong></p>
      `;
      card.addEventListener("click", () => showModal(product));
      productGrid.appendChild(card);
    });
  }

  // Show modal with product info
  function showModal(product) {
    if (!modal) return;

    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const modalCategory = document.getElementById("modal-category");
    const modalPrice = document.getElementById("modal-price");

    if (modalTitle) modalTitle.textContent = product.name;
    if (modalImage) {
      modalImage.src = product.image;
      modalImage.alt = product.name;
    }
    if (modalDescription) modalDescription.textContent = product.description;
    if (modalCategory) modalCategory.textContent = product.category;
    if (modalPrice) modalPrice.textContent = `₵${product.price}`;

    modal.classList.remove("hidden");
  }

  // Close modal
  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  if (modal) {
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }

  // Apply filters (category + search)
  function applyFilters() {
    if (!categoryFilter || !searchInput || !productGrid) return;

    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = allProducts.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);
      return matchesCategory && matchesSearch;
    });

    displayProducts(filtered);
  }

  // Event Listeners
  if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
  }

  if (searchButton) {
    searchButton.addEventListener("click", applyFilters);
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") applyFilters();
    });
  }
});
