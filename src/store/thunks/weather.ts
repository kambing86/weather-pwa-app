import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllWeatherDataByGeolocation,
  getLocations,
  getLocationsByGeolocation,
} from "api/getWeather";
import type { Coordinate } from "types/data";

export const getAllData = createAsyncThunk(
  "weather/getAllData",
  async (coordinate: Coordinate) => {
    const { latitude, longitude } = coordinate;
    return await getAllWeatherDataByGeolocation(latitude, longitude);
  },
);

export const fetchLocations = createAsyncThunk(
  "weather/fetchLocations",
  async (location: string, { dispatch }) => {
    const locations = await getLocations(location);
    const firstLocation = locations.at(0);
    if (firstLocation == null)
      throw new Error(`Location ${location} not found`);
    const { lat: latitude, lon: longitude } = firstLocation;
    void dispatch(
      getAllData({
        latitude,
        longitude,
      }),
    );
    return locations;
  },
);

export const fetchLocationsByGeolocation = createAsyncThunk(
  "weather/fetchLocationsByGeolocation",
  async (coordinate: Coordinate, { dispatch }) => {
    const { latitude, longitude } = coordinate;
    void dispatch(
      getAllData({
        latitude,
        longitude,
      }),
    );
    return await getLocationsByGeolocation(latitude, longitude);
  },
);
