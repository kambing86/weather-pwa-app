import axios from "axios";
import { AllWeatherData, LocationData } from "types/data";
import { API_KEY } from "./common";

const defaultParams = {
  units: "metric",
  appid: API_KEY,
};

export const getLocations = async (city: string) => {
  const api = `https://api.openweathermap.org/geo/1.0/direct`;
  return (
    await axios.get(api, {
      params: {
        ...defaultParams,
        q: city.toLowerCase(),
      },
    })
  ).data as LocationData[];
};

export const getLocationsByGeolocation = async (
  latitude: number,
  longitude: number,
) => {
  const api = `http://api.openweathermap.org/geo/1.0/reverse`;
  return (
    await axios.get(api, {
      params: {
        ...defaultParams,
        lat: latitude,
        lon: longitude,
      },
    })
  ).data as LocationData[];
};

export const getAllWeatherDataByGeolocation = async (
  latitude: number,
  longitude: number,
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
    })
  ).data as AllWeatherData;
};
