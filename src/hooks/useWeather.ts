import { useEffect, useState } from "react";
import { getLocationName } from "../api/getLocation";
import { getWeatherByGeolocation } from "../api/getWeather";
import usePromise from "./helper/usePromise";

export const useWeatherAtHomepage = () => {
  const [position, setPosition] = useState<GeolocationPosition>();
  const [weather, setWeather] = usePromise();
  const [location, setLocation] = usePromise();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    }
  }, []);
  useEffect(() => {
    if (position) {
      const { latitude, longitude } = position.coords;
      setWeather(getWeatherByGeolocation(latitude, longitude));
      setLocation(getLocationName(latitude, longitude));
    }
  }, [position, setWeather, setLocation]);
  return { weather, location };
};
