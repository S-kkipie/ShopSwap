import { toast } from "@/components/ui/use-toast";
import { getCookie } from "@/Utils/getCookie.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_BASE_URL;

export const getUserDataThunk = createAsyncThunk(
    "data/fetchUserData",
    async (_, { rejectWithValue }) => {
        const token = getCookie("accessToken");
        if (token) {
            try {
                const response = await fetch(`${apiUrl}/u/models/user/self`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    const errorMessage = await response.text();
                    toast({
                        description: errorMessage,
                        variant: "destructive",
                    });
                    return rejectWithValue(errorMessage);
                }
                const data = await response.json();
                return {
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
                    password: "",
                };
            } catch (error) {
                return rejectWithValue(error);
            }
        } else {
            return rejectWithValue("No token found");
        }
    }
);