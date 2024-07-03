import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "@/store/hooks.ts";
import {useCookies} from "react-cookie";
import {useEffect} from "react";

function AdminLayout() {
    const {isExpired,userData, accessToken} = useAppSelector((state) => state.authReducer)
    const [, setCookie, remove] = useCookies();

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

    return userData?.role === "ADMIN" ?(
        <div className="flex flex-col items-center  m-8 mt-16" >
           <h1 className=" text-3xl font-semibold tracking-tight">Administrator Panel</h1>
            <Outlet/>
        </div>
    ): <Navigate to='/login'  />;
}

export default AdminLayout;