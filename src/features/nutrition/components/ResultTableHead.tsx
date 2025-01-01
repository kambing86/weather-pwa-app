import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { memo } from "react";
import { supplements } from "../constants";
import CustomTableCell from "./CustomTableCell";

const ResultTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <CustomTableCell align="center">打勾</CustomTableCell>
        <CustomTableCell style={{ minWidth: "20rem" }} />
        {supplements.map((s) => (
          <CustomTableCell key={s} style={{ minWidth: "6rem" }} align="center">
            {s}
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default memo(ResultTableHead);
