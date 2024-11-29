import axios from "axios";
import type {
  CurrentWeatherData,
  ForecastData,
  LocationData,
} from "types/data";
import { API_KEY } from "./common";

const defaultParams = {
  units: "metric",
  appid: API_KEY,
};

export const getLocations = async (
  city: string,
  options: { signal?: AbortSignal } = {},
) => {
  const api = "https://api.openweathermap.org/geo/1.0/direct";
  return (
    await axios.get(api, {
      params: {
        ...defaultParams,
        q: city.toLowerCase(),
      },
      ...options,
    })
  ).data as LocationData[];
};

export const getLocationsByGeolocation = async (
  latitude: number,
  longitude: number,
  options: { signal?: AbortSignal } = {},
) => {
  const api = "https://api.openweathermap.org/geo/1.0/reverse";
  return (
    await axios.get(api, {
      params: {
        ...defaultParams,
        lat: latitude,
        lon: longitude,
      },
      ...options,
    })
  ).data as LocationData[];
};

export const getWeatherDataByGeolocation = async (
  latitude: number,
  longitude: number,
  options: { signal?: AbortSignal } = {},
) => {
  const api = "https://api.openweathermap.org/data/2.5/weather";
  return (
    await axios.get(api, {
      params: {
        ...defaultParams,
        lat: latitude,
        lon: longitude,
      },
      ...options,
    })
  ).data as CurrentWeatherData;
};

export const get7DaysForecastByGeolocation = async (
  latitude: number,
  longitude: number,
  options: { signal?: AbortSignal } = {},
) => {
  const api = "https://api.openweathermap.org/data/2.5/forecast/daily";
  return (
    await axios.get(api, {
      params: {
        ...defaultParams,
        lat: latitude,
        lon: longitude,
        cnt: 7,
      },
      ...options,
    })
  ).data as ForecastData;
};
