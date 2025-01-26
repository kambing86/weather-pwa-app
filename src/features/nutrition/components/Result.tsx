import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "store";
import nutritionSlice from "store/slices/nutrition.slice";
import ResultContent from "./ResultContent";

const Result = () => {
  const ready = useSelector((state: RootState) => state.nutrition.ready);
  const current = useSelector((state: RootState) => state.nutrition.current);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const indexParam = Number.parseInt(params["*"] ?? "");

  useEffect(() => {
    if (ready && current == null) {
      dispatch(nutritionSlice.actions.loadHistory(indexParam));
    }
  }, [ready, current, indexParam, dispatch]);

  if (current == null) return null;

  return <ResultContent />;
};

export default Result;
