import { useToast } from "@/components/ui/use-toast";
import { ProductOrder, ShoppingOrder } from "@/Interfaces/ShoppingOrder";
import { useAppSelector } from "@/store/hooks";
import { tokenDecode } from "@/Utils/decodeToken.util";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
const apiUrl = import.meta.env.VITE_BASE_URL;

function Billings() {
    const { userData, accessToken } = useAppSelector((state) => state.authReducer);
    const { toast } = useToast();
    const [charData, setChartData] = useState<any[]>([]);
    useEffect(() => {}, []);
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
                let dataCompras = await response.json();
                dataCompras = dataCompras.map((order: ShoppingOrder) => {
                    return {
                        ...order,
                        finalAmount: -order.finalAmount,
                    };
                });
                const fetchOrdersSeller = async function () {
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
                        const dataVentas = await response.json();
                        const idUser = tokenDecode(accessToken).id;
                        const ordersVentas = dataVentas.map((order: ShoppingOrder) => {
                            if (!order.sellerIds.includes(idUser)) {
                                return null;
                            }
                            const total = order.orderProducts.reduce((sum, product: ProductOrder) => {
                                return sum + product.product.price * product.quantity;
                            }, 0);
                            return {
                                ...order,
                                orderProducts: order.orderProducts.map((product: ProductOrder) => {
                                    product.product.userId === idUser ? product : null;
                                }),
                                finalAmount: total,
                            };
                        });
                        console.log(ordersVentas);
                        console.log(dataCompras);
                        const combinedData = [...ordersVentas, ...dataCompras];

                        // Ordenar por fecha
                        combinedData.sort((a: ShoppingOrder, b: ShoppingOrder) => new Date(a.created).getTime() - new Date(b.created).getTime());
                        let money = userData.money;
                        let calcMoney = function (order: ShoppingOrder) {
                            money += order.finalAmount;
                            return money;
                        };
                        const chartData = [
                            ["Date", "Tu dinero"],
                            ...combinedData.map((order: ShoppingOrder) => [
                                new Date(order.created).toLocaleString("es-ES", {
                                    month: "2-digit",
                                    day: "2-digit",
                                }),
                                calcMoney(order),
                            ]),
                        ];

                        console.log(chartData);
                        setChartData(chartData);
                    }
                };
                fetchOrdersSeller();
            }
        };
        fetchOrders();
    }, [userData]);

    const options = {
        title: "Tus finanzas",
        curveType: "function",
        legend: { position: "top" },
    };
    return (
        <div className="w-full">
            <h1 className="text-4xl">Tu dinero actual: ${userData.money}</h1>

            <Chart chartType="LineChart" data={charData} className="h-[600px]" options={options} />
        </div>
    );
}

export default Billings;
