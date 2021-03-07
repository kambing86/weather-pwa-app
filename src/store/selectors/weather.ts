import { useSelector } from "react-redux";
import { State } from "store";

export const useCurrentWeatherData = () => {
  return useSelector((state: State) => state.weather.current);
};

export const useAllWeatherData = () => {
  return useSelector((state: State) => state.weather.all);
};
