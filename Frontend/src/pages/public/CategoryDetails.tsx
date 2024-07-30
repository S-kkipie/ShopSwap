import { useToast } from "@/components/ui/use-toast";
import { Category } from "@/Interfaces/Category";
import { Product } from "@/Interfaces/Product";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import CarouselProducts from "@/components/CarouselProducts";
import { Separator } from "@/components/ui/separator";

const apiUrl = import.meta.env.VITE_BASE_URL;

function CategoryDetails() {
    const param = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [categoria, setCategoria] = useState<Category>();
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchCategory = async function () {
            const response = await fetch(apiUrl + "/public/models/category/" + param.id);
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar el producto.",
                    variant: "destructive",
                });
                navigate("/");
            } else {
                const data = await response.json();
                console.log(data);
                const fetchProducts = async function () {
                    const response = await fetch(apiUrl + "/public/models/product/findByCategory/" + data.id);
                    if (!response.ok) {
                        toast({
                            title: "Error",
                            description: "Ocurrió un error al cargar los productos",
                            variant: "destructive",
                        });
                    } else {
                        const data = await response.json();
                        console.log(data);
                        setProducts(data);
                    }
                };
                fetchProducts();
                setCategoria(data);
            }
        };
        fetchCategory();
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
                        <BreadcrumbPage>{categoria && categoria.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-5xl text-primary font-bold flex items-center">{categoria?.name}</h1>
            <h6 className="mb-8 mt-3">{categoria?.description}</h6>
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
                    <CarouselProducts products={products} />
                </div>
            </div>
        </div>
    );
}
export default CategoryDetails;
