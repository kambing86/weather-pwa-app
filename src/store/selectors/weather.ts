import { useSelector } from "react-redux";
import { RootState } from "store";

export const useCurrentWeatherData = () => {
  return useSelector((state: RootState) => state.weather.current);
};

export const useAllWeatherData = () => {
  return useSelector((state: RootState) => state.weather.all);
};
