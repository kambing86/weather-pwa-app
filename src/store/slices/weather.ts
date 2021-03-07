import { createSlice } from "@reduxjs/toolkit";
import {
  ThunkState,
  createInitialThunkState,
  handleThunk,
} from "store/helpers/thunk";
import {
  getAllData,
  getCurrentDataByCityName,
  getCurrentDataByGeolocation,
} from "store/thunks/weather";
import { AllWeatherData, CurrentWeatherData } from "types/data";

type WeatherState = {
  all: ThunkState<AllWeatherData>;
  current: ThunkState<CurrentWeatherData>;
};

const initialState: WeatherState = {
  all: createInitialThunkState(),
  current: createInitialThunkState(),
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleThunk(builder, getAllData, (state) => state.all);
    handleThunk(builder, getCurrentDataByCityName, (state) => state.current);
    handleThunk(builder, getCurrentDataByGeolocation, (state) => state.current);
  },
});

export default weatherSlice.reducer;
