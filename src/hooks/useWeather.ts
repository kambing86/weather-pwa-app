import { useCallback, useEffect, useState } from "react";
import { weatherThunkActions } from "store/actions/weather";
import { useAllWeatherData, useLocations } from "store/selectors/weather";

export const useWeather = () => {
  const setPosition = useCallback((latitude: number, longitude: number) => {
    weatherThunkActions.fetchLocationsByGeolocation({ latitude, longitude });
  }, []);
  const weatherData = useAllWeatherData();
  const locationsData = useLocations();
  const setLocation = useCallback((location: string) => {
    weatherThunkActions.fetchLocations(location);
  }, []);
  const location = locationsData.data?.at(0);
  return {
    weatherData,
    isInit: locationsData.init,
    isLoading:
      !locationsData.init ||
      locationsData.loading ||
      !weatherData.init ||
      weatherData.loading,
    isLocationFound: locationsData.error === undefined,
    location,
    setLocation,
    setPosition,
  };
};

export const useWeatherAtHomepage = () => {
  const { setLocation, setPosition } = useWeather();
  const [isGettingLocation, setIsGettingLocation] = useState(true);
  useEffect(() => {
    let cleanup = false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (cleanup) return;
          setIsGettingLocation(false);
          const { latitude, longitude } = position.coords;
          setPosition(latitude, longitude);
        },
        () => {
          if (cleanup) return;
          setIsGettingLocation(false);
        },
        { timeout: 5000 },
      );
    } else {
      setIsGettingLocation(false);
    }
    return () => {
      cleanup = true;
    };
  }, [setPosition]);
  return {
    isGettingLocation,
    setLocation,
  };
};
