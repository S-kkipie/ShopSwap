import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { clearCart, removeItem } from "@/store/slices/cart.slice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Carrito() {
    const cart = useSelector((state: RootState) => state.cart);
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        let total = 0;
        cart.products.forEach((product: any) => {
            total += product.product.price * product.quantity;
        });
        setAmount(total);
    }, [cart.products]);
    const dispatch = useDispatch();
    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
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
                        <BreadcrumbPage>Carrito</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mx-48 relative">
                <div className="flex justify-between mb-8">
                    <Link to="/Home"> Volver a la tienda</Link>
                    <Button onClick={handleClearCart}>Clear Cart</Button>
                </div>
                <Table>
                    <TableCaption>Tu carrito</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cart.products.map((product: any) => (
                            <TableRow key={product.product.id}>
                                <TableCell className="flex items-center justify-start gap-5">
                                    <img className="w-[50px]" src={product.product.imgUrl} />
                                    <p className="font-semibold">{product.product.name}</p>
                                </TableCell>
                                <TableCell>${product.product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell className="text-right">${product.product.price * product.quantity}</TableCell>
                                <TableCell className="text-right">
                                    <button className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none" onClick={() => handleRemoveItem(product.product.id.toString())}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="ml-auto mt-8 shadow-xl p-6 w-1/3">
                    <h1 className="text-2xl mb-5 font-semibold">Cart total</h1>

                    <div className="flex justify-between">
                        <h1 className="text-lg font-semibold">Sub total</h1>
                        <h1 className="text-md font-semibold">${amount}</h1>
                    </div>
                    <hr className="my-5" />
                    <div className="flex justify-between">
                        <h1 className="text-lg font-semibold">Shipping</h1>
                        <h1 className="text-md font-semibold">Free</h1>
                    </div>
                    <hr className="my-5" />
                    <div className="flex justify-between">
                        <h1 className="text-lg font-semibold">Total</h1>
                        <h1 className="text-md font-bold">${amount}</h1>
                    </div>
                    <Link to="/u/checkout">
                        <Button className="mt-8">Checkout</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Carrito;
