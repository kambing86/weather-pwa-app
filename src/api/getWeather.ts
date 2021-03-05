import { API_KEY } from "./common";
import axios from "axios";
import { CurrentWeatherData, AllWeatherData } from "../types/data";

export const getCurrentWeatherByCityName = async (
  city: string
): Promise<CurrentWeatherData> => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  return (await axios.get(api)).data;
};

export const getCurrentWeatherByGeolocation = async (
  latitude: number,
  longitude: number
): Promise<CurrentWeatherData> => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  return (await axios.get(api)).data;
};

export const getAllWeatherDataByGeolocation = async (
  latitude: number,
  longitude: number
): Promise<AllWeatherData> => {
  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}`;
  return (await axios.get(api)).data;
};
