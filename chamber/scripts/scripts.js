// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');

  // Toggle navigation menu visibility
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Optional: Close menu when a link is clicked (on mobile)
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // Display last modified date in footer
  const lastModified = document.getElementById('last-modified');
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }

 
  const keynoteBtn = document.getElementById('keynoteBtn');
  const keynoteText = document.getElementById('keynoteText');

  keynoteBtn.addEventListener('click', () => {
    keynoteText.classList.toggle('show');
  });
});
// Fetch and display members data

const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" width="150" height="150">
      <h3>${member.name}</h3>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
  <p><a href="${member.website}" target="_blank">Visit Website</a></p>
  <p><strong>Membership:</strong> ${membershipLevel(member.membership)}</p>
`;

    membersContainer.appendChild(card);
  });
}

function membershipLevel(level) {
  return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
}

gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");
});

getMembers();

