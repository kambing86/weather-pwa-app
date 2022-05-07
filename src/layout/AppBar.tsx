import AppBar, { AppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "./Drawer";

interface Props extends AppBarProps {
  open?: boolean;
}

export default styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>(({ theme, open }) => {
  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});
