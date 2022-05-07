import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import WeatherResult from "components/WeatherResult";
import { useRefInSync } from "hooks/helpers/useRefInSync";
import { useWeatherAtHomepage } from "hooks/useWeather";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const useStyles = makeStyles<Theme>((theme) => ({
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
                      <Icon>search</Icon>
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
