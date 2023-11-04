import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UpdateState = {
  hasUpdate: boolean;
};

const initialState: UpdateState = { hasUpdate: false };

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    setHasUpdate(state, action: PayloadAction<boolean>) {
      state.hasUpdate = action.payload;
    },
  },
});

export default updateSlice;
