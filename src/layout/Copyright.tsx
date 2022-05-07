import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React, { ComponentProps } from "react";

const Copyright = (props: ComponentProps<typeof Typography>) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="text.secondary" href="https://github.com/kambing86">
        kambing86
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default React.memo(Copyright);
