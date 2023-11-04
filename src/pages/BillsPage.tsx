import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Theme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useRefInSync } from "hooks/helpers/useRefInSync";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import billsSlice from "store/slices/bills.slice";

const serviceTax = [0, 5, 10];
const gst = [0, 7, 8, 9, 10, 11];

const useStyles = makeStyles<Theme>(() => ({
  response: {
    whiteSpace: "pre-line",
  },
}));

const BillsPage = () => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRefInSync(input);
  const inputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setInput(event.target.value);
  }, []);
  const billState = useSelector((state: RootState) => state.bills.state);
  const billStateRef = useRefInSync(billState);
  const response = useSelector((state: RootState) => state.bills.response);
  const dispatch = useDispatch();
  const formSubmitHandler = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      setError("");
      const inputText = inputRef.current.trim();
      if (inputText === "") return;
      const currentState = billStateRef.current;
      try {
        switch (currentState) {
          case "bill":
            dispatch(billsSlice.actions.addBill(inputText));
            break;
          case "person":
            dispatch(billsSlice.actions.addPersons(inputText));
            break;
          case "update":
            dispatch(billsSlice.actions.updatePersons(inputText));
            break;
          case "item":
            dispatch(billsSlice.actions.addItem(inputText));
            break;
          case "serviceTax":
            dispatch(billsSlice.actions.setServiceTax(inputText));
            break;
          case "GST":
            dispatch(billsSlice.actions.setGST(inputText));
            break;
        }
      } catch (err: unknown) {
        setError((err as Error).message);
      }
      setInput("");
    },
    [inputRef, billStateRef, dispatch],
  );
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {error !== "" && <Alert severity="error">{error}</Alert>}
          {response !== "" && (
            <Card variant="elevation">
              <CardContent className={classes.response}>{response}</CardContent>
            </Card>
          )}
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
            {billState !== "total" && (
              <FormControl fullWidth>
                <InputLabel>Input</InputLabel>
                <Input value={input} onChange={inputChange} />
              </FormControl>
            )}
            {billState === "update" && (
              <Button
                onClick={() => {
                  setInput("");
                  setError("");
                  dispatch(billsSlice.actions.noUpdatePerson());
                }}
                variant="contained"
              >
                No addition
              </Button>
            )}
            {billState === "item" && (
              <Button
                onClick={() => {
                  setInput("");
                  setError("");
                  dispatch(billsSlice.actions.finishItem());
                }}
                variant="contained"
              >
                That's all
              </Button>
            )}
            {billState === "serviceTax" &&
              serviceTax.map((v) => (
                <Button
                  key={v}
                  onClick={() => {
                    setInput("");
                    setError("");
                    dispatch(billsSlice.actions.setServiceTax(v.toString()));
                  }}
                  variant="contained"
                >
                  {v}%
                </Button>
              ))}
            {billState === "GST" &&
              gst.map((v) => (
                <Button
                  key={v}
                  onClick={() => {
                    setInput("");
                    setError("");
                    dispatch(billsSlice.actions.setGST(v.toString()));
                  }}
                  variant="contained"
                >
                  {v}%
                </Button>
              ))}
            {billState === "total" && (
              <>
                <Button
                  onClick={() => {
                    setError("");
                    dispatch(billsSlice.actions.newBill());
                  }}
                >
                  New Bill
                </Button>
                <Button
                  onClick={() => {
                    setError("");
                    dispatch(billsSlice.actions.amendBill());
                  }}
                >
                  Amend Bill
                </Button>
              </>
            )}
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BillsPage;
