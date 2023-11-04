import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useRefInSync } from "hooks/helpers/useRefInSync";
import { useFavorite } from "hooks/useFavorite";
import { useWeather } from "hooks/useWeather";
import { memo, useCallback } from "react";
import { DARK } from "store/slices/theme.slice";
import TableDailyData from "./TableDailyData";
import { DARK_RADIAL_GRADIENT, LIGHT_RADIAL_GRADIENT } from "./constants";

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: theme.palette.mode === DARK ? "#333" : "#f5f5f5",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2),
    },
  },
  iconBackground: {
    background:
      theme.palette.mode === DARK
        ? DARK_RADIAL_GRADIENT
        : LIGHT_RADIAL_GRADIENT,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tableTitle: {
    marginBottom: theme.spacing(1),
  },
  weatherText: {
    display: "flex",
    alignItems: "center",
  },
}));

const WeatherResult = () => {
  const classes = useStyles();
  const { weatherData, isInit, isLoading, isLocationFound, location } =
    useWeather();
  const { isFavorite, clickFavorite } = useFavorite();
  const currentData = weatherData.data?.current;
  const locationRef = useRefInSync(location);
  const favoriteHandler = useCallback(() => {
    clickFavorite(locationRef.current);
  }, [locationRef, clickFavorite]);
  if (!isInit) {
    return null;
  }
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        {!isLocationFound && <Typography>Location not found</Typography>}
        {isLocationFound && (
          <>
            <CardActions>
              <Typography>{location}</Typography>
              <Button size="small" onClick={favoriteHandler}>
                {isFavorite(location) ? (
                  <Icon sx={{ color: "#f50057" }}>favorite</Icon>
                ) : (
                  <Icon sx={{ color: "#f50057" }}>favorite_border</Icon>
                )}
              </Button>
            </CardActions>
            {weatherData.error && (
              <Typography>{JSON.stringify(weatherData.error)}</Typography>
            )}
            {currentData && (
              <>
                <Typography className={classes.weatherText}>
                  <img
                    src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}.png`}
                    alt={currentData.weather[0].description}
                    className={classes.iconBackground}
                  />
                  {currentData.weather[0].description}
                </Typography>
                <Typography>Temperature: {currentData.temp} °C</Typography>
              </>
            )}
            <Divider className={classes.divider} />
            {weatherData.data && (
              <>
                <Typography className={classes.tableTitle}>
                  7 days forecast
                </Typography>
                <TableDailyData data={weatherData.data.daily} />
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(WeatherResult);
