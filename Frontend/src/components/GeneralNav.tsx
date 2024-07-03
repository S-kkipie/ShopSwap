import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useCookies } from "react-cookie";
import { useAppSelector } from "@/store/hooks.ts";

function GeneralNav() {
    const { isAuth } = useAppSelector((state) => state.authReducer);
    return (
        <nav className="flex gap-4 bg-white shadow-lg  justify-around items-center py-6">
            <Link to="/">
                <h1 className="text-3xl font-bold text-primary">ShopSwap</h1>
            </Link>
            <div className="hidden lg:flex w-1/3 lg:gap-5">
                {
                    //TODO add search functionality
                }
                <Input placeholder="Busca productos, marcas y mas..." />
                <Button>Buscar</Button>
            </div>
            {isAuth ? <DropDownUser /> : <LoginOrRegister />}
        </nav>
    );
}

function LoginOrRegister() {
    return (
        <div className="flex gap-5">
            <Link to="/login">
                <Button>Iniciar Sesion</Button>
            </Link>
            <Link to="/register">
                <Button>Registrarse</Button>
            </Link>
        </div>
    );
}

function DropDownUser() {
    const [, , remove] = useCookies(["accessToken"]);
    const { userData } = useAppSelector((state) => state.authReducer);
    const handleLogout = () => {
        remove("accessToken");
        window.location.replace("/login");
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
                <Avatar>
                    <AvatarImage src={userData?.picture ? userData!.picture : "https://w7.pngwing.com/pngs/578/405/png-transparent-user-person-profile-avatar-man-male-human-login-username-people.png"} />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/u/settings/profile">
                    <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                </Link>
                {userData?.role === "ADMIN" && (
                    <Link to="/u/admin/crud">
                        <DropdownMenuItem>ShopSwap Admin</DropdownMenuItem>
                    </Link>
                )}
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default GeneralNav;
