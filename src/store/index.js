import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./jobSlice";
import requestsSlice from "./requestsSlice";

const store = configureStore({
  reducer: {
    job: jobSlice.reducer,
    requests:requestsSlice.reducer
  },
});

export default store;
