import { configureStore } from "@reduxjs/toolkit";
import fightersHealthReducer from "./health";

export default configureStore({
  reducer: {
    fighters: fightersHealthReducer,
  },
});
