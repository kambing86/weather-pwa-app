import Typography from "@mui/material/Typography";
import React from "react";

const TopBar = () => {
  return (
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      sx={{ flexGrow: 1 }}
    >
      Weather App
    </Typography>
  );
};

export default React.memo(TopBar);
