import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "store";
import { useAllData, useLocations } from "store/selectors/weather.selectors";
import * as weatherThunk from "store/thunks/weather.thunks";

export const useWeather = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cancelCallback = useRef<(() => void) | null>(null);
  const weatherData = useAllData();
  const locationsData = useLocations();
  const setLocation = useCallback(
    (location: string) => {
      cancelCallback.current?.();
      async function fetchLocations() {
        const promise = dispatch(weatherThunk.fetchLocations(location));
        cancelCallback.current = promise.abort;
        await promise;
        cancelCallback.current = null;
      }
      setTimeout(() => {
        void fetchLocations();
      }, 0);
    },
    [dispatch],
  );
  const setPosition = useCallback(
    (latitude: number, longitude: number) => {
      cancelCallback.current?.();
      async function fetchLocationsByGeolocation() {
        const promise = dispatch(
          weatherThunk.fetchLocationsByGeolocation({ latitude, longitude }),
        );
        cancelCallback.current = promise.abort;
        await promise;
        cancelCallback.current = null;
      }
      setTimeout(() => {
        void fetchLocationsByGeolocation();
      }, 0);
    },
    [dispatch],
  );
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
  const ignoreSensorRef = useRef(false);
  const [isGettingLocation, setIsGettingLocation] = useState(true);
  useEffect(() => {
    let cleanup = false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (cleanup) return;
          setIsGettingLocation(false);
          if (ignoreSensorRef.current) return;
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
    setLocation: useCallback(
      (location: string) => {
        ignoreSensorRef.current = true;
        setIsGettingLocation(false);
        setLocation(location);
      },
      [setLocation],
    ),
  };
};
