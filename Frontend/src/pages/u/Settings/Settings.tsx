import {Separator} from "@/components/ui/separator.tsx";
import {Link, Outlet, useLocation} from "react-router-dom";

function Settings() {

    const location = useLocation();
    return (
        <div className="p-3 lg:p-8 lg:h-[calc(100vh-250px)]">
            <div className="flex flex-col lg:h-[calc(100vh-200px)] lg:flex-row gap-5 lg:gap-10 py-5 ">
                <nav className="flex overflow-auto space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:w-48">
                    <Link
                        className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                            location.pathname.includes('/profile') ? 'bg-muted' : ''
                        }`}
                        to="profile"
                    >
                        Perfil
                    </Link>
                    <Link
                        className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                            location.pathname.includes('account') ? 'bg-muted' : ''
                        }`}
                        to="account"
                    >
                        Cuenta
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
                <Separator className="mx-2 lg:hidden" orientation="horizontal"/>
                <Outlet/>
            </div>
        </div>
    );
}

export default Settings;