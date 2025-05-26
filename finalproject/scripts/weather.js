const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const CITY = 'Accra,GH';

export async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather fetch failed');
    const data = await response.json();
    return {
      city: data.name,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description
    };
  } catch (error) {
    throw error;
  }
}
