import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { useFavorite } from "hooks/useFavorite";
import React from "react";

const useStyles = makeStyles((theme) => ({
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
          <List component="nav" className={classes.list}>
            {favoriteList.map((location) => (
              <ListItem
                key={location}
                button
                component="a"
                href={`#/location/${location}`}
              >
                <ListItemText primary={location} />
              </ListItem>
            ))}
            {favoriteList.length === 0 && (
              <ListItem>No favorite, please add location in Home page</ListItem>
            )}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
