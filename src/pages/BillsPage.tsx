import { Container, FormControl, Grid, Input, InputLabel } from "@mui/material";
import ActionButtons from "components/bills/ActionButtons";
import ErrorContainer from "components/bills/ErrorContainer";
import MessageList from "components/bills/MessageList";
import { useRefInSync } from "hooks/helpers/useRefInSync";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import billsSlice, { BillState } from "store/slices/bills.slice";

const BillsPage = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRefInSync(input);
  const inputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }, []);
  const billState = useSelector((state: RootState) => state.bills.state);
  const billStateRef = useRefInSync(billState);
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
          case BillState.Create:
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
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  const clearInput = useCallback(() => {
    setInput("");
  }, []);
  const showInput =
    billState !== BillState.Init &&
    billState !== BillState.View &&
    billState !== BillState.Total;
  return (
    <Container maxWidth="lg" sx={{ flex: "1 0 auto", pt: 2 }}>
      <ErrorContainer error={error} clearError={clearError} />
      <Grid
        container
        spacing={3}
        sx={{ flexFlow: "column nowrap", height: "100%" }}
      >
        <MessageList />
        <Grid item xs={12} sx={{ flex: "0 0 0 !important" }}>
          <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
            <ActionButtons onClick={clearInput} />
            {showInput && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Input</InputLabel>
                <Input value={input} onChange={inputChange} />
              </FormControl>
            )}
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BillsPage;
