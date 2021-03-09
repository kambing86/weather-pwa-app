import { useCallback, useEffect, useState } from "react";
import { weatherThunkActions } from "store/actions/weather";
import {
  useAllWeatherData,
  useCurrentWeatherData,
} from "store/selectors/weather";
import { useThunkStateWithSuspense } from "./helpers/useThunkStateWithSuspense";

export const useWeather = () => {
  const setPosition = useCallback((latitude: number, longitude: number) => {
    weatherThunkActions.getCurrentDataByGeolocation({ latitude, longitude });
  }, []);
  const weatherData = useAllWeatherData();
  const currentData = useCurrentWeatherData();
  return {
    weatherData,
    currentData,
    isInit: currentData.init,
    isLoading:
      !currentData.init ||
      currentData.loading ||
      !weatherData.init ||
      weatherData.loading,
    isLocationFound: currentData.error === undefined,
    location: currentData.data?.name ?? "",
    setLocation: weatherThunkActions.getCurrentDataByCityName,
    setPosition,
  };
};

export const useWeatherWithSuspense = () => {
  const {
    weatherData,
    currentData,
    isLocationFound,
    location,
    setLocation,
    setPosition,
  } = useWeather();
  useThunkStateWithSuspense(weatherData);
  useThunkStateWithSuspense(currentData);
  return { weatherData, isLocationFound, location, setLocation, setPosition };
};

export const useWeatherAtHomepage = () => {
  const { setLocation, setPosition } = useWeather();
  const [isGettingLocation, setIsGettingLocation] = useState(true);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsGettingLocation(false);
          const { latitude, longitude } = position.coords;
          setPosition(latitude, longitude);
        },
        () => {
          setIsGettingLocation(false);
        },
        { timeout: 5000 },
      );
    } else {
      setIsGettingLocation(false);
    }
  }, [setPosition]);
  return {
    isGettingLocation,
    setLocation,
  };
};
