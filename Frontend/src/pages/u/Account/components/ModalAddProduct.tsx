import { z } from "zod";
import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { useAppSelector } from "@/store/hooks.ts";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast.ts";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/Interfaces/Category";
import { Product } from "@/Interfaces/Product";

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
    category: z.string().refine((val) => !val.includes("."), {
        message: "Debes seleccionar una categoria.",
    }),
});

function AddProductForm({ onProductAdded }: { onProductAdded: () => void }) {
    const { accessToken } = useAppSelector((state) => state.authReducer);
    const { toast } = useToast();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            imgUrl: "",
            price: "0.0",
            tags: "",
            stock: "0",
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
                console.log(data);
            }
        };
        fetchData();
    }, []);

    function onSubmit(values: z.infer<typeof formSchema>) {
        let data: {
            product: Product;
            categoryId: number;
        } = {
            product: {
                ...values,
                reviews: null,
                id: null,
                sold: 0,
                rating: 0,
                categoryId: null,
                price: parseFloat(values.price),
                tags: values.tags!,
                stock: parseInt(values.stock),
                userId: null,
                modified: null,
                created: null
            },
            categoryId: parseInt(values.category),
        };
        console.log(data);
        const fetchData = async () => {
            const response = await fetch(apiUrl + "/u/models/product/create", {
                method: "POST",
                body: JSON.stringify(data),
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
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Selecciona una categoria" />
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
                <Button type="submit">Añadir producto</Button>
            </form>
        </Form>
    );
}
function ModalAddProduct({ onProductAdded }: { onProductAdded: () => void }){
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center justify-center  px-5 py-2 text-sm  text-white transition-colors duration-200 bg-primary rounded-lg  w-auto gap-x-2 hover:bg-primary/90">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Agregar Producto</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[435px]">
                <DialogHeader>
                    <DialogTitle>Añadir un nuevo producto</DialogTitle>
                </DialogHeader>
                <AddProductForm onProductAdded={onProductAdded} />
            </DialogContent>
        </Dialog>
    );
}

export default ModalAddProduct;
