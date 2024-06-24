import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import PublicLayout from "@/pages/Layout/PublicLayout.tsx";
import Login from "@/pages/Auth/pages/Login.tsx";
import Register from "@/pages/Auth/pages/Register.tsx";
import { store } from "@/store/store.ts";
import { Provider } from "react-redux";
import PrivateLayout from "@/pages/Layout/PrivateLayout.tsx";
import Settings from "@/pages/u/Settings/Settings.tsx";
import CrudUsers from "@/pages/admin/UsersCrud/CrudUsers.tsx";
import AdminLayout from "@/pages/Layout/AdminLayout.tsx";
import Profile from "@/pages/u/Settings/Profile.tsx";
import Cuenta from "@/pages/u/Settings/Cuenta.tsx";
import Appareance from "@/pages/u/Settings/Appareance.tsx";
import DashboardConf from "@/pages/u/Settings/DashboardConf.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [{}],
    },
    {
        path: "/u",
        element: <PrivateLayout />,
        children: [
            {
                path: "settings",
                element: <Settings />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "account",
                        element: <Cuenta />,
                    },
                    {
                        path: "appareance",
                        element: <Appareance />,
                    },
                    {
                        path: "dashboard",
                        element: <DashboardConf />,
                    },
                ],
            },
            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    {
                        path: "crud",
                        element: <CrudUsers />,
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="312257306103-r40idtdlcu9adlf940p347tge3fitnu3.apps.googleusercontent.com">
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    </GoogleOAuthProvider>
);
