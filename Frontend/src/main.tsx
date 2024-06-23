import {createRoot} from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import PublicLayout from "@/pages/Layout/PublicLayout.tsx";
import Login from "@/pages/Auth/pages/Login.tsx";
import Register from "@/pages/Auth/pages/Register.tsx";
import {store} from "@/store/store.ts";
import {Provider} from "react-redux";
import PrivateLayout from "@/pages/Layout/PrivateLayout.tsx";
import Profile from "@/pages/u/Profile.tsx";
import CrudUsers from "@/pages/admin/UsersCrud/CrudUsers.tsx";
import AdminLayout from "@/pages/Layout/AdminLayout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout/>,
        children: [
            {},
        ]
    },
    {
        path: "/u",
        element: (<PrivateLayout/>),
        children: [
            {
                path: "profile",
                element: <Profile/>,
            },
            {
                path: "admin",
                element: <AdminLayout/>,
                children: [
                    {
                        path: "crud",
                        element: <CrudUsers/>
                    },
                ]
            },
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    }
]);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
);