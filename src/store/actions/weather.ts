import { bindActionCreators } from "@reduxjs/toolkit";
import store from "store";
import weatherSlice from "store/slices/weather.slice";

export const weatherActions = bindActionCreators(
  weatherSlice.actions,
  store.dispatch,
);
