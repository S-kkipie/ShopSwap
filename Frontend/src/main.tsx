import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import PublicLayout from "@/pages/Layout/PublicLayout.tsx";
import Login from "@/pages/Auth/pages/Login.tsx";
import Register from "@/pages/Auth/pages/Register.tsx";
import { store } from "@/store/store.ts";
import { Provider } from "react-redux";
import PrivateLayout from "@/pages/Layout/PrivateLayout.tsx";
import CrudUsers from "@/pages/admin/UsersCrud/CrudUsers.tsx";
import AdminLayout from "@/pages/Layout/AdminLayout.tsx";
import Profile from "@/pages/u/Settings/Profile";
import Cuenta from "@/pages/u/Settings/Cuenta";
import Appareance from "@/pages/u/Settings/Appareance";
import DashboardConf from "@/pages/u/Settings/DashboardConf";
import ChangePassword from "./pages/u/Settings/ChangePassword";
import CategoryCrud from "./pages/admin/CategoryCrud/CategoryCrud";
import UserProductList from "./pages/u/Account/UserProductList";
import HomePage from "./pages/public/HomePage";
import ProductDetails from "./pages/public/ProductDetails";
import CategoryDetails from "./pages/public/CategoryDetails";
import ProductCrud from "./pages/admin/ProductCrud/ProductCrud";
import UserDetails from "./pages/public/UserDetails";
import Carrito from "./pages/u/Carrito/Carrito";
import Checkout from "./pages/u/Checkout/Checkout";
import NotFound from "./pages/public/NotFound";
import ShoppingOrderDetails from "./pages/u/ShoppingOrder/ShoppingOrderDetails";
import MyOrders from "./pages/u/ShoppingOrder/MyOrders";
import Account from "./pages/u/Account/Account";
import Settings from "./pages/u/Settings/Settings";
import Billings from "./pages/u/Billings/Billings";
import MySales from "./pages/u/Sales/MySales";
const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "product/:id",
                element: <ProductDetails />,
            },
            {
                path: "category/:id",
                element: <CategoryDetails />,
            },
            {
                path: "user/:id",
                element: <UserDetails />,
            },
        ],
    },
    {
        path: "/u",
        element: <PrivateLayout />,
        errorElement: <NotFound />,
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
                    {
                        path: "change_password",
                        element: <ChangePassword />,
                    },
                ],
            },
            {
                path: "account",
                element: <Account/>,
                children: [
                    {
                        path: "myOrders",
                        element: <MyOrders />,
                    },
                    {
                        path: "productList",
                        element: <UserProductList />,
                    },
                    {
                        path: "billings",
                        element: <Billings />,
                    },
                    {
                        path: "mySales",
                        element: <MySales />,
                    }
                ],
            },

            {
                path: "carrito",
                element: <Carrito />,
            },
            {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "shoppingOrder/:id",
                element: <ShoppingOrderDetails />,
            },
            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    {
                        path: "products",
                        element: <ProductCrud />,
                    },
                    {
                        path: "users",
                        element: <CrudUsers />,
                    },
                    {
                        path: "categories",
                        element: <CategoryCrud />,
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        errorElement: <NotFound />,

        element: <Login />,
    },
    {
        path: "/register",
        errorElement: <NotFound />,
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
