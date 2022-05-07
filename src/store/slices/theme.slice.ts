import { Palette } from "@mui/material/styles";
import { createSlice } from "@reduxjs/toolkit";

const THEME_KEY = "theme";
export const LIGHT = "light";
export const DARK = "dark";

function getTheme() {
  const saved = localStorage.getItem(THEME_KEY) as Palette["mode"] | null;
  if (saved != null) return saved;
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDarkMode ? DARK : LIGHT;
}

type State = Readonly<Palette["mode"] | null>;

const initialState: State = getTheme();

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      const newVal = state === DARK ? LIGHT : DARK;
      localStorage.setItem(THEME_KEY, newVal);
      return newVal;
    },
  },
});

export const themeActions = themeSlice.actions;

const theme = themeSlice.reducer;

export default theme;
