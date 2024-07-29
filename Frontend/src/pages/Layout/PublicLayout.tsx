import GeneralNav from "@/components/GeneralNav.tsx";
import Footer from "@/components/Footer.tsx";
import { useEffect } from "react";
import { getUserDataThunk } from "@/store/thunks/getUserData.thunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useCookies } from "react-cookie";

const PublicLayout = () => {
    const dispatch = useAppDispatch();
    const [, setCookie, remove] = useCookies();

    const { isExpired, accessToken } = useAppSelector((state) => state.authReducer);
    useEffect(() => {
        if (accessToken) {
            setCookie("accessToken", accessToken, { path: '/' })
        }
    }, [accessToken, setCookie]);
    useEffect(() => {
        if (isExpired) {
            remove("accessToken", {
                path: "/",
            })
        }
    }, []);
    useEffect(() => {
        dispatch(getUserDataThunk());
    },[])
    return (
        <div>
            <GeneralNav />
            <Outlet />
            <Footer />
            <Toaster />
        </div>
    );
};
export default PublicLayout;
