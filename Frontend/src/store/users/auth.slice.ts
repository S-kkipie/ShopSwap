import { createSlice } from "@reduxjs/toolkit";
import User from "@/Interfaces/User.ts";
import { loginThunkSpring, registerThunkSpring, registerWithGoogleThunk } from "@/store/thunks/auth.thunk.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { getCookie } from "@/Utils/getCookie.util.ts";
import { expToken, tokenDecode } from "@/Utils/decodeToken.util.ts";

interface AuthState {
    isAuth: boolean;
    success: boolean;
    loading: boolean;
    error: RejectedActionFromAsyncThunk<never> | null;
    userData: User | null;
    accessToken: string | null;
    isExpired: boolean | null;
}
console.log(getCookie("accessToken") !== undefined ? getCookie("accessToken")! : null);
const initialState: AuthState = {
    isAuth: getCookie("accessToken") !== undefined ? !expToken(getCookie("accessToken")!) : false,
    success: getCookie("accessToken") !== undefined,
    loading: false,
    error: null,
    userData:
        getCookie("accessToken") !== undefined
            ? {
                  username: tokenDecode(getCookie("accessToken")!).username,
                  email: tokenDecode(getCookie("accessToken")!).email,
                  id: tokenDecode(getCookie("accessToken")!).id,
                  role: tokenDecode(getCookie("accessToken")!).role,
                  address: tokenDecode(getCookie("accessToken")!).address,
                  status: tokenDecode(getCookie("accessToken")!).status,
                  picture: tokenDecode(getCookie("accessToken")!).picture,
                  provider: tokenDecode(getCookie("accessToken")!).provider,
                  password: "",
              }
            : null,
    accessToken: getCookie("accessToken") !== undefined ? getCookie("accessToken")! : null,
    isExpired: getCookie("accessToken") !== undefined ? expToken(getCookie("accessToken")!) : null,
};
console.log(initialState);
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginThunkSpring.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginThunkSpring.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.userData = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuth = true;
            state.isExpired = false;
        });
        builder.addCase(loginThunkSpring.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            alert("Error al iniciar sesión: " + action.payload);
        });
        builder.addCase(registerThunkSpring.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerThunkSpring.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.userData = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuth = true;
            state.isExpired = false;
        });
        builder.addCase(registerThunkSpring.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log("Error al registrar usuario: " + action.payload);
        });
        builder.addCase(registerWithGoogleThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerWithGoogleThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.userData = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuth = true;
            state.isExpired = false;
        });
        builder.addCase(registerWithGoogleThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log("Error al registrar con Google: " + action.payload);
        });
    },
});
