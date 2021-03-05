import axios from "axios";
import { AllWeatherData, CurrentWeatherData } from "../types/data";
import { API_KEY } from "./common";

export const getCurrentWeatherByCityName = async (city: string) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  return (await axios.get(api)).data as CurrentWeatherData;
};

export const getCurrentWeatherByGeolocation = async (
  latitude: number,
  longitude: number,
) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  return (await axios.get(api)).data as CurrentWeatherData;
};

export const getAllWeatherDataByGeolocation = async (
  latitude: number,
  longitude: number,
) => {
  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}`;
  return (await axios.get(api)).data as AllWeatherData;
};
