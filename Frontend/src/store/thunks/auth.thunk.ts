import {createAsyncThunk} from "@reduxjs/toolkit";
import {tokenDecode} from "@/Utils/decodeToken.util.ts";

const apiUrl = import.meta.env.VITE_BASE_URL;
export const loginThunk = createAsyncThunk(
    "auth/loginThunk",
    async (
        {username, password}: { username: string, password: string }, {rejectWithValue}) => {
        const response = await fetch(apiUrl + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        });
        if (!response.ok) {
            console.log(response);
            return rejectWithValue("Error al iniciar sesión");
        } else {
            const data = await response.json();
            const tokenDecoded = tokenDecode(data.token);
            return {
                user: {
                    username: tokenDecoded.username,
                    email: tokenDecoded.email,
                    address: tokenDecoded.address,
                    role: tokenDecoded.role,
                    id: tokenDecoded.id,
                    status: tokenDecoded.status,
                    password: "",
                },
                accessToken: data.token,
            }
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
            const authGenerate = await fetch(apiUrl + "/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password, email, address}),
            });
            if(!authGenerate.ok) {
                console.log(authGenerate);
                return rejectWithValue("Error al registrar usuario");
            }
            const response = await authGenerate.json();
            const decodeToken = tokenDecode(response.token);
            return {
                user: {
                    username: decodeToken.username,
                    email: decodeToken.email,
                    address: decodeToken.address,
                    role: decodeToken.role,
                    id: decodeToken.id,
                    status: decodeToken.status,
                    password: "",
                },
                accessToken: response.token,
            }
    }
);