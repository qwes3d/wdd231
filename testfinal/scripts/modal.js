const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalCloseBtn = document.getElementById('modalClose');

export function initModal() {
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

export function openModal(product) {
  modalContent.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name} image" style="max-width:100%; border-radius: 6px;" />
    <p>${product.description}</p>
    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
    <p><strong>Category:</strong> ${product.category}</p>
  `;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
