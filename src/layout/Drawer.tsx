import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { permanantSideBar } from "features";

export const drawerWidth = 240;

export default permanantSideBar
  ? styled(Drawer, { shouldForwardProp: (prop) => prop !== "open" })(
      ({ theme, open }) => ({
        "& .MuiDrawer-paper": {
          position: "relative",
          whiteSpace: "nowrap",
          width: drawerWidth,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: "border-box",
          ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
          }),
        },
      }),
    )
  : styled(Drawer)({
      "& .MuiDrawer-paper": { width: drawerWidth },
    });
