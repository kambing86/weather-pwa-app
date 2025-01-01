import EntryList from "features/nutrition/components/EntryList";
import Result from "features/nutrition/components/Result";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
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
  return (
    <Routes>
      <Route path="result/*" element={<Result />} />
      <Route index element={<EntryList />} />
    </Routes>
  );
};

export default Nutrition;
