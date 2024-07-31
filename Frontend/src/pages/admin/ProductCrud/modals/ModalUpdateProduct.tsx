import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { DialogClose } from "@/components/ui/dialog.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { useAppSelector } from "@/store/hooks.ts";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast.ts";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/Interfaces/Product";
import { Category } from "@/Interfaces/Category";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";

import ModalConfirmDeleteProduct from "./ModalDeleteProduct";

const apiUrl = import.meta.env.VITE_BASE_URL;
const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    description: z
        .string()
        .min(10, {
            message: "La descripcion debe tener al menos 10 caracteres.",
        })
        .max(160, {
            message: "La descripcion debe tener menos de 160 caracteres.",
        }),
    imgUrl: z.string().startsWith("https://", {
        message: "Debes ingresar una URL válida.",
    }),
    price: z.string().refine((val) => !isNaN(parseFloat(val)), {
        message: "Debes ingresar un número.",
    }),
    tags: z.string().optional(),
    stock: z.string().refine((val) => !val.includes(".") && parseInt(val) >= 1, {
        message: "Debes ingresar un número entero y positivo.",
    }),
    categoryId: z.string().refine((val) => !val.includes("."), {
        message: "Debes seleccionar una categoria.",
    }),
});
function EditProductForm({ onProductAdded, product }: { onProductAdded: () => void; product: Product }) {
    console.log(product);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { accessToken } = useAppSelector((state) => state.authReducer);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            imgUrl: product.imgUrl,
            price: product.price.toString(),
            tags: product.tags,
            stock: product.stock.toString(),
            categoryId: product.categoryId?.toString(),
        },
    });
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${apiUrl}/public/models/category/all`, {
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
            }
        };
        fetchData();
    }, []);
    function onSubmit(values: z.infer<typeof formSchema>) {
        let productData: Product = {
            ...values,
            id: product.id,
            reviews: 0,
            sold: 0,
            rating: 0,
            categoryId: null,
            price: parseFloat(values.price),
            tags: values.tags!,
            stock: parseInt(values.stock),
            modified: null,
            created: null,
            userId: null
        };
        console.log(productData);
        const fetchData = async () => {
            const response = await fetch(apiUrl + "/admin/models/product/update/" + values.categoryId, {
                method: "PUT",
                body: JSON.stringify(productData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                const message = await response.text();
                toast({
                    description: message,
                    variant: "destructive",
                });
            } else {
                onProductAdded();
                if (buttonRef.current) {
                    buttonRef.current.click();
                }
                const message = await response.text();
                toast({
                    description: message,
                    variant: "success",
                });
            }
        };
        fetchData();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el nombre del producto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripcion</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Escribe una breve descripcion del producto" className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imgUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Url de la imagen del producto</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Pega la url de la imagen del producto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-5 justify-between">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Ingresa el precio de tu producto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cantidad</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Ingresa la cantidad de productos" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-5">
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Escribe tus etiquetas" {...field} />
                                </FormControl>
                                <p className="text-gray-400 text-sm">Separa las etiquetas con comas: XL, Usado, Reparado</p>
                                <DialogClose asChild>
                                    <Button ref={buttonRef} className="hidden" type="button"></Button>
                                </DialogClose>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Selecciona una categoria"></SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {categories.map((category) => {
                                                    return (
                                                        <SelectItem key={category.id} value={category.id + ""}>
                                                            {category.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between">
                    <Button type="submit">Actualizar Producto</Button>
                    <ModalConfirmDeleteProduct productId={product.id!} productName={product.name} onProductDeleted={onProductAdded} />
                </div>
            </form>
        </Form>
    );
}
function ModalUpdateProduct({ product, onProductUpdate }: { product: Product; onProductUpdate: () => void }) {
    return (
        <Dialog>
            <DialogTrigger className="text-gray-500 transition-colors duration-200  hover:text-yellow-500 focus:outline-none cursor-pointer" asChild>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar el usuario</DialogTitle>
                </DialogHeader>
                <EditProductForm onProductAdded={onProductUpdate} product={product}  />
            </DialogContent>
        </Dialog>
    );
}

export default ModalUpdateProduct;
