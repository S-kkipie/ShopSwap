const apiUrl = import.meta.env.VITE_BASE_URL;
import CarouselProducts from "@/components/CarouselProducts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingOrder } from "@/Interfaces/ShoppingOrder";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShoppingOrderDetails() {
    const param = useParams();
    const { toast } = useToast();
    const [order, setOrder] = useState<ShoppingOrder>();
    const { accessToken } = useAppSelector((state) => state.authReducer);
    useEffect(() => {
        const fetchOrder = async function () {
            const response = await fetch(apiUrl + "/u/models/shoppingOrder/" + param.id, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar la orden.",
                    variant: "destructive",
                });
            } else {
                const data = await response.json();
                console.log(data);
                setOrder(data);
                window.scrollTo(0, 0);
            }
        };
        fetchOrder();
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
                        <BreadcrumbLink href="/u/settings/profile">Account</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/u/account/myOrders">My Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{order?.id}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {order && (
                <div>
                    <h1 className="text-4xl mb-8 text-primary font-bold flex items-center">
                        <div className="bg-primary w-3 h-10 rounded mr-3"></div>Pedido #{order?.id}
                    </h1>
                    <div className="px-4 py-2 w-1/3  mb-12">
                        <h1 className="font-semibold">Detalles del pedido</h1>
                        {order.orderProducts.map((product) => {
                            return (
                                <div key={product.product.id} className="flex ">
                                    <div className="flex gap-5 w-full justify-between">
                                        <p>
                                            {product.product.name} x {product.quantity}{" "}
                                        </p>
                                        <p>${product.product.price * product.quantity}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex gap-8">
                        <CarouselProducts products={order?.orderProducts.map((e) => e.product)!} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShoppingOrderDetails;
