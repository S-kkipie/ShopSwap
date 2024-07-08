import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./slices/auth.slice.ts";

export const store = configureStore({
        reducer: {
            authReducer: authSlice.reducer,
        },
    }
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;