import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const Gender = () => {
  return (
    <FormControl>
      <FormLabel id="gender">性别</FormLabel>
      <RadioGroup aria-labelledby="gender" name="radio-buttons-group" row>
        <FormControlLabel value="male" control={<Radio />} label="男" />
        <FormControlLabel value="female" control={<Radio />} label="女" />
      </RadioGroup>
    </FormControl>
  );
};

export default Gender;
