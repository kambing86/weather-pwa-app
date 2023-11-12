import { Button } from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import billsSlice, { BillState } from "store/slices/bills.slice";

const serviceTax = [0, 5, 10];
const gst = [0, 7, 8, 9, 10, 11];

const NO_ADDITION = "No addition";
const THATS_ALL = "That's all";
const NEW_BILL = "New Bill";
const AMEND_BILL = "Amend Bill";

type Props = {
  onClick?: () => void;
};

const ActionButtons = ({ onClick }: Props) => {
  const billState = useSelector((state: RootState) => state.bills.state);
  const dispatch = useDispatch();
  return (
    <>
      {billState === BillState.Update && (
        <Button
          onClick={() => {
            onClick?.();
            dispatch(billsSlice.actions.addUserMessage(NO_ADDITION));
            dispatch(billsSlice.actions.noUpdatePerson());
          }}
          variant="contained"
        >
          {NO_ADDITION}
        </Button>
      )}
      {billState === BillState.Item && (
        <Button
          onClick={() => {
            onClick?.();
            dispatch(billsSlice.actions.addUserMessage(THATS_ALL));
            dispatch(billsSlice.actions.finishItem());
          }}
          variant="contained"
        >
          {THATS_ALL}
        </Button>
      )}
      {billState === BillState.ServiceTax &&
        serviceTax.map((v) => (
          <Button
            key={v}
            onClick={() => {
              onClick?.();
              dispatch(billsSlice.actions.addUserMessage(`${v}%`));
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
              onClick?.();
              dispatch(billsSlice.actions.addUserMessage(`${v}%`));
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
              dispatch(billsSlice.actions.addUserMessage(NEW_BILL));
              dispatch(billsSlice.actions.newBill());
            }}
            variant="contained"
          >
            {NEW_BILL}
          </Button>
          <Button
            onClick={() => {
              dispatch(billsSlice.actions.addUserMessage(AMEND_BILL));
              dispatch(billsSlice.actions.amendBill());
            }}
            variant="contained"
          >
            {AMEND_BILL}
          </Button>
        </>
      )}
    </>
  );
};

export default memo(ActionButtons);
