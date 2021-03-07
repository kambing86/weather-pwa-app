import { useSelector } from "react-redux";
import { State } from "store";

export const useHasUpdate = () => {
  return useSelector((state: State) => state.update.hasUpdate);
};
