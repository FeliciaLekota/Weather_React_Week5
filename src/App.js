import "./styles.css";
import React, { useState } from "react";

function App() {
  const [temp, setTemp] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");

  const apiKey = "535cacbb3f8a0df0aeb4790235b9541f";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      handleResponse(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  function handleResponse(data) {
    setTemp(Math.round(data.main.temp));
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setDescription(data.weather[0].description);
    setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    setCity(data.name);
  }

  return (
    <div className="container">
      <div className="SearchEngine">
        <form onSubmit={handleSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Enter a city"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <button className="searchBtn" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="cityTemp">
        <h1 className="city">{city || "Enter a city"}</h1>
        <p className="date">{date || "Date/Time"}</p>
        <p className="description">{description || "Weather Description"}</p>
      </div>
      <span>
        <p className="Temp">{temp ? `${temp}` : "--"}</p>℃|℉
      </span>
      <div className="HumWind">
        <p className="Humidity">Humidity: {humidity ? `${humidity}%` : "--"}</p>
        <p className="wind">Wind: {wind ? `${wind} km/h` : "--"}</p>
      </div>
      {icon && <img src={icon} alt="Weather icon" />}
    </div>
  );
}

export default App;
