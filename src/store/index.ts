import { configureStore } from "@reduxjs/toolkit";
import billsSlice from "./slices/bills.slice";
import themeSlice from "./slices/theme.slice";
import updateSlice from "./slices/update.slice";
import weatherSlice from "./slices/weather.slice";

const store = configureStore({
  reducer: {
    bills: billsSlice.reducer,
    theme: themeSlice.reducer,
    update: updateSlice.reducer,
    weather: weatherSlice.reducer,
  },
  devTools: {
    name: "weather-pwa-app",
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
