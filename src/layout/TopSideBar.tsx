import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { permanantSideBar } from "features";
import { useAppTheme } from "hooks/useAppTheme";
import React, { useCallback, useState } from "react";
import { LIGHT } from "store/slices/theme.slice";
import { EventType, useEventBus } from "utils/eventBus";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import SideBarLinkList from "./SideBarLinkList";
import TopBar from "./TopBar";

const TopSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleDrawerClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const { theme, toggleDarkMode } = useAppTheme();

  useEventBus(EventType.CLOSE_SIDE_BAR, () => {
    setIsOpen(false);
  });

  return (
    <>
      <AppBar position="absolute" open={isOpen}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              marginRight: "36px",
              ...(isOpen && { display: "none" }),
            }}
          >
            <Icon>menu</Icon>
          </IconButton>
          <TopBar />
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {theme.palette.mode === LIGHT ? (
              <Icon>light_mode</Icon>
            ) : (
              <Icon>dark_mode</Icon>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={permanantSideBar ? "permanent" : undefined}
        open={isOpen}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <Icon>chevron_left</Icon>
          </IconButton>
        </Toolbar>
        <Divider />
        <SideBarLinkList />
      </Drawer>
    </>
  );
};

export default React.memo(TopSideBar);
