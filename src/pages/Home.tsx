import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useFavorite } from "hooks/useFavorite";
import { useIsOffline } from "hooks/useIsOffline";
import { useWeatherAtHomepage } from "hooks/useWeather";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Home() {
  const classes = useStyles();
  const {
    weatherData,
    isLocationFound,
    location,
    setLocation,
  } = useWeatherAtHomepage();
  const isOffline = useIsOffline();
  const [search, setSearch] = useState("");
  const inputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const searchRef = useRef(search);
  searchRef.current = search;
  const clickSearch = useCallback(() => {
    setLocation(searchRef.current);
  }, [setLocation]);
  const { favoriteList, addFavorite } = useFavorite();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div>
              <input onChange={inputChange} value={search} />
              <button onClick={clickSearch}>Search</button>
            </div>
            <div>is offline: {isOffline.toString()}</div>
            {!isLocationFound && <div>Location not found</div>}
            {isLocationFound && (
              <>
                <div>
                  {location}
                  {location !== "" &&
                    favoriteList.find((o) => o === location) === undefined && (
                      <button onClick={() => addFavorite(location)}>
                        Favorite
                      </button>
                    )}
                </div>
                <div>
                  {weatherData.loading && "Loading..."}
                  {weatherData.error && weatherData.error.toString()}
                  {weatherData.data &&
                    weatherData.data.current.weather[0].description}
                  {weatherData.data && (
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherData.data.current.weather[0].icon}.png`}
                      alt={weatherData.data.current.weather[0].description}
                    />
                  )}
                </div>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
