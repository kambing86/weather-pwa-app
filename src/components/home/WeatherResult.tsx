import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useRefInSync } from "hooks/helpers/useRefInSync";
import { useFavorite } from "hooks/useFavorite";
import { useWeather } from "hooks/useWeather";
import React, { useCallback } from "react";

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
  table: {
    marginTop: theme.spacing(1),
    minWidth: 200,
    "& $iconBackground": {
      background:
        theme.palette.type === "dark"
          ? "radial-gradient(circle at center, #606060 0, #424242 75%)"
          : "radial-gradient(circle at center, #CCCCCC 0, #fff 75%)",
    },
    "& $weatherText": {
      justifyContent: "center",
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(0.5),
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2),
      },
    },
  },
  weatherText: {
    display: "flex",
    alignItems: "center",
  },
}));

const WeatherResult = () => {
  const classes = useStyles();
  const { weatherData, isLoading, isLocationFound, location } = useWeather();
  const { isFavorite, clickFavorite } = useFavorite();
  const currentData = weatherData.data?.current;
  const locationRef = useRefInSync(location);
  const favoriteHandler = useCallback(() => {
    clickFavorite(locationRef.current);
  }, [locationRef, clickFavorite]);
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
                    src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}.png`}
                    alt={currentData.weather[0].description}
                    className={classes.iconBackground}
                  />
                  {currentData.weather[0].description}
                </Typography>
                <Typography>Temperature: {currentData.temp} °C</Typography>
              </>
            )}
            <Divider className={classes.divider} />
            <Typography>7 days forecast</Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Weather</TableCell>
                    <TableCell align="center">Min temp (°C)</TableCell>
                    <TableCell align="center">Max temp (°C)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weatherData.data?.daily.map((dailyData) => {
                    const date = new Date(dailyData.dt * 1000);
                    const weather = dailyData.weather[0];
                    return (
                      <TableRow key={dailyData.dt}>
                        <TableCell align="center">
                          {new Intl.DateTimeFormat().format(date)}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.weatherText}
                        >
                          <img
                            src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                            alt={weather.description}
                            className={classes.iconBackground}
                          />
                          {weather.description}
                        </TableCell>
                        <TableCell align="center">
                          {dailyData.temp.min}
                        </TableCell>
                        <TableCell align="center">
                          {dailyData.temp.max}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(WeatherResult);
