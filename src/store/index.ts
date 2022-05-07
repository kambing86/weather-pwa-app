import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/theme.slice";
import update from "./slices/update.slice";
import weather from "./slices/weather.slice";

const store = configureStore({
  reducer: {
    theme,
    update,
    weather,
  },
  devTools: {
    name: "weather-pwa-app",
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
