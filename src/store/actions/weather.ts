import { bindActionCreators } from "@reduxjs/toolkit";
import store from "store";
import { weatherSlice } from "store/slices/weather.slice";
import * as weatherThunk from "store/thunks/weather";

export const weatherActions = bindActionCreators(
  weatherSlice.actions,
  store.dispatch,
);

export const weatherThunkActions = bindActionCreators(
  weatherThunk,
  store.dispatch,
);
