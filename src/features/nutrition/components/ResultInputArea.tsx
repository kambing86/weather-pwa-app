import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import type { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "store";
import nutritionSlice from "store/slices/nutrition.slice";
import Gender from "./Gender";

const useStyles = makeStyles<Theme>((theme) => ({
  inputArea: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

const ResultInputArea = () => {
  const classes = useStyles();
  const name = useSelector(
    (state: RootState) => state.nutrition.current?.name ?? "",
  );
  const age = useSelector(
    (state: RootState) => state.nutrition.current?.age ?? "",
  );
  const dispatch = useDispatch<AppDispatch>();

  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className={classes.inputArea}>
      <TextField
        label="名字"
        variant="outlined"
        value={name}
        required
        error={error}
        onChange={(e) => {
          if (error) setError(false);
          dispatch(nutritionSlice.actions.changeName(e.target.value));
        }}
        helperText={error ? "请输入名字" : undefined}
      />
      <TextField
        label="年龄"
        variant="outlined"
        value={age}
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(e) => {
          dispatch(nutritionSlice.actions.changeAge(e.target.value));
        }}
      />
      <Gender />
      <Button
        variant="contained"
        onClick={() => {
          if (name === "") {
            setError(true);
            return;
          }
          navigate("/nutrition");
          const indexParam = Number.parseInt(params["*"] ?? "");
          dispatch(nutritionSlice.actions.saveToHistory(indexParam));
        }}
      >
        保存
      </Button>
    </div>
  );
};

export default memo(ResultInputArea);
