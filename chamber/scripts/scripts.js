document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('nav');})

  // Move hamburger to far right using inline style
  hamburger.style.marginLeft = 'auto';
  hamburger.style.display = 'block';

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');})
// Display last modified date
document.getElementById("last-modified").textContent = document.lastModified;
