import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store";

const TopBar = () => {
  const title = useSelector((state: RootState) => state.theme.title.at(-1));
  return (
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      sx={{ flexGrow: 1, userSelect: "none" }}
    >
      {title ?? "Weather App"}
    </Typography>
  );
};

export default React.memo(TopBar);
