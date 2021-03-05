import { API_KEY } from "./common";

export const getWeatherByCityName = async (city: string) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  return (await fetch(api)).json();
};

export const getWeatherByGeolocation = async (
  latitude: number,
  longitude: number
) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  return (await fetch(api)).json();
};
