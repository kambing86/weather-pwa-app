import { useTheme } from "@mui/material";
import TableCell, { type TableCellProps } from "@mui/material/TableCell";

const CustomTableCell = (props: TableCellProps) => {
  const theme = useTheme();
  return (
    <TableCell
      sx={{ border: `1px solid ${theme.palette.text.disabled}` }}
      {...props}
    />
  );
};

export default CustomTableCell;
