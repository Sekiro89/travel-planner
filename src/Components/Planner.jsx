/*import { useState } from 'react';
import { geocodeCity, getNearbyPlaces, getWeather } from '/src/src.js';

export default function Planner() {
  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setLoading(true);
    setPlaces([]);
    setWeather(null);

    try {
      const { lat, lon } = await geocodeCity(city);
      const [placesData, weatherData] = await Promise.all([
        getNearbyPlaces(lat, lon),
        getWeather(lat, lon),
      ]);
      setPlaces(placesData);
      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="planner">
      <h2>Travel Itinerary Planner</h2>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Loading...' : 'Plan Trip'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="results">
        {places.length > 0 && (
          <div>
            <h3>Places of Interest</h3>
            <ul>
              {places.map((p, i) => (
                <li key={i}>{p.name || p.street || p.formatted}</li>
              ))}
            </ul>
          </div>
        )}

        {weather && (
          <div>
            <h3>7-Day Weather Forecast</h3>
            <ul>
              {weather.list.slice(0, 7).map((day, idx) => (
                <li key={idx}>
                  {new Date(day.dt * 1000).toDateString()} — {day.main.temp}°C, {day.weather[0].description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}*/
