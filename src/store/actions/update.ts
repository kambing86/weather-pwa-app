import { bindActionCreators } from "@reduxjs/toolkit";
import store from "store";
import { updateSlice } from "store/slices/update";

export const updateActions = bindActionCreators(
  updateSlice.actions,
  store.dispatch,
);
