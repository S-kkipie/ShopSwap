import { createSlice } from "@reduxjs/toolkit";
import User from "@/Interfaces/User.ts";
import { loginThunkSpring, registerThunkSpring, registerWithGoogleThunk, verifyGoogleThunk } from "@/store/thunks/auth.thunk.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { getCookie } from "@/Utils/getCookie.util.ts";
import { expToken } from "@/Utils/decodeToken.util.ts";
import { updateDataThunk } from "../thunks/updateData.thunk";
import { getUserDataThunk } from "../thunks/getUserData.thunk";
const apiUrl = import.meta.env.VITE_BASE_URL;
interface AuthState {
    isAuth: boolean;
    success: boolean;
    loading: boolean;
    error: RejectedActionFromAsyncThunk<never> | null;
    userData: User | null;
    accessToken: string | null;
    isExpired: boolean | null;
}
let initialState: AuthState = {
    isAuth: getCookie("accessToken") !== undefined ? !expToken(getCookie("accessToken")!) : false,
    success: getCookie("accessToken") !== undefined,
    loading: false,
    error: null,
    userData: null,
    accessToken: getCookie("accessToken") !== undefined ? getCookie("accessToken")! : null,
    isExpired: getCookie("accessToken") !== undefined ? expToken(getCookie("accessToken")!) : null,
};
if (getCookie("accessToken") !== undefined) {
    fetch(apiUrl + "/u/models/user/self", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessToken")!}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response.text());
            }
            return response.json();
        })
        .then((data) => {
            initialState = {
                ...initialState,
                userData: {
                    username: data.username,
                    email: data.email,
                    id: data.id,
                    role: data.role,
                    address: data.address,
                    status: data.status,
                    picture: data.picture,
                    provider: data.provider,
                    city: data.city,
                    country: data.country,
                    money: data.money,
                    password: "",
                },
            };
        });
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserDataThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserDataThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(getUserDataThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
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
        builder.addCase(updateDataThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateDataThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            if (state.userData) {
                state.userData.username = action.payload.user.username;
                state.userData.email = action.payload.user.email;
                state.userData.address = action.payload.user.address;
                state.userData.picture = action.payload.user.picture;
            }
            state.error = null;
        });
        builder.addCase(updateDataThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });
        builder.addCase(verifyGoogleThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyGoogleThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.userData = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuth = true;
            state.isExpired = false;
        });
        builder.addCase(verifyGoogleThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log("Error al verificar con Google: " + action.payload);
        });
    },
});
