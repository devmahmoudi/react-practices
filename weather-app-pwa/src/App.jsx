import axios from "axios";
import "./App.css";
import { useState } from "react";

export default function () {
  /**
   * Weather state
   */
  const [weather, setWeather] = useState(null);

  /**
   * Get weather from openweathermap
   * @param {string} city - The city name
   * @returns {Promise<void>}
   */
  const getWeather = async (city) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`
    );

    setWeather(res.data);
  };
  return (
    <div className="container">
      <div>
        <input
          type="text"
          placeholder="نام شهر را وارد کنید ..."
          onKeyDown={(e) => e.key === "Enter" && getWeather(e.target.value)}
        />
      </div>
    </div>
  );
}
