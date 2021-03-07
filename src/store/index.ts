import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/theme";
import update from "./slices/update";
import weather from "./slices/weather";

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

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
