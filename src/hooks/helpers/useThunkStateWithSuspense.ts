import { ThunkState } from "store/helpers/thunk";

export const useThunkStateWithSuspense = <ReturnData>(
  thunkState: ThunkState<ReturnData>,
  delay = 1000,
) => {
  if (thunkState.loading) {
    throw new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  return thunkState.data as ReturnData;
};
