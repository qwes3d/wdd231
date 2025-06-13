document.addEventListener("DOMContentLoaded", () => {
  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");
  const body = document.body;

  if (hamburger) {
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
  document.getElementById("controls")?.appendChild(searchButton);

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
      productGrid.innerHTML = "<p>Failed to load products.</p>";
    });

  // Populate category dropdown
  function populateCategoryFilter(products) {
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
    productGrid.innerHTML = "";
    if (products.length === 0) {
      productGrid.innerHTML = "<p>No products found.</p>";
      return;
    }

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
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
    document.getElementById("modal-title").textContent = product.name;
    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-image").alt = product.name;
    document.getElementById("modal-description").textContent = product.description;
    document.getElementById("modal-category").textContent = product.category;
    document.getElementById("modal-price").textContent = `₵${product.price}`;
    modal.classList.remove("hidden");
  }

  // Close modal
  closeModal?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Apply filters (category + search)
  function applyFilters() {
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
  categoryFilter.addEventListener("change", applyFilters);
  searchButton.addEventListener("click", applyFilters);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") applyFilters();
  });
});
