import React from "react";
import { useWeatherAtHomepage } from "./hooks/useWeather";

function App() {
  const { weather, location } = useWeatherAtHomepage();
  return (
    <div className="App">
      <header>Weather app</header>
      <main>
        <div>
          {weather.loading && "Loading..."}
          {weather.error && weather.error.toString()}
          {weather.data && JSON.stringify(weather.data)}
          {location.loading && "Loading..."}
          {location.error && location.error.toString()}
          {location.data && JSON.stringify(location.data)}
        </div>
      </main>
    </div>
  );
}

export default App;
