import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LightThemeIcon from "@material-ui/icons/Brightness4";
import DarkThemeIcon from "@material-ui/icons/Brightness7";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useAppTheme } from "hooks/useAppTheme";
import React, { useCallback, useState } from "react";
import SideBarLink from "./SideBarLink";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
}));

const TopSideBar = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleDrawerClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const { theme, toggleDarkMode } = useAppTheme();
  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, isOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              isOpen && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {`Weather App`}
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {theme.palette.type === "light" ? (
              <LightThemeIcon />
            ) : (
              <DarkThemeIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
        }}
        open={isOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <SideBarLink path="/" text="Home" icon={<HomeIcon />} />
          <SideBarLink
            path="/favorite"
            text="Favorite"
            icon={<FavoriteIcon />}
          />
        </List>
      </Drawer>
    </>
  );
};

export default React.memo(TopSideBar);
