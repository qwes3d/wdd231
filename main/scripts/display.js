// scripts/display.js

// Extract form data from URL
const params = new URLSearchParams(window.location.search);

const formOutput = document.getElementById("form-output");

const name = params.get("name");
const email = params.get("email");
const product = params.get("product");
const details = params.get("details");

formOutput.innerHTML = `
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Product Needed:</strong> ${product}</p>
  <p><strong>Details:</strong> ${details}</p>
`;

// Fetch available products from JSON
const productList = document.getElementById("product-list");

fetch("scripts/data/products.json")
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(products => {
    productList.innerHTML = `
      <ul>
        ${products.map(item => `<li>${item.name}</li>`).join("")}
      </ul>
    `;
  })
  .catch(error => {
    productList.innerHTML = `<p>Failed to load product list: ${error.message}</p>`;
  });
