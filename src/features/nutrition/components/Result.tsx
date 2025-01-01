import { useTheme } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import type { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Fragment, useState } from "react";
import { supplements } from "../constants";
import questions from "../questions";
import CustomTableCell from "./CustomTableCell";
import Gender from "./Gender";

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  table: {
    userSelect: "none",
  },
}));

const Result = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [answer, setAnswer] = useState<boolean[]>(
    new Array(questions.length).fill(false),
  );

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={2} className={classes.paper}>
            <div className={classes.inputArea}>
              <TextField label="名字" variant="outlined" />
              <TextField label="年龄" variant="outlined" />
              <Gender />
            </div>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>打勾</CustomTableCell>
                    <CustomTableCell style={{ minWidth: "50rem" }} />
                    {supplements.map((s) => (
                      <CustomTableCell key={s} align="center">
                        {s}
                      </CustomTableCell>
                    ))}
                  </TableRow>
                </TableHead>
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
                  {questions.map((q, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: is ok to use index here
                    <Fragment key={index}>
                      <TableRow>
                        <CustomTableCell>
                          <Checkbox
                            checked={answer.at(index) ?? false}
                            onChange={(e) => {
                              setAnswer((old) => {
                                return old.map((a, i) => {
                                  if (i === index) {
                                    return e.target.checked;
                                  }
                                  return a;
                                });
                              });
                            }}
                          />
                        </CustomTableCell>
                        <CustomTableCell>
                          {index + 1} {q.text}
                        </CustomTableCell>
                        {supplements.map((s) => {
                          const counted = q.supplements.includes(s);
                          const isChecked = answer.at(index) ?? false;
                          return (
                            <CustomTableCell
                              key={s}
                              align="center"
                              style={{
                                background: counted
                                  ? undefined
                                  : theme.palette.action.disabledBackground,
                                color: theme.palette.primary.contrastText,
                              }}
                            >
                              {counted && isChecked ? "1" : ""}
                            </CustomTableCell>
                          );
                        })}
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
                    <CustomTableCell>总分</CustomTableCell>
                    <CustomTableCell>如果合计超过7，建议补充</CustomTableCell>
                    {supplements.map((s) => {
                      const total = questions.reduce<number>(
                        (prev, q, index) => {
                          const counted = q.supplements.includes(s);
                          const isChecked = answer.at(index) ?? false;
                          return counted && isChecked ? prev + 1 : prev;
                        },
                        0,
                      );
                      return (
                        <CustomTableCell key={s} align="center">
                          {total}
                        </CustomTableCell>
                      );
                    })}
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

export default Result;
