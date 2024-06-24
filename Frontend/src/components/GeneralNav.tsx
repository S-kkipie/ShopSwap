import {Input} from "@/components/ui/input"
import {Avatar, AvatarImage} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useCookies} from "react-cookie";
import {useAppSelector} from "@/store/hooks.ts";

function GeneralNav() {

    const {isAuth} = useAppSelector((state) => state.authReducer)
    return (
        <nav className="flex gap-4  justify-around items-center shadow p-5">
            <Link to="/"><h1 className="text-3xl font-bold text-primary">ShopSwap</h1></Link>
            <div className="w-1/3 flex gap-5">
                {//TODO add search functionality
                }
                <Input placeholder="Busca productos, marcas y mas..."/>
                <Button>Buscar</Button>
            </div>
            {isAuth ? <DropDownUser/> : <LoginOrRegister/>}
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
    const [, , remove] = useCookies(["accessToken"])
    const {userData} = useAppSelector((state) => state.authReducer)
    const handleLogout = () => {
        remove("accessToken")
        window.location.replace("/login")
    }
    return <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
            <Avatar>
                <AvatarImage src={userData!.picture? userData!.picture : "data:image/jpeg;base64,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" }/>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <Link  to="/u/settings/profile"><DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem></Link>
            {userData!.role === "ADMIN" && <Link to="/u/admin/crud"><DropdownMenuItem>ShopSwap Admin</DropdownMenuItem></Link>}
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default GeneralNav;