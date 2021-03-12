import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DailyData } from "types/data";

const useStyles = makeStyles((theme) => ({
  iconBackground: {
    background:
      theme.palette.type === "dark"
        ? "radial-gradient(circle at center, #606060 0, #424242 75%)"
        : "radial-gradient(circle at center, #CCCCCC 0, #fff 75%)",
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
  data: DailyData[];
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
          {data.map((dailyData) => {
            const date = new Date(dailyData.dt * 1000);
            const weather = dailyData.weather[0];
            return (
              <TableRow key={dailyData.dt}>
                <TableCell align="center">
                  {new Intl.DateTimeFormat().format(date)}
                </TableCell>
                <TableCell align="center" className={classes.weatherText}>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                    alt={weather.description}
                    className={classes.iconBackground}
                  />
                  {weather.description}
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

export default React.memo(TableDailyData);
