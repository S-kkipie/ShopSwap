import {Navigate, Outlet} from "react-router-dom";
import GeneralNav from "@/components/GeneralNav.tsx";
import Footer from "@/components/Footer.tsx";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";
import { getUserDataThunk } from "@/store/thunks/getUserData.thunk";

function PrivateLayout() {
    const [, setCookie, remove] = useCookies();
    const {isAuth, isExpired, accessToken} = useAppSelector((state) => state.authReducer)
    const dispatch = useAppDispatch();

    
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
    useEffect(() => {
        dispatch(getUserDataThunk());
    },[])
    return isAuth ? (
        <div >
            <GeneralNav/>
            <Outlet />
            <Footer/>
            <Toaster />
        </div>) : (<Navigate to="/login"></Navigate>)
}

export default PrivateLayout;