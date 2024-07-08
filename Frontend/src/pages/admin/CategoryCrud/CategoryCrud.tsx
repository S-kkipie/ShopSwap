import { useAppSelector } from "@/store/hooks.ts";
import { useEffect, useState } from "react";
import ModalUpdateUser from "@/pages/admin/UsersCrud/modals/ModalUpdateUser";
import { useToast } from "@/components/ui/use-toast";
import { Category } from "@/Interfaces/Category";
import ModalAddCategory from "./modals/ModalAddCategory";
import ModalConfirmDeleteCategory from "./modals/ModalConfirmDeleteCategory";
import ModalUpdateCategory from "./modals/ModalUpdateCategory";
const apiUrl = import.meta.env.VITE_BASE_URL;

function CategoryCrud() {
    const [refreshData, setRefreshData] = useState(false);
    const { userData, accessToken } = useAppSelector((state) => state.authReducer);
    const [categories, setCategories] = useState<Category[]>([]);
    const { toast } = useToast();
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${apiUrl}/u/models/category/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!res.ok) {
                toast({
                    title: "Ocurrio un error al recibir las categorias.",
                    variant: "destructive",
                });
            } else {
                const data = await res.json();
                setCategories(data);
                console.log(data);
            }
        };
        fetchData();
    }, [refreshData]);
    return userData!.role == "ADMIN" ? (
        <section className="container px-4 mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center mt-4 gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 ">Categories</h2>
                    <span className="px-3 py-1 text-xs text-white bg-primary rounded-full ">{categories.length}</span>
                </div>
                <div className="flex items-center mt-4 gap-x-3">
                    <ModalAddCategory onCategoryAdded={() => setRefreshData(!refreshData)} />
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
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            ID del Editor
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Description
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Fecha de modificacion
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {categories.map((category) => (
                                        <TableRow category={category} key={category.categoryID} setRefreshData={setRefreshData} refreshData={refreshData} />
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

function TableRow({ category, setRefreshData, refreshData }: { category: Category; setRefreshData: (value: boolean) => void; refreshData: boolean }) {
    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded " />
                    <div className="flex items-center gap-x-2">
                        <h2 className="font-medium text-gray-800  ">{category.categoryID}</h2>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <div className="flex items-center gap-x-2">
                        <h2 className="font-medium text-gray-800  ">{category.name}</h2>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{category.adminID}</td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{category.description}</td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                {new Date(category.modified).toLocaleString("es-ES", {
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
                    <ModalConfirmDeleteCategory categoryId={category.categoryID} categoryName={category.name} onCategoryDeleted={() => setRefreshData(!refreshData)} />
                    <ModalUpdateCategory categoryToUpdate={category} onCategoryUpdated={() => setRefreshData(!refreshData)} />
                </div>
            </td>
        </tr>
    );
}

export default CategoryCrud;
