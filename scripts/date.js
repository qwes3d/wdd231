const lastModified = document.querySelector('footer p:nth-child(2)');
const date = new Date();
lastModified.textContent = `Last Update: ${document.lastModified}`;
