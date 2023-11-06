import axios from "axios";
import { AllWeatherData, LocationData } from "types/data";
import { API_KEY } from "./common";

const defaultParams = {
  units: "metric",
  appid: API_KEY,
};

export const getLocations = async (
  city: string,
  options: { signal?: AbortSignal } = {},
) => {
  const api = `https://api.openweathermap.org/geo/1.0/direct`;
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
  const api = `https://api.openweathermap.org/geo/1.0/reverse`;
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

export const getAllWeatherDataByGeolocation = async (
  latitude: number,
  longitude: number,
  options: { signal?: AbortSignal } = {},
) => {
  const api = `https://api.openweathermap.org/data/2.5/onecall`;
  return (
    await axios.get(api, {
      params: {
        ...defaultParams,
        lat: latitude,
        lon: longitude,
        exclude: "minutely,hourly,alerts",
      },
      ...options,
    })
  ).data as AllWeatherData;
};
