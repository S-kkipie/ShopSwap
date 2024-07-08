import ProductCard from "./components/ProductCard";
import ModalAddProduct from "./components/ModalAddProduct";
import { Product } from "@/Interfaces/Product";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useToast } from "@/components/ui/use-toast";
const apiUrl = import.meta.env.VITE_BASE_URL;

function UserProductList() {
    const { accessToken } = useAppSelector((state) => state.authReducer);
    const { toast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    const onProductAdded = () => {
        setRefreshData(!refreshData);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${apiUrl}/u/models/product/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,

                },
            });
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar los productos",
                    variant: "destructive",
                });
            }else{
                const data = await response.json();
                setProducts(data);
                console.log(data);
            }

        };
        fetchProducts();
    }, [refreshData]);
    return (
        <div className=" w-5/6">
            <div className="mb-10 w-full flex justify-center lg:block">
                <ModalAddProduct onProductAdded={onProductAdded} />
            </div>
            <div className="flex gap-12 justify-center lg:justify-start flex-wrap">
                {
                    products.map((product, i) => {
                        return (
                            <ProductCard key={i} product={product} onProductAdded={onProductAdded} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default UserProductList;
