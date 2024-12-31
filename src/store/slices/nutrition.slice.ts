import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: {},
};

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {},
});

export default nutritionSlice;
