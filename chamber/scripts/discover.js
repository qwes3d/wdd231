document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("discoverGrid");
  fetch("data/discover.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.gridArea = `item${index + 1}`;
        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure><img src="${item.image}" alt="${item.title}"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        grid.appendChild(card);
        setTimeout(() => card.classList.add("loaded"), 100 * index);
      });
    });

  // Visitor Message Logic
  const msg = document.getElementById("visitorMessage");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  if (!lastVisit) {
    msg.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (days === 0) msg.textContent = "Back so soon! Awesome!";
    else msg.textContent = `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
  }
  localStorage.setItem("lastVisit", now);
});
