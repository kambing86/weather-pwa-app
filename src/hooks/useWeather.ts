import { useCallback, useEffect } from "react";
import { weatherThunkActions } from "store/actions/weather";
import {
  useAllWeatherData,
  useCurrentWeatherData,
} from "store/selectors/weather";

export const useWeather = () => {
  const setPosition = useCallback((latitude: number, longitude: number) => {
    weatherThunkActions.getCurrentDataByGeolocation({ latitude, longitude });
  }, []);
  const weatherData = useAllWeatherData();
  const currentData = useCurrentWeatherData();
  useEffect(() => {
    if (currentData.data) {
      const {
        coord: { lat, lon },
      } = currentData.data;
      weatherThunkActions.getAllData({ latitude: lat, longitude: lon });
    }
  }, [currentData.data]);

  return {
    weatherData,
    isLocationFound: currentData.error === undefined,
    location: currentData.data?.name ?? "",
    setLocation: weatherThunkActions.getCurrentDataByCityName,
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
