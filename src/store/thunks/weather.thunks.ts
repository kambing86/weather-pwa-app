import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllWeatherDataByGeolocation,
  getLocations,
  getLocationsByGeolocation,
} from "api/getWeather";
import type { Coordinate } from "types/data";

export const getAllData = createAsyncThunk(
  "weather/getAllData",
  async (coordinate: Coordinate, { signal }) => {
    const { latitude, longitude } = coordinate;
    return await getAllWeatherDataByGeolocation(latitude, longitude, {
      signal,
    });
  },
);

export const fetchLocations = createAsyncThunk(
  "weather/fetchLocations",
  async (location: string, { dispatch, signal }) => {
    const locations = await getLocations(location, { signal });
    const firstLocation = locations.at(0);
    if (firstLocation == null)
      throw new Error(`Location ${location} not found`);
    const { lat: latitude, lon: longitude } = firstLocation;
    const promise = dispatch(
      getAllData({
        latitude,
        longitude,
      }),
    );
    function abort() {
      promise.abort();
      signal.removeEventListener("abort", abort);
    }
    signal.addEventListener("abort", abort);
    await promise;
    return locations;
  },
);

export const fetchLocationsByGeolocation = createAsyncThunk(
  "weather/fetchLocationsByGeolocation",
  async (coordinate: Coordinate, { dispatch, signal }) => {
    const { latitude, longitude } = coordinate;
    const locationPromise = getLocationsByGeolocation(latitude, longitude, {
      signal,
    });
    const allDataThunk = dispatch(
      getAllData({
        latitude,
        longitude,
      }),
    );
    function abort() {
      allDataThunk.abort();
      signal.removeEventListener("abort", abort);
    }
    signal.addEventListener("abort", abort);
    const [location] = await Promise.all([locationPromise, allDataThunk]);
    return location;
  },
);
