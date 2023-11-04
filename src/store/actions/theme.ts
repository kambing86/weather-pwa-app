import { bindActionCreators } from "@reduxjs/toolkit";
import store from "store";
import themeSlice from "store/slices/theme.slice";

export const themeActions = bindActionCreators(
  themeSlice.actions,
  store.dispatch,
);
