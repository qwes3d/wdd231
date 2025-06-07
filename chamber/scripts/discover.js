document.addEventListener("DOMContentLoaded", () => {
  // Load and display discover items
  fetch("data/discover.json")
    .then((res) => res.json())
    .then((data) => {
      const grid = document.getElementById("discoverGrid");
      data.items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("discover-card");

        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;

        grid.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Error loading JSON data:", err);
    });

  // Visitor Message Logic
  const msg = document.getElementById("visitorMessage");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  if (!lastVisit) {
    if (msg) msg.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (msg) {
      if (days === 0) msg.textContent = "Back so soon! Awesome!";
      else msg.textContent = `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
    }
  }
  localStorage.setItem("lastVisit", now);

  // Hamburger menu toggle with aria-expanded support
  const Hamburger = document.getElementById("hamburger");
  if (Hamburger) {
    Hamburger.addEventListener("click", () => {
      const nav = document.querySelector("nav");
      if (nav) {
        nav.classList.toggle("active");
        const expanded = Hamburger.getAttribute("aria-expanded") === "true";
        Hamburger.setAttribute("aria-expanded", String(!expanded));
      }
    });
  }

  // Last modified date
  const lastModified = document.getElementById("last-modified");
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
});
