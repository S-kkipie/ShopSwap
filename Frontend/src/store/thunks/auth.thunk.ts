import {createAsyncThunk} from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_BASE_URL;
export const loginThunk = createAsyncThunk(
    "auth/loginThunk",
    async (
        {username, password}: { username: string, password: string }, {rejectWithValue}) => {
        try {
            const response = await fetch(apiUrl+ "/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });
            if(!response.ok){
                console.log(response);
                return rejectWithValue("Error al iniciar sesión");
            }
            const data = await response.json();
            return {
                user: {
                    username: data.username,
                    email: data.email,
                    address: data.address,
                    role: data.role,
                    id: data.id,
                    status: data.status,
                    password: "",
                },
                accessToken: data.token,
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const registerThunk = createAsyncThunk(
    "auth/registerThunk",
    async (
        {username, password, email, address}: {
            username: string,
            password: string,
            email: string,
            address: string
        }, {rejectWithValue}) => {
        try {
            const authGenerate = await fetch(apiUrl+ "/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password, email, address}),
            });
            const response = await authGenerate.json();
            return {
                user: {
                    username: response.username,
                    email: response.email,
                    address: response.address,
                    role: response.role,
                    id: response.id,
                    status: response.status,
                    password: "",
                },
                accessToken: response.token,
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);