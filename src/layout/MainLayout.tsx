import Box from "@mui/material/Box";
import type { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import RedirectHome from "components/RedirectHome";
import {
  BillsPage,
  FavoritePage,
  HomePage,
  LocationPage,
  NotFoundPage,
  NutritionPage,
} from "preload";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Copyright from "./Copyright";
import PWAPopup from "./PWAPopup";
import TopSideBar from "./TopSideBar";

const useStyles = makeStyles<Theme>((theme) => ({
  contentWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex" }} color="text.primary">
      <TopSideBar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <div className={classes.contentWrapper}>
          <div className={classes.appBarSpacer} />
          <Routes>
            <Route index element={<RedirectHome />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/location/:location" element={<LocationPage />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/nutrition/*" element={<NutritionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Box component="footer" sx={{ my: 2 }}>
          <Copyright />
        </Box>
        <PWAPopup />
      </Box>
    </Box>
  );
};

export default React.memo(MainLayout);
