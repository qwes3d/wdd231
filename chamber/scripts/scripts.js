document.addEventListener('DOMContentLoaded', () => {
  // Navigation toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Close nav menu on mobile when link is clicked
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // Display last modified date
  const lastModified = document.getElementById('last-modified');
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }

  // Keynote toggle
  const keynoteBtn = document.getElementById('keynoteBtn');
  const keynoteText = document.getElementById('keynoteText');
  if (keynoteBtn && keynoteText) {
    keynoteBtn.addEventListener('click', () => {
      keynoteText.classList.toggle('show');
    });
  }

  // View toggle buttons
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

  // Load members and spotlights
  getMembers();
  getSpotlights();
  getWeather();
});

// Fetch and display all members
async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Failed to load members:", error);
  }
}

function displayMembers(members) {
  const container = document.getElementById("members");
  if (!container) return;

  container.innerHTML = "";

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

    container.appendChild(card);
  });
}

function membershipLevel(level) {
  switch (level) {
    case 3: return "Gold";
    case 2: return "Silver";
    default: return "Member";
  }
}

// Fetch and display spotlight members
async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();

    const qualifyingMembers = data.filter(member =>
      member.membership === 3 || member.membership === 2
    );

    const shuffled = qualifyingMembers.sort(() => 0.5 - Math.random());
    const spotlightCount = Math.floor(Math.random() * 2) + 2;
    const selectedMembers = shuffled.slice(0, spotlightCount);

    const container = document.getElementById('spotlight-container');
    if (!container) return;
    container.innerHTML = "";

    selectedMembers.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card', membershipLevel(member.membership).toLowerCase());

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p class="membership">${membershipLevel(member.membership).toUpperCase()} Member</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load spotlights:", error);
  }
}

// Fetch and display weather
async function getWeather() {
  const apiKey = "9a425d9df9f49312fd298b947ab9c00a"; // <-- Replace this with your actual OpenWeatherMap API key
  const lat = 13.4833;
  const lon = -88.1833;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather API response not OK");
    const data = await response.json();

    // Current weather
    const current = data.list[0];
    document.getElementById('current-temp').textContent = current.main.temp.toFixed(1);
    document.getElementById('current-desc').textContent = current.weather[0].description;

    // Forecast (next 3 days)
    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';
const forecastsByDate = {};

data.list.forEach(forecast => {
  const dateTime = forecast.dt_txt;
  const [date, time] = dateTime.split(" ");
  if (time === "12:00:00") {
    forecastsByDate[date] = forecast;
  }
});

// Grab the next 3 days
const dates = Object.keys(forecastsByDate).slice(0, 3);
dates.forEach(date => {
  const forecast = forecastsByDate[date];
  const li = document.createElement('li');
  const readableDate = new Date(date).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  li.textContent = `${readableDate}: ${forecast.main.temp.toFixed(1)}°C`;
  forecastList.appendChild(li);
});


  } catch (error) {
    console.error("Failed to fetch weather:", error);
    const errorDisplay = document.getElementById('weather-error');
    if (errorDisplay) {
      errorDisplay.textContent = "Unable to load weather data.";
    }
  }
}
