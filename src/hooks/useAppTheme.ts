import {
  PaletteType,
  ThemeOptions,
  createMuiTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { themeActions } from "store/actions/theme";
import { useThemeType } from "store/selectors/theme";
import { DARK, LIGHT } from "store/slices/theme";

// set it here https://material-ui.com/customization/default-theme/
const getTheme = (themeType: PaletteType | null) => {
  const type = themeType === DARK ? DARK : LIGHT;
  const options: ThemeOptions =
    type === DARK
      ? {
          palette: {
            type,
            background: {
              default: "#121212",
            },
            primary: {
              contrastText: "rgba(0, 0, 0, 0.87)",
              dark: "rgb(100, 141, 174)",
              light: "rgb(166, 212, 250)",
              main: "#90caf9",
            },
            secondary: {
              contrastText: "rgba(0, 0, 0, 0.87)",
              dark: "rgb(170, 100, 123)",
              light: "rgb(246, 165, 192)",
              main: "#f48fb1",
            },
          },
        }
      : {
          palette: {
            type,
            action: {
              hover: "rgba(0, 0, 0, 0.1)",
              hoverOpacity: 0.1,
              selected: "rgba(0, 0, 0, 0.2)",
              selectedOpacity: 0.2,
            },
          },
        };
  return createMuiTheme(options);
};

// if user change the theme, it should save to localStorage and use it
// else will change the theme based on the machine dark mode
export const useAppTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeType = useThemeType();
  const [theme, setTheme] = useState(getTheme(themeType));
  // if localStorage has no saved theme type, then set dark using media query
  useEffect(() => {
    if (!prefersDarkMode || themeType !== null) return;
    themeActions.setDark();
  }, [prefersDarkMode, themeType]);
  useEffect(() => {
    if (themeType === DARK) {
      setTheme(getTheme(DARK));
    } else {
      setTheme(getTheme(LIGHT));
    }
  }, [themeType]);
  const toggleDarkMode = themeActions.toggleTheme;
  return { theme, toggleDarkMode };
};
