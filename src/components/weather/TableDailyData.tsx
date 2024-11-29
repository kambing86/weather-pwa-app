import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { memo } from "react";
import { DARK } from "store/slices/theme.slice";
import type { ForecastData } from "types/data";
import { DARK_RADIAL_GRADIENT, LIGHT_RADIAL_GRADIENT } from "./constants";

const useStyles = makeStyles<Theme>((theme) => ({
  iconBackground: {
    background:
      theme.palette.mode === DARK
        ? DARK_RADIAL_GRADIENT
        : LIGHT_RADIAL_GRADIENT,
  },
  table: {
    minWidth: 200,
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
    justifyContent: "center",
  },
}));

interface Props {
  data: ForecastData;
}

const TableDailyData = ({ data }: Props) => {
  const classes = useStyles();
  return (
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
          {data.list.map((dailyData) => {
            const date = new Date(dailyData.dt * 1000);
            const weather = dailyData.weather[0];
            return (
              <TableRow key={dailyData.dt}>
                <TableCell align="center">
                  {new Intl.DateTimeFormat().format(date)}
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.weatherText}>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                      alt={weather.description}
                      className={classes.iconBackground}
                    />
                    {weather.description}
                  </Typography>
                </TableCell>
                <TableCell align="center">{dailyData.temp.min}</TableCell>
                <TableCell align="center">{dailyData.temp.max}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(TableDailyData);
