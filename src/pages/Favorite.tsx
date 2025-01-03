import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import type { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import CountryFlag from "components/weather/CountryFlag";
import { type TCountryCode, getCountryData } from "countries-list";
import { useFavorite } from "hooks/useFavorite";

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Favorite() {
  const classes = useStyles();
  const { favoriteList } = useFavorite();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={2}>
            <List component="nav" className={classes.list}>
              {favoriteList.map((location) => {
                const key =
                  typeof location === "string"
                    ? location
                    : `${location.lat}${encodeURIComponent("|")}${
                        location.lon
                      }`;
                const name =
                  typeof location === "string" ? location : location.name;
                const countryData =
                  typeof location === "string"
                    ? null
                    : getCountryData(location.country as TCountryCode);
                return (
                  <ListItem
                    key={key}
                    button
                    component="a"
                    href={`#/location/${key}`}
                  >
                    <ListItemText
                      primary={
                        <>
                          {name}
                          {countryData != null &&
                            name !== countryData.name &&
                            ` - ${countryData.name}`}
                          {typeof location !== "string" && (
                            <CountryFlag countryCode={location.country} />
                          )}
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
              {favoriteList.length === 0 && (
                <ListItem>
                  No favorite, please add location in Home page
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
