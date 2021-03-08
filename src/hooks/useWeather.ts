import { useCallback, useEffect, useState } from "react";
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
  return {
    weatherData,
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
