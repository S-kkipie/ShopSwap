import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "@/store/hooks.ts";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import { Separator } from "@/components/ui/separator";

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
    const location = useLocation();
    return userData?.role === "ADMIN" ?(
        <div className="p-3 2xl:p-8 ">
        <div className="flex flex-col 2xl:flex-row gap-5 2xl:gap-10 py-5 items-center 2xl:items-stretch">
            <nav className="flex self-stretch pb-2 md:self-center 2xl:self-stretch overflow-auto space-x-2 2xl:flex-col 2xl:space-x-0 2xl:space-y-1 2xl:w-56">
                <Link
                    className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                        location.pathname.includes('users') ? 'bg-muted' : ''
                    }`}
                    to="users"
                >
                    Usuarios
                </Link>
                <Link
                    className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                        location.pathname.includes('categories') ? 'bg-muted' : ''
                    }`}
                    to="categories"
                >
                    Categorias
                </Link>
                <Link
                    className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                        location.pathname.includes('appareance') ? 'bg-muted' : ''
                    }`}
                    to="appareance"
                >
                    Personalizacion
                </Link>
                <Link
                    className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                        location.pathname.includes('dashboard') ? 'bg-muted' : ''
                    }`}
                    to="dashboard"
                >
                    Dashboard
                </Link>
            </nav>
            <Separator className="mx-2 2xl:hidden" orientation="horizontal"/>
            <Separator className="mx-2 h-auto" orientation="vertical"/>
            <Outlet/>
        </div>
    </div>
    ): <Navigate to='/login'  />;
}

export default AdminLayout;