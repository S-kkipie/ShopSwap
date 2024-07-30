import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingOrder } from "@/Interfaces/ShoppingOrder";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_URL;

function MyOrders() {
    const { accessToken } = useAppSelector((state) => state.authReducer);
    const [orders, setOrders] = useState<ShoppingOrder[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const fetchOrders = async function () {
            const response = await fetch(apiUrl + "/u/models/shoppingOrder/getOrdersByCustomer", {
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
                console.log(data);
                setOrders(data);
            }
        };
        fetchOrders();
    }, []);
    return (
        <div className=" flex flex-col gap-8">
            {orders.map((order) => {
                return (
                    <div className="flex flex-col" key={order.id}>
                        <Link to={"/u/shoppingOrder/" + order.id} className="">
                            <div className="transition-all shadow h-[500px]  hover:shadow-md flex gap-10 px-3 py-2">
                                <div>
                                    <div className="mt-4">
                                        <h3 className="text-sm text-muted-foreground ">ID de la compra </h3>
                                        <h1 className="text-md font-semibold">{order.id}</h1>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-sm text-muted-foreground ">ID del comprador </h3>
                                        <h1 className="text-md font-semibold">{order.customerId}</h1>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-sm text-muted-foreground ">Pago total </h3>
                                        <h1 className="text-md font-semibold">S/.{order.finalAmount}</h1>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-sm text-muted-foreground ">Fecha </h3>
                                        <h1 className="text-md font-semibold">
                                            {new Date(order.created).toLocaleString("es-ES", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            })}
                                        </h1>
                                    </div>
                                </div>
                                <Separator orientation="vertical" />
                                <div className=" px-8 flex">
                                    {
                                        order.orderProducts.map((productOrder, index) => {
                                            return (
                                                <div key={index} className="h-full px-8 py-5">
                                                    <h1 className="text-md font-semibold">{productOrder.product.name}</h1>
                                                    <h1>S/.{productOrder.product.price}</h1>
                                                    <h1>Cantidad: {productOrder.quantity}</h1>
                                                    <img src={productOrder.product.imgUrl} alt={productOrder.product.name} className="w-full h-5/6 object-cover" />
                                                </div>
                                                
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default MyOrders;
