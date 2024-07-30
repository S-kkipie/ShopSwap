import GeneralNav from "@/components/GeneralNav.tsx";
import Footer from "@/components/Footer.tsx";
import { useEffect } from "react";
import { getUserDataThunk } from "@/store/thunks/getUserData.thunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    const dispatch = useAppDispatch();
    const [, setCookie, remove] = useCookies();

    const { isExpired, accessToken } = useAppSelector((state) => state.authReducer);
    useEffect(() => {
        if (accessToken) {
            setCookie("accessToken", accessToken, { path: "/" });
        }
    }, [accessToken, setCookie]);
    useEffect(() => {
        if (isExpired) {
            remove("accessToken", {
                path: "/",
            });
        }
    }, []);
    useEffect(() => {
        dispatch(getUserDataThunk());
    }, []);
    return (
        <div>
            <GeneralNav />
            <div className="flex items-center flex-col p-6">
                <h1 className="text-8xl font-semibold text-center mt-40">404 Not Found</h1>
                <h3 className="text-xl text-center mt-20">La pagina a la que intentas acceder no existe</h3>
                <Link className="my-10" to="/">
                    <Button>Regresa a la pagina principal</Button>
                </Link>
            </div>
            <Footer />
            <Toaster />
        </div>
    );
};
export default NotFound;
