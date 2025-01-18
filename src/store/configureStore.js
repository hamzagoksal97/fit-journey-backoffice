import { configureStore } from "@reduxjs/toolkit";
import tenantSlice from "./slices/tenantSlice";
import authSlice from "./slices/authSlice";

export default configureStore({
  reducer: {
    tenant: tenantSlice,
    auth: authSlice,

  }
});
