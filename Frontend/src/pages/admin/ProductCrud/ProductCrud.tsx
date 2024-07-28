import { useAppSelector } from "@/store/hooks.ts";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ModalAddProduct from "./modals/ModalAddProduct";
import { Product } from "@/Interfaces/Product";
import ModalConfirmDeleteProduct from "./modals/ModalDeleteProduct";
import ModalUpdateProduct from "./modals/ModalUpdateProduct";
const apiUrl = import.meta.env.VITE_BASE_URL;

function ProductCrud() {
    const [refreshData, setRefreshData] = useState(false);
    const { userData, accessToken } = useAppSelector((state) => state.authReducer);
    const [products, setProducts] = useState<Product[]>([]);
    const { toast } = useToast();
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${apiUrl}/public/models/product/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!res.ok) {
                toast({
                    title: "Ocurrio un error al recibir los productos.",
                    variant: "destructive",
                });
            } else {
                const data = await res.json();
                setProducts(data);
                console.log(data);
            }
        };
        fetchData();
    }, [refreshData]);
    return userData!.role == "ADMIN" ? (
        <section className="container px-4 mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center mt-4 gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 ">Products</h2>
                    <span className="px-3 py-1 text-xs text-white bg-primary rounded-full ">{products.length}</span>
                </div>
                <div className="flex items-center mt-4 gap-x-3">
                    <ModalAddProduct onProductAdded={() => setRefreshData(!refreshData)} />
                </div>
            </div>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 ">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded " />
                                                <span>ID</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Name
                                        </th>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Description
                                        </th>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Price
                                        </th>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            ImgUrl
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Tags
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Stock
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Sold
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Rating
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            CategoryId
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Reviews
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {products.map((product) => (
                                        <TableRow product={product} key={product.id} setRefreshData={setRefreshData} refreshData={refreshData} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : null;
}

function TableRow({ product, setRefreshData, refreshData }: { product: Product; setRefreshData: (value: boolean) => void; refreshData: boolean }) {
    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded " />
                    <div className="flex items-center gap-x-2">
                        <h2 className="font-medium text-gray-800  ">{product.id}</h2>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <div className="flex items-center gap-x-2">
                        <h2 className="font-medium text-gray-800  ">{product.name}</h2>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{product.description}</td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{product.price}</td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{product.imgUrl}</td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{product.tags}</td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{product.stock}</td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{product.sold}</td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{product.rating}</td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{product.categoryId}</td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{product.reviews}</td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                {new Date(product.modified!).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })}
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                    <ModalConfirmDeleteProduct productId={product.id!} productName={product.name} onProductDeleted={() => setRefreshData(!refreshData)} />
                    <ModalUpdateProduct product={product} onProductUpdate={() => setRefreshData(!refreshData)} />
                </div>
            </td>
        </tr>
    );
}

export default ProductCrud;
