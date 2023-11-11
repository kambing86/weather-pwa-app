import { useSelector } from "react-redux";
import { RootState } from "store";

export const useHasUpdate = () => {
  return useSelector((state: RootState) => state.update.hasUpdate);
};
