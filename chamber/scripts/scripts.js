// Hamburger menu toggle
document.getElementById("hamburger").addEventListener("click", function () {
  document.getElementById("nav-menu").classList.toggle("active");
});

// Display last modified date
document.getElementById("last-modified").textContent = document.lastModified;
