import styled from "styled-components";

/**
 * Weather card container
 */
const WeatherCardContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(253, 253, 253, 0.91);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

/**
 * City name
 */
const CityName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

/**
 * Country sup
 */
const CountrySup = styled.sup`
  font-size: 12px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-left: 5px;
`;

/**
 * Temperature
 */
const Temperature = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  display: block;
`;

/**
 * Weather icon
 */
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  //   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.1);
`;

/**
 * Weather card
 * @param {Object} weather - The weather object
 * @returns {React.ReactNode}
 */
const WeatherCard = ({ weather }) => {
  return (
    <WeatherCardContainer>
      <CityName>
        <span>{weather.name}</span>
        <CountrySup>{weather.sys.country}</CountrySup>
      </CityName>
      <WeatherIcon
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <Temperature>{Math.round(weather.main.temp - 273.15)}°C</Temperature>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
