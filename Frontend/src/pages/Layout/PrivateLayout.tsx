import {Navigate, Outlet} from "react-router-dom";
import GeneralNav from "@/components/GeneralNav.tsx";
import Footer from "@/components/ui/Footer.tsx";
import {useAppSelector} from "@/store/hooks.ts";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";

function PrivateLayout() {
    const [, setCookie, remove] = useCookies();
    const {isAuth, isExpired, accessToken} = useAppSelector((state) => state.authReducer)
    useEffect(() => {
        if (accessToken) {
            setCookie("accessToken", accessToken, { path: '/' })
        }
    }, [accessToken, setCookie]);
    useEffect(() => {
        if (isExpired) {
            remove("accessToken")
        }
    }, [isExpired, remove]);
    return isAuth ? (
        <div >
            <GeneralNav/>
            <Outlet/>
            <Footer/>
            <Toaster />
        </div>) : (<Navigate to="/login"></Navigate>)
}

export default PrivateLayout;