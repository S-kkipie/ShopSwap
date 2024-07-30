import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/Interfaces/Product";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import CarouselProducts from "@/components/CarouselProducts";
import { Separator } from "@/components/ui/separator";
import User from "@/Interfaces/User";

const apiUrl = import.meta.env.VITE_BASE_URL;

function UserDetails() {
    const param = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const fetchUser = async function () {
            const response = await fetch(apiUrl + "/public/models/user/" + param.id);
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar el producto.",
                    variant: "destructive",
                });
                navigate("/");
            } else {
                const data = await response.json();
                setUser(data);
                const responseProducts = await fetch(apiUrl + "/public/models/product/findByUser/" + param.id);
                if (!responseProducts.ok) {
                    toast({
                        title: "Error",
                        description: "Ocurrió un error al cargar los productos",
                        variant: "destructive",
                    });
                } else {
                    const data = await responseProducts.json();
                    setProducts(data);
                }
            }
        };
        fetchUser();
    }, [param]);
    return (
        <div className="px-16 py-8">
            <Breadcrumb className="mb-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{user && user.username}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-5xl text-primary font-bold flex items-center">{user?.username}</h1>
            <h6 className="mb-8 mt-3">{user?.email}</h6>
            <div>
                <h1 className="text-2xl mb-8 text-primary font-bold flex items-center">
                    <div className="bg-primary w-3 h-10 rounded mr-3"></div>Productos Recientes
                </h1>
                <div className="flex gap-8">
                    <CarouselProducts products={products} />
                </div>
            </div>
            <Separator className="my-8" />
            <div>
                <h1 className="text-2xl mb-8 text-primary font-bold flex items-center">
                    <div className="bg-primary w-3 h-10 rounded mr-3"></div>Los mas valorados
                </h1>
                <div className="flex gap-8">
                    <CarouselProducts products={products.filter((e) => e.rating >= 0)} />
                </div>
            </div>
        </div>
    );
}
export default UserDetails;
