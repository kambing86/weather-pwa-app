import { useSelector } from "react-redux";
import { RootState } from "store";

export const useAllWeatherData = () => {
  return useSelector((state: RootState) => state.weather.all);
};

export const useLocations = () => {
  return useSelector((state: RootState) => state.weather.locations);
};
