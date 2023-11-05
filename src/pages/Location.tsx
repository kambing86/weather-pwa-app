import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import WeatherResult from "components/WeatherResult";
import { useWeather } from "hooks/useWeather";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGeolocationFromString } from "utils/location";

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Location() {
  const classes = useStyles();
  const [init, setInit] = useState(false);
  const { setLocation, setPosition } = useWeather();
  const { location } = useParams<{ location: string }>();
  useEffect(() => {
    if (location != null) {
      const geolocation = getGeolocationFromString(location);
      if (geolocation != null) {
        const [lat, lon] = geolocation;
        setPosition(lat, lon);
      } else {
        setLocation(location);
      }
      setInit(true);
    }
  }, [location, setLocation, setPosition]);
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
