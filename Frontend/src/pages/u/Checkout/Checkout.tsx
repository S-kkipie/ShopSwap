import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slices/cart.slice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_URL;

function Checkout() {
    const { userData, accessToken } = useAppSelector((state) => state.authReducer);

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if(cart.products.length === 0){
            toast({
                title: "Carrito vacio",
                description: "No hay productos en tu carrito",
                variant: "destructive",
            });
            navigate('/u/carrito')
        }
        let total = 0;
        cart.products.forEach((product: any) => {
            total += product.product.price * product.quantity;
        });
        setAmount(total);
    }, []);
    const handlePlaceOrder = () => {
        const products = cart.products.map((product: any) => ({
            productId: product.product.id,
            quantity: product.quantity,
        }));
        const fetchShoppingOrder = async () => {
            const response = await fetch(apiUrl + "/u/models/shoppingOrder/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(products),
            });
            console.log(response);
            if (!response.ok) {
                toast({
                    title: "Ocurrio un error en la compra",
                    description: "Ya no estan disponibles los productos o no tienes suficiente saldo para realizar la compra",
                    variant: "destructive",
                });
                return;
            }
            const data = await response.json();
            toast({
                title: "Compra realizada con exito",
                description: "Su compra se realizo con exito",
                variant: "success",
            });
            console.log(data);
            dispatch(clearCart());
            navigate("/u/shoppingOrder/" + data.id);
        };
        fetchShoppingOrder();
    };
    return (
        <div className="p-8 relative">
            <Breadcrumb className="mx-12 mb-12">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/u/carrito">Carrito</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Checkout</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex w-full justify-around">
                <div className="border shadow px-8 py-6">
                    <h1 className="text-4xl font-semibold mb-5">Checkout</h1>
                    <div className="mb-5 flex flex-col gap-2">
                        <h2 className="text-lg  ">Your money: ${userData.money}</h2>
                        <h2 className="text-lg  ">Your address: {userData.address}</h2>
                        <h2 className="text-lg  ">Monto a pagar: ${amount}</h2>
                        <h2 className="text-lg  ">Dinero restante: ${userData.money - amount}</h2>
                        
                    </div>
                </div>
                <div className="max-w-md w-1/3  p-4">
                    {cart.products.map((product: any, index: number) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <div className="flex  items-center gap-3">
                                <img src={product.product.imgUrl} alt={product.product.name} className="w-16 h-16 object-cover" />
                                <p>{product.product.name}</p>
                            </div>
                            <div>S/. {product.product.price}</div>
                        </div>
                    ))}
                    <div className="flex justify-between mb-2 border-t pt-2">
                        <div>Subtotal:</div>
                        <div>S/. {amount}</div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <div>Shipping:</div>
                        <div>Free</div>
                    </div>
                    <div className="flex justify-between mb-5 border-b pb-2">
                        <div>Total:</div>
                        <div>S/.{amount}</div>
                    </div>
                    <div className="mb-5">
                        <div>
                            <input type="radio" id="cash" name="payment" value="cash" defaultChecked className="mr-2" />
                            <label htmlFor="cash">Cash on delivery</label>
                        </div>
                    </div>
                    <button onClick={handlePlaceOrder} className="bg-red-600 text-white py-2 px-4 w-full">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
