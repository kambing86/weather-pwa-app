import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import nutritionSlice from "store/slices/nutrition.slice";
import ResultContent from "./ResultContent";

const Result = () => {
  const current = useSelector((state: RootState) => state.nutrition.current);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (current == null) {
      dispatch(nutritionSlice.actions.newEntry());
    }
  }, [current, dispatch]);

  if (current == null) return null;

  return <ResultContent />;
};

export default Result;
