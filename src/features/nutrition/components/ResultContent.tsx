import { useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import type { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Fragment, memo } from "react";
import { supplements } from "../constants";
import questions from "../questions";
import CustomTableCell from "./CustomTableCell";
import Question from "./Question";
import ResultInputArea from "./ResultInputArea";
import ResultTableHead from "./ResultTableHead";
import Total from "./Total";

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    flex: 1,
  },
  gridContainer: {
    height: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  tableContainer: {
    flex: "1 1 0",
    minHeight: 200,
  },
  table: {
    userSelect: "none",
  },
}));

const ResultContent = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12}>
          <Paper elevation={2} className={classes.paper}>
            <ResultInputArea />
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              <Table className={classes.table}>
                <ResultTableHead />
                <TableBody>
                  <TableRow>
                    <CustomTableCell
                      colSpan={2 + supplements.length}
                      style={{
                        background: theme.palette.text.secondary,
                        color: theme.palette.primary.contrastText,
                      }}
                    >
                      身体状况评表
                    </CustomTableCell>
                  </TableRow>
                  {questions.map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: is ok to use index here
                    <Fragment key={index}>
                      <TableRow>
                        <Question index={index} />
                      </TableRow>
                      {index === 36 && (
                        <TableRow>
                          <CustomTableCell
                            colSpan={2 + supplements.length}
                            style={{
                              background: theme.palette.text.secondary,
                              color: theme.palette.primary.contrastText,
                            }}
                          >
                            生活习惯
                          </CustomTableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))}
                  <TableRow>
                    <Total />
                  </TableRow>
                  <TableRow>
                    <CustomTableCell />
                    <CustomTableCell />
                    {supplements.map((s) => (
                      <CustomTableCell key={s} align="center">
                        {s}
                      </CustomTableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(ResultContent);
