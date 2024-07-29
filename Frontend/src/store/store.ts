import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice.ts";
import cartReducer from "./slices/cart.slice.ts";
import { loadState, saveState } from "./localStorage.ts";
const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        authReducer: authSlice.reducer,
        cart: cartReducer,
    },
    preloadedState,
} as any);
store.subscribe(() => {
    saveState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
