// weather.js
export async function fetchWeather() {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const city = 'Accra';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) throw new Error("Weather fetch failed");
  const data = await response.json();
  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    icon: data.weather[0].icon
  };
}
