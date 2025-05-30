// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import billingReducer from "../redux/slices/BillingSlice";

export const store = configureStore({
  reducer: {
    billing: billingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
