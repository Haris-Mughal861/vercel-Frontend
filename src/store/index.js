import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./userCart-slice";

const Store = configureStore({
    reducer: {auth: authSlice.reducer,cart:cartSlice.reducer},


});

export default Store;