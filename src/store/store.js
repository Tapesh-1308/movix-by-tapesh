import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";

const store  = configureStore({
    reducer: {
        home: homeSlice,
    }
});

export default store;