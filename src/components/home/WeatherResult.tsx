import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useRefInSync } from "hooks/helpers/useRefInSync";
import { useFavorite } from "hooks/useFavorite";
import { useWeather } from "hooks/useWeather";
import React, { useCallback } from "react";
import TableDailyData from "./TableDailyData";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: theme.palette.type === "dark" ? "#333" : "#f5f5f5",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2),
    },
  },
  iconBackground: {
    background:
      theme.palette.type === "dark"
        ? "radial-gradient(circle at center, #606060 0, #333 75%)"
        : "radial-gradient(circle at center, #CCCCCC 0, #f5f5f5 75%)",
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
  const {
    weatherData,
    isInit,
    isLoading,
    isLocationFound,
    location,
  } = useWeather();
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
                  <FavoriteIcon color="secondary" />
                ) : (
                  <FavoriteBorderIcon color="secondary" />
                )}
              </Button>
            </CardActions>
            {weatherData.error && (
              <Typography>{weatherData.error.toString()}</Typography>
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

export default React.memo(WeatherResult);
