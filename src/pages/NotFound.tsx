import { Grid, Typography } from "@material-ui/core";

const NotFound = () => {
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      style={{ height: "100vh" }}
    >
      <Typography variant="h3">Page Not Found</Typography>
    </Grid>
  );
};

export default NotFound;
