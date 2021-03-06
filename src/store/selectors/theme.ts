import { useSelector } from "react-redux";
import { State } from "store";

export const useThemeType = () => {
  return useSelector((state: State) => state.theme.themeType);
};
