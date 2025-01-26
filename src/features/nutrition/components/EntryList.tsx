import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "store";
import nutritionSlice from "store/slices/nutrition.slice";

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const EntryList = () => {
  const classes = useStyles();
  const history = useSelector((state: RootState) => state.nutrition.history);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            href="#/nutrition/result"
          >
            创建新评估
          </Button>
          {history.length > 0 && (
            <List component="nav" className={classes.list}>
              {history.map((h, index) => (
                <ListItem
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        if (window.confirm(`你确定删除${h.name}的记录吗？`)) {
                          dispatch(nutritionSlice.actions.removeHistory(index));
                        }
                      }}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  }
                >
                  <ListItemButton
                    onClick={() => {
                      dispatch(nutritionSlice.actions.loadHistory(index));
                      navigate(`/nutrition/result/${index}`);
                    }}
                  >
                    <ListItemText
                      primary={h.name}
                      secondary={moment(h.date).format("YYYY-MM-DD HH:mm:ss")}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EntryList;
