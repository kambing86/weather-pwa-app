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
  const setPosition = useCallback(
    (latitude: number, longitude: number) => {
      setCurrentData(getCurrentWeatherByGeolocation(latitude, longitude));
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
    isLocationFound: !currentData.error,
    location: currentData.data?.name ?? "",
    setLocation,
    setPosition,
  };
};

export const useWeatherAtHomepage = () => {
  const {
    weatherData,
    isLocationFound,
    location,
    setLocation,
    setPosition,
  } = useWeather();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition(latitude, longitude);
      });
    }
  }, [setPosition]);
  return {
    weatherData,
    isLocationFound,
    location,
    setLocation,
  };
};
