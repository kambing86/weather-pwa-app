import React, { ChangeEvent, useCallback, useState, useRef } from "react";
import { useFavourite } from "./hooks/useFavourite";
import { useWeatherAtHomepage } from "./hooks/useWeather";

function App() {
  const {
    weatherData,
    isLocationFound,
    location,
    setLocation,
  } = useWeatherAtHomepage();
  const [search, setSearch] = useState("");
  const inputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const searchRef = useRef(search);
  searchRef.current = search;
  const clickSearch = useCallback(() => {
    setLocation(searchRef.current);
  }, [setLocation]);
  const { favouriteList, addFavourite } = useFavourite();
  return (
    <div className="App">
      <header>Weather app</header>
      <main>
        <div>
          <input onChange={inputChange} value={search} />
          <button onClick={clickSearch}>Search</button>
        </div>
        {!isLocationFound && <div>Location not found</div>}
        {isLocationFound && (
          <>
            <div>
              {location}
              {location !== "" &&
                favouriteList.find((o) => o === location) === undefined && (
                  <button onClick={() => addFavourite(location)}>
                    Favourite
                  </button>
                )}
            </div>
            <div>
              {weatherData.loading && "Loading..."}
              {weatherData.error && weatherData.error.toString()}
              {weatherData.data &&
                weatherData.data.current.weather[0].description}
              {weatherData.data && (
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.data.current.weather[0].icon}.png`}
                  alt={weatherData.data.current.weather[0].description}
                />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
