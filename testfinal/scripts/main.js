document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation toggle ---
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }

  // --- Last Modified Date ---
  const lastModified = document.getElementById('last-modified');
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }

  // --- Keynote toggle ---
  const keynoteBtn = document.getElementById('keynoteBtn');
  const keynoteText = document.getElementById('keynoteText');
  if (keynoteBtn && keynoteText) {
    keynoteBtn.addEventListener('click', () => {
      keynoteText.classList.toggle('show');
    });
  }

  // --- Grid/List toggle for members ---
  const membersContainer = document.getElementById("members");
  const gridBtn = document.getElementById("gridView");
  const listBtn = document.getElementById("listView");

  if (gridBtn && listBtn && membersContainer) {
    gridBtn.addEventListener("click", () => {
      membersContainer.classList.add("grid-view");
      membersContainer.classList.remove("list-view");
    });

    listBtn.addEventListener("click", () => {
      membersContainer.classList.add("list-view");
      membersContainer.classList.remove("grid-view");
    });
  }

  // --- Load product spotlight ---
  async function loadSpotlights() {
    try {
      const response = await fetch("scripts/data/products.json");
      const products = await response.json();

      if (!Array.isArray(products) || products.length === 0) throw new Error("No products found");

      const product = products[Math.floor(Math.random() * products.length)];
      document.getElementById("spotlight-container").innerHTML = `
        <div class="card spotlight-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </div>`;
    } catch (error) {
      console.error("Failed to load spotlight:", error);
      document.getElementById("spotlight-container").textContent = "Unable to load featured product.";
    }
  }
  loadSpotlights();

  // --- Load advertisements ---
  const adContainer = document.getElementById("advertisement-container");
  if (adContainer) {
    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Loading advertisements...";
    loadingMessage.id = "ad-loading";
    adContainer.parentElement.insertBefore(loadingMessage, adContainer);

    fetch("scripts/data/ads.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch ad data");
        return res.json();
      })
      .then(ads => {
        loadingMessage.hidden = true;
        if (!ads.length) {
          adContainer.innerHTML = "<p>No advertisements available at the moment.</p>";
          return;
        }
        ads.forEach(ad => {
          const card = document.createElement("div");
          card.classList.add("ad-card");
          card.innerHTML = `
            <img src="${ad.image}" alt="${ad.name}" loading="lazy">
            <h3>${ad.name}</h3>
            <p>${ad.description}</p>
            <a href="${ad.link}" class="ad-link" aria-label="Learn more about ${ad.title}">Learn more</a>
          `;
          adContainer.appendChild(card);
        });
      })
      .catch(err => {
        loadingMessage.hidden = true;
        adContainer.innerHTML = `<p class="error">Error loading advertisements: ${err.message}</p>`;
      });
  }

  // --- Load and display business companies ---
  const companies = document.getElementById("companies");
  if (companies) {
    if (gridBtn && listBtn) {
      gridBtn.addEventListener("click", () => {
        companies.classList.add("grid-view");
        companies.classList.remove("list-view");
      });
      listBtn.addEventListener("click", () => {
        companies.classList.add("list-view");
        companies.classList.remove("grid-view");
      });
    }

    async function loadCompanies() {
      try {
        const response = await fetch("scripts/data/companies.json");
        const data = await response.json();

        data.forEach((company) => {
          const card = document.createElement("article");
          card.classList.add("company-card", company.membership);

          card.innerHTML = `
            <img src="${company.image}" alt="${company.name} Logo" loading="lazy" />
            <h3>${company.name}</h3>
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Description:</strong> ${company.description}</p>
            <p><strong>Email:</strong> <a href="mailto:${company.email}">${company.email}</a></p>
            <p><strong>Membership:</strong> ${company.membership}</p>
            <p><strong>Contact:</strong> ${company.contact}</p>
            <p><strong>Phone:</strong> ${company.phone}</p>
            <a href="${company.website}" target="_blank" rel="noopener">Visit Website</a>
          `;

          companies.appendChild(card);
        });
      } catch (err) {
        companies.innerHTML = `<p class="error">Unable to load companies: ${err.message}</p>`;
      }
    }

    loadCompanies();
  }
});
