import Result from "features/nutrition/components/Result";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "store";
import themeSlice from "store/slices/theme.slice";

const Nutrition = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(themeSlice.actions.setTitle("Nutrition"));
    return () => {
      dispatch(themeSlice.actions.removeTitle());
    };
  }, [dispatch]);
  return <Result />;
};

export default Nutrition;
