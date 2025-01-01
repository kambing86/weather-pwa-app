import { Palette, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import themeSlice, { DARK, LIGHT } from "store/slices/theme.slice";

// set it here https://material-ui.com/customization/default-theme/
const getTheme = (themeMode: Palette["mode"] | null) => {
  const mode = themeMode === DARK ? DARK : LIGHT;
  return createTheme({
    palette: {
      mode,
    },
  });
};

// if user change the theme, it should save to localStorage and use it
// else will change the theme based on the machine dark mode
export const useAppTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const [theme, setTheme] = useState(getTheme(themeMode));
  const dispatch = useDispatch();
  const toggleDarkMode = useCallback(() => {
    dispatch(themeSlice.actions.toggleTheme());
  }, [dispatch]);
  // if localStorage has no saved theme type, then set using media query
  useEffect(() => {
    if (!prefersDarkMode || themeMode !== null) return;
    toggleDarkMode();
  }, [prefersDarkMode, themeMode, toggleDarkMode]);
  useEffect(() => {
    if (themeMode === DARK) {
      setTheme(getTheme(DARK));
    } else {
      setTheme(getTheme(LIGHT));
    }
  }, [themeMode]);
  return { theme, toggleDarkMode };
};
