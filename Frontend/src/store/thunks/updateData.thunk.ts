import { toast } from "@/components/ui/use-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_BASE_URL;

export const updateDataThunk = createAsyncThunk(
    "data/updateDataThunk",
    async (
        {
            username,
            email,
            address,
            picture,
            accessToken,
        }: {
            username: string;
            email: string;
            address: string;
            picture: string;
            accessToken: string;
        },
        { rejectWithValue }
    ) => {
        const response = await fetch(apiUrl + "/u/models/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ username, email, address, picture }),
        });
        if (!response.ok) {
            const data = await response.json();
            toast({
                description: data.message,
                variant: "destructive",
            });
            return rejectWithValue("Error al actualizar el usuario");
        } else {
            const data = await response.json();
            toast({
                description: data.message,
                variant: "success",
            });
            return {
                user: {
                    username: username,
                    email: email,
                    address: address,
                    picture: picture,
                },
            };
        }
    }
);
