import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import nutritionSlice from "store/slices/nutrition.slice";

const Gender = () => {
  const gender = useSelector(
    (state: RootState) => state.nutrition.current?.gender ?? "",
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <FormControl>
      <FormLabel id="gender">性别</FormLabel>
      <RadioGroup
        aria-labelledby="gender"
        name="radio-buttons-group"
        row
        value={gender}
      >
        <FormControlLabel
          value="male"
          control={
            <Radio
              onChange={(e) => {
                dispatch(nutritionSlice.actions.changeGender(e.target.value));
              }}
            />
          }
          label="男"
        />
        <FormControlLabel
          value="female"
          control={
            <Radio
              onChange={(e) => {
                dispatch(nutritionSlice.actions.changeGender(e.target.value));
              }}
            />
          }
          label="女"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default memo(Gender);
