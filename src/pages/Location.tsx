import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import WeatherResult from "components/home/WeatherResult";
import { useWeather } from "hooks/useWeather";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
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
    setLocation(location);
    setInit(true);
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
