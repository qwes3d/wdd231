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

  // Add Search Button
  const searchButton = document.createElement("button");
  searchButton.textContent = "Go";
  searchButton.id = "search-button";
  document.getElementById("controls")?.appendChild(searchButton);

  // Hardcoded Product Data
  const allProducts = [
    {
      name: "Concrete Mixer",
      category: "Construction Equipment",
      description: "Efficient electric concrete mixer for small and large projects.",
      price: 1500,
      image: "images/concrete.WEBP",
    },
    {
      name: "formwork",
      category: "Building Materials",
      description: "High-quality formwork for concrete structures.",
      price: 800,
      image: "images/formwork.WEBP",
      },
    {
      name: "Steel Rods",
      category: "Building Materials",
      description: "High-quality steel rods for reinforced concrete structures.",
      price: 250,
      image: "images/rebar.WEBP",
    },
    {
      name: "Wheelbarrow",
      category: "Construction Equipment",
      description: "Heavy-duty wheelbarrow for transporting materials on-site.",
      price: 300,
      image: "images/wheelbarrow.WEBP",
    },
    {
      name: "Cement Bags",
      category: "Building Materials",
      description: "Durable cement bags for all your concrete work.",
      price: 120,
      image: "images/cement.WEBP",
    },
    { name: "Safety Helmet",
      category: "Personal Protective Equipment",
      description: "Comfortable and durable safety helmet for construction workers.",
      price: 50,
      image: "images/safety-helmet.WEBP",
    },
    { name: "Power Drill",
      category: "Power Tools",
      description: "Versatile power drill for various construction tasks.",
      price: 800,
      image: "images/power-drill.WEBP",
      },
    {
      name: "Ladder",
      category: "Construction Equipment",
      description: "Sturdy ladder for reaching high places safely.",
      price: 400,
      image: "images/ladder.WEBP",
    },
    {
      name: "Safety Gloves",
      category: "Personal Protective Equipment",
      description: "Protective gloves for handling materials safely.",
      price: 30,
      image: "images/safety-gloves.WEBP",
    },
    {
      name: "Concrete Vibrator",
      category: "Construction Equipment",
      description: "Electric concrete vibrator for compacting concrete effectively.",
      price: 1200,
      image: "images/concrete-vibrator.WEBP",
    },
    {
      name: "Brick Trowel",
      category: "Hand Tools",
      description: "Essential tool for masonry work and brick laying.",
      price: 70,
      image: "images/brick-trowel.WEBP", 
    },
    {
      name: "Drill Bits",
      category: "Power Tools",
      description: "Set of high-quality drill bits for various materials.",
      price: 150,
      image: "images/drill-bits.WEBP",
    },
    {      name: "Concrete Saw",
      category: "Power Tools",
      description: "Powerful concrete saw for cutting through tough materials.",
      price: 2000,
      image: "images/concrete-saw.WEBP",
    },
    {
      name: "Safety Goggles",
      category: "Personal Protective Equipment",
      description: "Protective goggles for eye safety on construction sites.",
      price: 40, 
      image: "images/safety-goggles.WEBP",
      },
    {
      name: "Measuring Tape", 
      category: "Hand Tools",
      description: "Durable measuring tape for accurate measurements.",
      price: 25,
      image: "images/measuring-tape.WEBP",
    },
    {
      name: "Electric Jackhammer",
      category: "Power Tools",
      description: "Heavy-duty electric jackhammer for breaking concrete.",
      price: 3500,
      image: "images/eletric-jackhammer.WEBP",
      },
    {
      name: "Constructicon Boots",
      category: "Personal Protective Equipment",
      description: "Sturdy construction boots for safety and comfort.",
      price: 200,
      image: "images/construction-boots.WEBP",
    },
    { name: "Portable Generator",
      category: "Power Tools",
      description: "Reliable portable generator for power supply on-site.",
      price: 2500,
      image: "images/portable-generator.WEBP",
    },
    {
      name: "Concrete Finishing Trowel",
      category: "Hand Tools",
      description: "Essential tool for finishing concrete surfaces.",
      price: 90,  
      image: "images/concrete-finishing-trowel.WEBP",
    },
    {
      name: "chippings stone",
      category: "Building Materials",
      description: "High-quality chippings stone for construction projects.",
      price: 100,
      image: "images/stones.WEBP",
      },  
      ];

  // Populate filter options
  function populateCategoryFilter(products) {
    const categories = [...new Set(products.map(p => p.category))].sort();
    categories.forEach(category => {
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

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}"loading="lazy">
        <h4>${product.name}</h4>
        <p>${product.category}</p>
        <p><strong>₵${product.price}</strong></p>
      `;
      card.addEventListener("click", () => showModal(product));
      productGrid.appendChild(card);
    });
  }

  // Show product modal
  function showModal(product) {
    document.getElementById("modal-title").textContent = product.name;
    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-image").alt = product.name;
    document.getElementById("modal-description").textContent = product.description;
    document.getElementById("modal-category").textContent = product.category;
    document.getElementById("modal-price").textContent = `₵${product.price}`;
    modal.classList.remove("hidden");
  }

  closeModal?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Apply filters
  function applyFilters() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = allProducts.filter(product => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchText);
      return matchesCategory && matchesSearch;
    });

    displayProducts(filtered);
  }

  categoryFilter.addEventListener("change", applyFilters);
  searchButton.addEventListener("click", applyFilters);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") applyFilters();
  });

  populateCategoryFilter(allProducts);
  displayProducts(allProducts);
});


