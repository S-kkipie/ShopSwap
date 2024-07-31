import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
const apiUrl = import.meta.env.VITE_BASE_URL;

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useCookies } from "react-cookie";
import { useAppSelector } from "@/store/hooks.ts";
import { Product } from "@/Interfaces/Product";
import { useState } from "react";
import { Category } from "@/Interfaces/Category";
import User from "@/Interfaces/User";
import { Separator } from "./ui/separator";

function GeneralNav() {
    const { isAuth } = useAppSelector((state) => state.authReducer);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    function handleSearch(e: any) {
        e.preventDefault();
        if (e.target.value === "") {
            setProducts([]);
            setCategories([]);
            setUsers([]);
            return;
        }
        const fetchSearch = async () => {
            const response = await fetch(apiUrl + "/public/models/product/search/" + e.target.value);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
            const response2 = await fetch(apiUrl + "/public/models/category/search/" + e.target.value);
            if (response2.ok) {
                const data = await response2.json();
                setCategories(data);
            }
            const response3 = await fetch(apiUrl + "/public/models/user/search/" + e.target.value);
            if (response3.ok) {
                const data = await response3.json();
                console.log(data);
                setUsers(data);
            }
        };
        fetchSearch();
        //TODO
    }
    function SearchResult({ products, categories, users }: { products: Product[]; categories: Category[]; users: User[] }) {
        function handleLinkClick() {
            setProducts([]);
            setCategories([]);
            setUsers([]);
        }
        return (
            <div className="z-10 absolute border-x w-full rounded shadow-lg bg-muted">
                {products.length > 0 && (
                    <div>
                        <p className="text-sm font-semibold px-2 py-1">Productos: </p>
                        {products.map((product: Product) => {
                            return (
                                <div className="px-5 py-1  transition-all hover:bg-white hover:text-black" key={product.id}>
                                    <Link onClick={handleLinkClick} to={"/product/" + product.id}>
                                        <div className="flex gap-3 items-center justify-between">
                                            <div className="flex gap-3 items-center">
                                                <img className="w-10" src={product.imgUrl} alt={product.name} />
                                                <h1>{product.name}</h1>
                                            </div>
                                            <p>${product.price}</p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
                <Separator className="my-2"/>
                {categories.length > 0 && (
                    <div>
                        <p className="text-sm font-semibold px-2 py-1">Categorias: </p>
                        {categories.map((category: Category) => {
                            return (
                                <div className="px-5 py-1  transition-all hover:bg-white hover:text-black" key={category.id}>
                                    <Link onClick={handleLinkClick} to={"/category/" + category.id}>
                                        <div className="flex gap-3 items-center justify-between">
                                            <div className="flex gap-3 items-center">
                                                <h1>{category.name}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
                <Separator className="my-2"/>

                {users.length > 0 && (
                    <div>
                        <p className="text-sm font-semibold px-2 py-1">Usuarios: </p>
                        {users.map((user: User) => {
                            return (
                                <div className="px-5 py-1  transition-all hover:bg-white hover:text-black" key={user.id}>
                                    <Link onClick={handleLinkClick} to={"/user/" + user.id}>
                                        <div className="flex gap-3 items-center justify-between">
                                            <div className="flex gap-3 items-center">
                                                <h1>{user.username}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
    return (
        <nav className="flex gap-4 bg-white shadow-lg  justify-around items-center py-6">
            <Link to="/">
                <h1 className="text-3xl font-bold text-primary">ShopSwap</h1>
            </Link>
            <div className="hidden md:flex gap-8 ">
                {
                    //TODO add info pages
                }
                <Link to="/contact">
                    <h1 className="transition font-semibold hover:text-primary">Contact</h1>
                </Link>
                <Link to="/about">
                    <h1 className="font-semibold transition hover:text-primary">About</h1>
                </Link>
                <Link to="/help">
                    <h1 className="font-semibold transition hover:text-primary">Help and Support</h1>
                </Link>
            </div>
            <div className="hidden lg:flex w-1/3 lg:gap-5">
                <div className="w-full relative">
                    <Input placeholder="Busca productos, marcas y mas..." onChange={handleSearch} />
                    {
                        users.length > 0 || products.length > 0 || categories.length > 0 ? (
                            <SearchResult products={products} categories={categories} users={users} />
                        ) : null
                    }

                </div>
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
                    <Link to="/u/admin/users">
                        <DropdownMenuItem>ShopSwap Admin</DropdownMenuItem>
                    </Link>
                )}
                <Link to="/u/account/billings">
                    <DropdownMenuItem className="cursor-pointer">Finanzas</DropdownMenuItem>
                </Link>
                <Link to="/u/account/productList">
                    <DropdownMenuItem className="cursor-pointer">Account</DropdownMenuItem>
                </Link>
                <Link to="/u/carrito">
                    <DropdownMenuItem className="cursor-pointer">Carrito</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default GeneralNav;
