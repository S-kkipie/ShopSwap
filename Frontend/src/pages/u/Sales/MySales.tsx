import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/Interfaces/Product";
import { ShoppingOrder } from "@/Interfaces/ShoppingOrder";
import { useAppSelector } from "@/store/hooks";
import { tokenDecode } from "@/Utils/decodeToken.util";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_URL;

function MySales() {
    const { accessToken } = useAppSelector((state) => state.authReducer);
    const [orders, setOrders] = useState<ShoppingOrder[]>([]);
    const { toast } = useToast();
    interface ProductOrder {
        product: Product;
        quantity: number;
    }
    useEffect(() => {
        const fetchOrders = async function () {
            const response = await fetch(apiUrl + "/u/models/shoppingOrder/getOrdersBySeller", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar las ordenes.",
                    variant: "destructive",
                });
            } else {
                const data = await response.json();
                const idUser = tokenDecode(accessToken).id;
                console.log(idUser);
                const orders = data.map((order: ShoppingOrder) => {
                    if (!order.sellerIds.includes(idUser)) {
                        return null;
                    }
                    return {
                        ...order,
                        orderProducts: order.orderProducts.filter((product: ProductOrder) => product.product.userId === idUser),
                    };
                });
                console.log(orders);
                setOrders(orders);
            }
        };
        fetchOrders();
    }, []);
    return (
        <div className=" flex flex-col gap-8">
            {orders.map((order) => {
                return (
                    <div className="flex w-[400px]  flex-col" key={order.id}>
                        <div className="transition-all shadow  rounded-xl h-full hover:shadow-md">
                            <div className="bg-muted px-4 py-2 flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold">Pedido #{order.id}</p>
                                    <p className="text-sm">
                                        Fecha:{" "}
                                        {new Date(order.created).toLocaleString("es-ES", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })}
                                    </p>
                                </div>
                                <Link to={"/u/shoppingOrder/" + order.id} className="">
                                    <Button variant="outline">Ver mas detalles</Button>
                                </Link>
                            </div>
                            <Separator />
                            <div className="px-4 py-2">
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
                            <Separator />
                            <div className="px-4 py-2 flex justify-between">
                                <p className="font-semibold">Total: </p>
                                <p>${order.finalAmount}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MySales;
