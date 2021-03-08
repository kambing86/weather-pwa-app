import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import WeatherResult from "components/home/WeatherResult";
import { useRefInSync } from "hooks/helpers/useRefInSync";
import { useWeatherAtHomepage } from "hooks/useWeather";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(4),
  },
}));

export default function Home() {
  const classes = useStyles();
  const { isGettingLocation, setLocation } = useWeatherAtHomepage();
  const [search, setSearch] = useState("");
  const inputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const searchRef = useRefInSync(search);
  const clickSearch = useCallback(() => {
    const searchString = searchRef.current;
    if (searchString !== "") setLocation(searchString);
  }, [searchRef, setLocation]);
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
          {isGettingLocation && <Typography>Getting Location...</Typography>}
          {!isGettingLocation && <WeatherResult />}
        </Grid>
      </Grid>
    </Container>
  );
}
