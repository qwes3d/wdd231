// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const membersSection = document.getElementById("members");
  const gridBtn = document.getElementById("gridView");
  const listBtn = document.getElementById("listView");
  const keynoteBtn = document.getElementById("keynoteBtn");
  const keynoteText = document.getElementById("keynoteText");

  // Fetch and display members
  fetch("data/members.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load members.json");
      return response.json();
    })
    .then((members) => {
      displayMembers(members);
    })
    .catch((error) => {
      console.error("Error loading members:", error);
    });

  function displayMembers(members) {
    membersSection.innerHTML = ""; // Clear old content

    members.forEach((member) => {
      const card = document.createElement("section");
      card.classList.add("member-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="300">
        <h3>${member.name}</h3>
        <p><strong>Description:</strong> ${member.description}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Membership Level:</strong> ${member.membership}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      `;

      membersSection.appendChild(card);
    });
  }

  // Toggle Grid/List Views
  gridBtn.addEventListener("click", () => {
    membersSection.classList.add("grid-view");
    membersSection.classList.remove("list-view");
  });

  listBtn.addEventListener("click", () => {
    membersSection.classList.add("list-view");
    membersSection.classList.remove("grid-view");
  });

  // Toggle Keynote Text Popup
  keynoteBtn.addEventListener("click", () => {
    keynoteText.classList.toggle("hidden");
  });

  // Show last modified date
  const lastModified = document.getElementById("last-modified");
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
});
