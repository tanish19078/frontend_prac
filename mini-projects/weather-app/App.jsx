const { useState, useEffect } = React;

const cityData = {
  delhi: { city: "Delhi", temp: 32, condition: "Sunny", emoji: "☀️", humidity: 45, wind: 12, forecast: [33, 31, 30, 32] },
  london: { city: "London", temp: 18, condition: "Cloudy", emoji: "☁️", humidity: 75, wind: 18, forecast: [17, 19, 16, 18] },
  tokyo: { city: "Tokyo", temp: 24, condition: "Rainy", emoji: "🌧️", humidity: 80, wind: 10, forecast: [25, 23, 22, 26] },
  newyork: { city: "New York", temp: 21, condition: "Clear", emoji: "🌤️", humidity: 55, wind: 14, forecast: [22, 20, 23, 25] }
};

function App() {
  const [cityInput, setCityInput] = useState("");
  const [current, setCurrent] = useState(cityData.delhi);
  const [isCelsius, setIsCelsius] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    const key = cityInput.trim().toLowerCase().replace(/\s+/g, "");
    if (cityData[key]) {
      setCurrent(cityData[key]);
    } else {
      const randomTemp = Math.floor(Math.random() * 20) + 15;
      setCurrent({
        city: cityInput.trim(),
        temp: randomTemp,
        condition: "Partly Cloudy",
        emoji: "⛅",
        humidity: 60,
        wind: 15,
        forecast: [randomTemp + 1, randomTemp - 1, randomTemp + 2, randomTemp]
      });
    }
    setCityInput("");
  };

  const convert = (celsius) => (isCelsius ? celsius : Math.round((celsius * 9) / 5 + 32));
  const unit = isCelsius ? "°C" : "°F";

  return (
    <div className="weather-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h1>Weather App</h1>
        <button className="unit-btn" onClick={() => setIsCelsius(!isCelsius)}>
          Switch to {isCelsius ? "°F" : "°C"}
        </button>
      </div>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search city (e.g. London, Tokyo)..."
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <div className="current-weather">
        <h2>{current.city}</h2>
        <div style={{ fontSize: "48px", margin: "4px 0" }}>{current.emoji}</div>
        <div className="temp-large">
          {convert(current.temp)}{unit}
        </div>
        <p className="condition">{current.condition}</p>

        <div className="details">
          <span>💧 Humidity: {current.humidity}%</span>
          <span>💨 Wind: {current.wind} km/h</span>
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <h3 style={{ fontSize: "14px", color: "#444" }}>4-Day Forecast</h3>
        <div className="forecast-grid">
          {current.forecast.map((t, i) => (
            <div key={i} className="forecast-item">
              <div>Day {i + 1}</div>
              <strong>{convert(t)}{unit}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
