import { API_KEY } from "./common";

export const getLocationName = async (latitude: number, longitude: number) => {
  const api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  return (await fetch(api)).json();
};
