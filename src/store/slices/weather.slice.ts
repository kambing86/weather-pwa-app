import { createSlice } from "@reduxjs/toolkit";
import {
  ThunkState,
  createInitialThunkState,
  handleThunk,
} from "store/helpers/thunk";
import {
  fetchLocations,
  fetchLocationsByGeolocation,
  getAllData,
} from "store/thunks/weather.thunks";
import type { AllWeatherData, LocationData } from "types/data";

type WeatherState = {
  all: ThunkState<AllWeatherData>;
  locations: ThunkState<LocationData[]>;
};

const initialState: WeatherState = {
  all: createInitialThunkState(),
  locations: createInitialThunkState(),
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleThunk(builder, getAllData, (state) => state.all);
    handleThunk(builder, fetchLocations, (state) => state.locations);
    handleThunk(
      builder,
      fetchLocationsByGeolocation,
      (state) => state.locations,
    );
  },
});

export default weatherSlice;
