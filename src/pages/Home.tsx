import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useRefInSync } from "hooks/helpers/useRefInSync";
import { useFavorite } from "hooks/useFavorite";
import { useWeatherAtHomepage } from "hooks/useWeather";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

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
  input: {
    marginBottom: theme.spacing(4),
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
  const [search, setSearch] = useState("");
  const inputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const searchRef = useRefInSync(search);
  const clickSearch = useCallback(() => {
    const searchString = searchRef.current;
    if (searchString !== "") setLocation(searchString);
  }, [searchRef, setLocation]);
  const { favoriteList, addFavorite } = useFavorite();
  const formSubmitHandler = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      clickSearch();
    },
    [clickSearch],
  );
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
            <FormControl className={classes.input}>
              <InputLabel>Location</InputLabel>
              <Input
                value={search}
                onChange={inputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="submit" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
          <Paper className={classes.paper}>
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
