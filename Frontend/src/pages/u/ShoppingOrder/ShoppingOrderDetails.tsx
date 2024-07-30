const apiUrl = import.meta.env.VITE_BASE_URL;
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
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
            }
        };
        fetchOrder();
    }, []);
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
                        <BreadcrumbLink href="/u/product/myOrders">My Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{order?.id}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                hola
            </div>
        </div>
    );
}

export default ShoppingOrderDetails;
