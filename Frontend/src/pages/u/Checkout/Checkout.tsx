import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { clearCart } from "@/store/slices/cart.slice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        let total = 0;
        cart.products.forEach((product: any) => {
            total += product.product.price * product.quantity;
        });
        setAmount(total);
    }, [cart.products]);
    const handlePlaceOrder = () => {
        console.log(cart.products)
        dispatch(clearCart());
        navigate("/");

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
            <div className="max-w-md mx-auto p-4">
                {cart.products.map((product: any) => (
                    <div className="flex justify-between items-center mb-2">
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
    );
}

export default Checkout;
