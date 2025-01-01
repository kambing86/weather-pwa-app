import type { Palette } from "@mui/material/styles";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const THEME_KEY = "theme";
export const LIGHT = "light";
export const DARK = "dark";

function getTheme() {
  const saved = localStorage.getItem(THEME_KEY) as Palette["mode"] | null;
  if (saved != null) return saved;
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDarkMode ? DARK : LIGHT;
}

type State = {
  title: string[];
  mode: Readonly<Palette["mode"] | null>;
};

const initialState: State = {
  title: [],
  mode: getTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title.push(action.payload);
      return state;
    },
    removeTitle(state) {
      state.title.pop();
      return state;
    },
    toggleTheme(state) {
      const newVal = state.mode === DARK ? LIGHT : DARK;
      localStorage.setItem(THEME_KEY, newVal);
      state.mode = newVal;
      return state;
    },
  },
});

export default themeSlice;
