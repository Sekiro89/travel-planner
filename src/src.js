const GEOAPIFY_KEY = "8c64c89911f94fbda370222a95fe66b1";
const WEATHER_KEY = "ebe71cc0b06c84e66756641268f2c49f";

// 1. Geocode a city name to lat/lon
export async function geocodeCity(cityName) {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(cityName)}&apiKey=${GEOAPIFY_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.features.length) throw new Error("City not found");
    const [lon, lat] = data.features[0].geometry.coordinates;
    return { lat, lon };
}

// 2. Get places near coordinates
export async function getNearbyPlaces(lat, lon) {
    const url = `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},5000&limit=10&apiKey=${GEOAPIFY_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.features.map(f => f.properties);
}

// 3. Get weather forecast
export async function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`;
    const res = await fetch(url);
    return await res.json();
}