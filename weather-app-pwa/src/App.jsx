import axios from "axios";
import "./App.css";
import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ErrorCard from "./components/ErrorCard";
import InstallButton from "./components/InstallButton";

export default function () {
  /**
   * Weather state
   */
  const [weather, setWeather] = useState(null);

  /**
   * Error state
   */
  const [error, setError] = useState(null);

  const resetState = () => {
    setWeather(null);
    setError(null);
  };

  /**
   * Get weather from openweathermap
   * @param {string} city - The city name
   * @returns {Promise<void>}
   */
  const getWeather = async (city) => {
    resetState();

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}&lang=fa`
      );

      setWeather(res.data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="container">
      <div className="input-container">
        <InstallButton />
        <input
          type="text"
          placeholder="نام شهر را وارد کنید ..."
          onKeyDown={(e) => e.key === "Enter" && getWeather(e.target.value)}
        />
        {weather && <WeatherCard weather={weather} />}
        {error && <ErrorCard error={error} />}
      </div>
    </div>
  );
}
