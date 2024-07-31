import { useToast } from "@/components/ui/use-toast";
import { ShoppingOrder } from "@/Interfaces/ShoppingOrder";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
const apiUrl = import.meta.env.VITE_BASE_URL;

function Billings() {
    const { userData, accessToken } = useAppSelector((state) => state.authReducer);
    const { toast } = useToast();
    const [charData, setChartData] = useState<any[]>([]);

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
                const chartData = [
                    ["Date", "Tu dinero"],
                    ...data.map((order: ShoppingOrder) => {
                      console.log(order.finalAmount)
                        return [
                            new Date(order.created).toLocaleString("es-ES", {
                                month: "2-digit",
                                day: "2-digit",
                            }),
                            userData.money - order.finalAmount,
                        ];
                    }),
                ];
                setChartData(chartData);
            }
        };
        fetchOrders();
    }, []);

    const options = {
        title: "Tus finanzas",
        curveType: "function",
        legend: { position: "top" },
    };
    return (
        <div className="w-full">
            <Chart chartType="LineChart" data={charData} options={options} />
        </div>
    );
}

export default Billings;
