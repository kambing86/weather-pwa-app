import { useSelector } from "react-redux";
import { RootState } from "store";

export const useThemeType = () => {
  return useSelector((state: RootState) => state.theme);
};
