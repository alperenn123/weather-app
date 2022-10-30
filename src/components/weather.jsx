import { useState } from "react";
import SearchBar from "./search-bar";
import LocationAndDate from "./location-and-date";
import CurrentTemprature from "./current-temprature";
import CurrentStats from "./current-stats";
import WeatherByHour from "./weather-by-hour";
import NextFiveDays from "./next-five-days";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [date, setDate] = useState();

  const createReadableDateFromDt = (dt) => {
    const ms = dt * 1000;
    const dateInstance = new Date(ms);
    const day = dateInstance.toLocaleString("en-US", { weekday: "long" });
    const monthName = dateInstance.toLocaleString("en-US", { month: "long" });
    const monthNumber = dateInstance.toLocaleString("en-US", {
      day: "numeric",
    });
    const year = dateInstance.toLocaleString("en-US", { year: "numeric" });
    setDate(`${day} ${monthNumber} ${monthName} ${year}`);
  };

  const createHourFromDt = (dt) => {
    const ms = dt * 1000;
    const dateInstance = new Date(ms);
    const hour = dateInstance.toLocaleString("en-UK", {
      hour: "numeric",
    });
    const minute = dateInstance.toLocaleString("en-UK", {
      minute: "numeric",
    });
    return `${hour} : ${minute}`;
  };

  const parseStats = (weatherData) => {
    const sunset = createHourFromDt(weatherData.sys.sunset);
    const sunrise = createHourFromDt(weatherData.sys.sunrise);
    const windSpeed = weatherData.wind.speed + " km/h";
    const humidity = weatherData.main.humidity + "%";
    const minimumTemprature = weatherData.main.temp_min + "\u00b0";
    const maximumTemprature = weatherData.main.temp_max + "\u00B0";

    return {
      sunset,
      sunrise,
      windSpeed,
      humidity,
      maximumTemprature,
      minimumTemprature,
    };
  };

  const onSearchDataChanged = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const apiKey = "e8547c3b241c753a9eba90ed273d5194";
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const weatherPromise = fetch(weatherApiUrl);
    const forecastPromise = fetch(forecastApiUrl);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        weatherPromise,
        forecastPromise,
      ]);
      const [weatherJsonData, forecastJsonData] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json(),
      ]);

      createReadableDateFromDt(weatherJsonData.dt);
      setCurrentWeather(weatherJsonData);
      setCurrentForecast(forecastJsonData);
      setShouldRender(true);
    } catch (ex) {
      console.log(ex);
      setShouldRender(false);
    }
  };

  return (
    <main className="main-container">
      <SearchBar onSearchChange={onSearchDataChanged} />
      {shouldRender && (
        <>
          <LocationAndDate
            location={currentWeather.name + ", " + currentWeather.sys.country}
            date={date}
          />
          <CurrentTemprature
            temprature={currentWeather.main.temp}
            summary={currentWeather.weather[0].description}
            iconIndex={currentWeather.weather[0].icon}
          />
          <CurrentStats currentStats={parseStats(currentWeather)} />
          <WeatherByHour forecastData={currentForecast} />
          <NextFiveDays forecastData={currentForecast} />
        </>
      )}
    </main>
  );
};

export default Weather;
