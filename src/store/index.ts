import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/theme";

const store = configureStore({
  reducer: {
    theme,
  },
  devTools: {
    name: "weather-pwa-app",
  },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
