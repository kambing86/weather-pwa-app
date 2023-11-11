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
  Snackbar,
  Stack,
  Theme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useRefInSync } from "hooks/helpers/useRefInSync";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import billsSlice, { BillState } from "store/slices/bills.slice";

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
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRefInSync(input);
  const inputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }, []);
  const billState = useSelector((state: RootState) => state.bills.state);
  const billStateRef = useRefInSync(billState);
  const messages = useSelector((state: RootState) => state.bills.messages);
  const dispatch = useDispatch();
  const formSubmitHandler = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const inputText = inputRef.current.trim();
      if (inputText === "") return;
      dispatch(billsSlice.actions.addUserMessage(inputText));
      const currentState = billStateRef.current;
      try {
        switch (currentState) {
          case BillState.Bill:
            dispatch(billsSlice.actions.addBill(inputText));
            break;
          case BillState.Person:
            dispatch(billsSlice.actions.addPersons(inputText));
            break;
          case BillState.Update:
            dispatch(billsSlice.actions.updatePersons(inputText));
            break;
          case BillState.Item:
            dispatch(billsSlice.actions.addItem(inputText));
            break;
          case BillState.ServiceTax:
            dispatch(billsSlice.actions.setServiceTax(inputText));
            break;
          case BillState.GST:
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
  const scrollableGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = scrollableGridRef.current;
    if (grid) {
      const maxHeight = grid.scrollHeight;
      grid.scrollTo({
        top: maxHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);
  return (
    <Container maxWidth="lg" sx={{ flex: "1 0 auto", pt: 2 }}>
      <Grid
        container
        spacing={3}
        sx={{ flexFlow: "column nowrap", height: "100%" }}
      >
        <Grid
          ref={scrollableGridRef}
          item
          xs={12}
          sx={{ flex: "1 0 0 !important", overflow: "auto" }}
        >
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={error != null}
            autoHideDuration={5000}
            onClose={() => setError(null)}
          >
            <Alert severity="error">{error}</Alert>
          </Snackbar>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            {messages.map(({ msg, isUser }, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  bgcolor: isUser ? "primary.main" : null,
                  color: isUser ? "primary.contrastText" : null,
                }}
              >
                <CardContent className={classes.response}>{msg}</CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ flex: "0 0 0 !important" }}>
          <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
            {billState !== BillState.Total && (
              <FormControl fullWidth>
                <InputLabel>Input</InputLabel>
                <Input value={input} onChange={inputChange} />
              </FormControl>
            )}
            {billState === BillState.Update && (
              <Button
                onClick={() => {
                  setInput("");
                  dispatch(billsSlice.actions.noUpdatePerson());
                }}
                variant="contained"
              >
                No addition
              </Button>
            )}
            {billState === BillState.Item && (
              <Button
                onClick={() => {
                  setInput("");
                  dispatch(billsSlice.actions.finishItem());
                }}
                variant="contained"
              >
                That's all
              </Button>
            )}
            {billState === BillState.ServiceTax &&
              serviceTax.map((v) => (
                <Button
                  key={v}
                  onClick={() => {
                    setInput("");
                    dispatch(billsSlice.actions.setServiceTax(v.toString()));
                  }}
                  variant="contained"
                >
                  {v}%
                </Button>
              ))}
            {billState === BillState.GST &&
              gst.map((v) => (
                <Button
                  key={v}
                  onClick={() => {
                    setInput("");
                    dispatch(billsSlice.actions.setGST(v.toString()));
                  }}
                  variant="contained"
                >
                  {v}%
                </Button>
              ))}
            {billState === BillState.Total && (
              <>
                <Button
                  onClick={() => {
                    dispatch(billsSlice.actions.newBill());
                  }}
                  variant="contained"
                >
                  New Bill
                </Button>
                <Button
                  onClick={() => {
                    dispatch(billsSlice.actions.amendBill());
                  }}
                  variant="contained"
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
