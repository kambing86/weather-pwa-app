import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import WeatherResult from "components/WeatherResult";
import { useWeather } from "hooks/useWeather";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Location() {
  const classes = useStyles();
  const [init, setInit] = useState(false);
  const { setLocation } = useWeather();
  const { location } = useParams<{ location: string }>();
  useEffect(() => {
    if (location != null) {
      setLocation(location);
      setInit(true);
    }
  }, [setLocation, location]);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {init && <WeatherResult />}
        </Grid>
      </Grid>
    </Container>
  );
}
