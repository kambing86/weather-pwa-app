import React, { ChangeEvent, useCallback, useState, useRef } from "react";
import { useWeatherAtHomepage } from "./hooks/useWeather";

function App() {
  const { weatherData, location, setLocation } = useWeatherAtHomepage();
  const [search, setSearch] = useState("");
  const inputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const searchRef = useRef(search);
  searchRef.current = search;
  const clickSearch = useCallback(() => {
    setLocation(searchRef.current);
  }, [setLocation]);
  return (
    <div className="App">
      <header>Weather app</header>
      <main>
        <div>
          <input onChange={inputChange} value={search} />
          <button onClick={clickSearch}>Search</button>
        </div>
        <div>
          {weatherData.loading && "Loading..."}
          {weatherData.error && weatherData.error.toString()}
          {weatherData.data && weatherData.data.current.weather[0].description}
          {weatherData.data && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.data.current.weather[0].icon}.png`}
              alt={weatherData.data.current.weather[0].description}
            />
          )}
        </div>
        <div>{location}</div>
      </main>
    </div>
  );
}

export default App;
