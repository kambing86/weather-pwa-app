import { useTheme } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import nutritionSlice from "store/slices/nutrition.slice";
import { supplements } from "../constants";
import questions from "../questions";
import CustomTableCell from "./CustomTableCell";

interface Props {
  index: number;
}

const Question = ({ index }: Props) => {
  const theme = useTheme();
  const answer = useSelector((state: RootState) =>
    state.nutrition.current?.answers.at(index),
  );
  const dispatch = useDispatch<AppDispatch>();

  const q = questions.at(index);
  if (q == null) return null;
  return (
    <>
      <CustomTableCell>
        <Checkbox
          checked={answer ?? false}
          onChange={(e) => {
            dispatch(
              nutritionSlice.actions.setAnswer({
                index,
                value: e.target.checked,
              }),
            );
          }}
        />
      </CustomTableCell>
      <CustomTableCell>
        {index + 1} {q.text}
      </CustomTableCell>
      {supplements.map((s) => {
        const counted = q.supplements.includes(s);
        const isChecked = answer ?? false;
        return (
          <CustomTableCell
            key={s}
            align="center"
            style={{
              background: counted
                ? undefined
                : theme.palette.action.disabledBackground,
            }}
          >
            {counted && isChecked ? "1" : ""}
          </CustomTableCell>
        );
      })}
    </>
  );
};

export default memo(Question);
