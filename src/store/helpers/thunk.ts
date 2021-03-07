import {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
  SerializedError,
} from "@reduxjs/toolkit";

export interface ThunkState<ReturnData> {
  readonly data?: ReturnData;
  readonly error?: SerializedError;
  readonly loading: boolean;
}

export function createInitialThunkState<ReturnData>(): ThunkState<ReturnData> {
  return {
    loading: false,
  };
}

export function handleThunk<State, ReturnData, Args>(
  builder: ActionReducerMapBuilder<State>,
  asyncThunk: AsyncThunk<ReturnData, Args, {}>, // eslint-disable-line @typescript-eslint/ban-types
  mapFunc: (state: Draft<State>) => Draft<ThunkState<ReturnData>>,
) {
  builder
    .addCase(asyncThunk.pending, (state) => {
      const thunkState = mapFunc(state);
      thunkState.loading = true;
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      const thunkState = mapFunc(state);
      thunkState.loading = false;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      thunkState.data = action.payload;
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      const thunkState = mapFunc(state);
      thunkState.loading = false;
      thunkState.error = action.error;
    });
}
