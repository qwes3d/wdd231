
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

async function loadSpotlights() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  const members = data.members;

  const goldSilver = members.filter(member =>
    member.membership === 'gold' || member.membership === 'silver'
  );

  const shuffled = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

  const container = document.getElementById('spotlight-container');
  container.innerHTML = '';

  shuffled.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');
    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.logo}" alt="${member.name} logo" loading="lazy">
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership:</strong> ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

loadSpotlights();

const apiKey = 'YOUR_API_KEY'; // Replace with your actual OpenWeatherMap API key
const lat = 13.4833;  // San Miguel, El Salvador latitude
const lon = -88.1833; // San Miguel, El Salvador longitude

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  // Current Weather
  const current = data.list[0];
  document.getElementById('current-temp').textContent = current.main.temp.toFixed(1);
  document.getElementById('current-desc').textContent = current.weather[0].description;

  // Forecast: next 3 days (filter one time per day)
  const forecastList = document.getElementById('forecast-list');
  forecastList.innerHTML = ''; // Clear old forecast

  const dailyForecasts = {};
  data.list.forEach(forecast => {
    const date = forecast.dt_txt.split(' ')[0];
    if (!dailyForecasts[date] && Object.keys(dailyForecasts).length < 3) {
      dailyForecasts[date] = forecast;
    }
  });

  Object.entries(dailyForecasts).forEach(([date, forecast]) => {
    const li = document.createElement('li');
    li.textContent = `${date}: ${forecast.main.temp.toFixed(1)}°C`;
    forecastList.appendChild(li);
  });
}

getWeather();



