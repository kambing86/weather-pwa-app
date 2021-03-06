import { PaletteType } from "@material-ui/core";
import { createSlice } from "@reduxjs/toolkit";

const THEME_KEY = "WEATHER_PWA_THEME";
export const LIGHT = "light";
export const DARK = "dark";

function getSavedType() {
  return localStorage.getItem(THEME_KEY) as PaletteType | null;
}

type ThemeState = {
  themeType: PaletteType | null;
};

const initialState: ThemeState = { themeType: getSavedType() };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      const cur = state.themeType;
      const newVal = cur === DARK ? LIGHT : DARK;
      localStorage.setItem(THEME_KEY, newVal);
      state.themeType = newVal;
    },
  },
});

export default themeSlice.reducer;
