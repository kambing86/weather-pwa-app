import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
  SerializedError,
} from "@reduxjs/toolkit";

export interface ThunkState<ReturnData> {
  readonly data?: ReturnData;
  readonly error?: SerializedError;
  readonly init: boolean;
  readonly loading: boolean;
}

export function createInitialThunkState<ReturnData>(): ThunkState<ReturnData> {
  return {
    init: false,
    loading: false,
  };
}

export function handleThunk<State, ReturnData, Args>(
  builder: ActionReducerMapBuilder<State>,
  asyncThunk: AsyncThunk<ReturnData, Args, Record<string, never>>,
  mapFunc: (state: Draft<State>) => Draft<ThunkState<ReturnData>>,
) {
  builder
    .addCase(asyncThunk.pending, (state) => {
      const thunkState = mapFunc(state);
      thunkState.data = undefined;
      thunkState.error = undefined;
      thunkState.init = true;
      thunkState.loading = true;
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      const thunkState = mapFunc(state);
      thunkState.loading = false;
      thunkState.error = undefined;
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
