import { CarouselShop } from "@/components/CarouselShop";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/Interfaces/Product";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarouselProducts from "@/components/CarouselProducts";
const apiUrl = import.meta.env.VITE_BASE_URL;
function HomePage() {
    const { toast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async function () {
            const response = await fetch(apiUrl + "/public/models/product/all");
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
    }, []);
    return (
        <div className="p-8">
            <div className="mb-10 flex flex-col lg:flex-row h-auto gap-10 items-center lg:items-stretch justify-center">
                <ul className="mx-8 h-auto lg:w-40 justify-center flex item lg:flex-col gap-5 lg:gap-3">
                    <li>
                        <Link className="font-semibold transition hover:text-primary" to="">
                            Woman´s Fashion
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold transition hover:text-primary" to="">
                            Men´s Fashion
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold transition hover:text-primary" to="">
                            Home & Lifestyle
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold transition hover:text-primary" to="">
                            Electronics & Appliances
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold transition hover:text-primary" to="">
                            Medicine & Groceries
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold transition hover:text-primary" to="">
                            Baby´s & Toys
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold transition hover:text-primary" to="">
                            Healt & Beauty
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold transition hover:text-primary" to="">
                            Sports & Outdoor
                        </Link>
                    </li>
                </ul>
                <Separator className="h-auto mr-16" orientation="vertical" />
                <CarouselShop />
            </div>
            <div className="mx-36">
                <h1 className="text-2xl mb-8 text-primary font-bold flex items-center">
                    <div className="bg-primary w-5 h-10 rounded mr-3"></div>Productos Recientes
                </h1>
                <CarouselProducts products={products} />
            </div>
        </div>
    );
}
export default HomePage;
