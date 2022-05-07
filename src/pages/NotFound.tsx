import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const NotFound = () => {
  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <Typography variant="h3">Page Not Found</Typography>
    </Grid>
  );
};

export default NotFound;
