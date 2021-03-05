import { useCallback, useEffect } from "react";
import {
  getCurrentWeatherByCityName,
  getAllWeatherDataByGeolocation,
  getCurrentWeatherByGeolocation,
} from "../api/getWeather";
import { AllWeatherData, CurrentWeatherData } from "../types/data";
import usePromise from "./helper/usePromise";

export const useWeather = () => {
  const [currentData, setCurrentData] = usePromise<CurrentWeatherData>();
  const [weatherData, setWeatherData] = usePromise<AllWeatherData>();
  const setLocation = useCallback(
    (location: string) => {
      setCurrentData(getCurrentWeatherByCityName(location));
    },
    [setCurrentData]
  );
  useEffect(() => {
    if (currentData.data) {
      const {
        coord: { lat, lon },
      } = currentData.data;
      setWeatherData(getAllWeatherDataByGeolocation(lat, lon));
    }
  }, [currentData.data, setWeatherData]);
  return {
    weatherData,
    setCurrentData,
    location: currentData.data?.name ?? "",
    setLocation,
  };
};

export const useWeatherAtHomepage = () => {
  const { weatherData, setCurrentData, location, setLocation } = useWeather();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentData(getCurrentWeatherByGeolocation(latitude, longitude));
      });
    }
  }, [setCurrentData]);
  return {
    weatherData,
    location,
    setLocation,
  };
};
