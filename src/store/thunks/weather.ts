import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllWeatherDataByGeolocation,
  getCurrentWeatherByCityName,
  getCurrentWeatherByGeolocation,
} from "api/getWeather";

interface Coordinate {
  latitude: number;
  longitude: number;
}

export const getAllData = createAsyncThunk(
  "weather/getAllData",
  async (coordinate: Coordinate) => {
    const { latitude, longitude } = coordinate;
    return await getAllWeatherDataByGeolocation(latitude, longitude);
  },
);

export const getCurrentDataByCityName = createAsyncThunk(
  "weather/getCurrentDataByCityName",
  async (location: string, { dispatch }) => {
    const currentWeather = await getCurrentWeatherByCityName(location);
    const { lat: latitude, lon: longitude } = currentWeather.coord;
    void dispatch(
      getAllData({
        latitude,
        longitude,
      }),
    );
    return currentWeather;
  },
);

export const getCurrentDataByGeolocation = createAsyncThunk(
  "weather/getCurrentDataByGeolocation",
  async (coordinate: Coordinate, { dispatch }) => {
    const { latitude, longitude } = coordinate;
    void dispatch(getAllData(coordinate));
    return await getCurrentWeatherByGeolocation(latitude, longitude);
  },
);
