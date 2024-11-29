import { createSlice } from "@reduxjs/toolkit";
import {
  type ThunkState,
  createInitialThunkState,
  handleThunk,
} from "store/helpers/thunk";
import {
  fetchLocations,
  fetchLocationsByGeolocation,
  getAllData,
} from "store/thunks/weather.thunks";
import type { AllData, LocationData } from "types/data";

type WeatherState = {
  allData: ThunkState<AllData>;
  locations: ThunkState<LocationData[]>;
};

const initialState: WeatherState = {
  allData: createInitialThunkState(),
  locations: createInitialThunkState(),
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleThunk(builder, getAllData, (state) => state.allData);
    handleThunk(builder, fetchLocations, (state) => state.locations);
    handleThunk(
      builder,
      fetchLocationsByGeolocation,
      (state) => state.locations,
    );
  },
});

export default weatherSlice;
