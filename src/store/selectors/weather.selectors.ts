import { useSelector } from "react-redux";
import type { RootState } from "store";

export const useAllData = () => {
  return useSelector((state: RootState) => state.weather.allData);
};

export const useLocations = () => {
  return useSelector((state: RootState) => state.weather.locations);
};
