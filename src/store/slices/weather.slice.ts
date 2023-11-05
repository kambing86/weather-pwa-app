import { createSlice } from "@reduxjs/toolkit";
import {
  ThunkState,
  createInitialThunkState,
  handleThunk,
} from "store/helpers/thunk";
import {
  fetchLocations,
  getAllData,
  getCurrentDataByCityName,
  getCurrentDataByGeolocation,
} from "store/thunks/weather";
import type {
  AllWeatherData,
  CurrentWeatherData,
  LocationData,
} from "types/data";

type WeatherState = {
  all: ThunkState<AllWeatherData>;
  current: ThunkState<CurrentWeatherData>;
  locations: ThunkState<LocationData[]>;
};

const initialState: WeatherState = {
  all: createInitialThunkState(),
  current: createInitialThunkState(),
  locations: createInitialThunkState(),
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleThunk(builder, getAllData, (state) => state.all);
    handleThunk(builder, getCurrentDataByCityName, (state) => state.current);
    handleThunk(builder, getCurrentDataByGeolocation, (state) => state.current);
    handleThunk(builder, fetchLocations, (state) => state.locations);
  },
});

export default weatherSlice;
