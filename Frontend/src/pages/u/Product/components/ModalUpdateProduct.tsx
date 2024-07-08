import { z } from "zod";
import { set, useForm } from "react-hook-form";
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
    stock: z.string().refine((val) => !val.includes(".") && parseInt(val) > 1, {
        message: "Debes ingresar un número entero y positivo.",
    }),
    category: z.string().refine((val) => !val.includes("."), {
        message: "Debes seleccionar una categoria.",
    }),
});
function EditProductForm({ onProductAdded, product }: { onProductAdded: () => void, product: Product }) {
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
            category: product.category?.toString(),
        },
    });
    const {reset} = form;
    const [categories, setCategories] = useState<Category[]>([]);
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
                reset({
                    category: data[0].categoryID.toString(),
                });
                setCategories(data);
                console.log(categories);
                console.log(data);
            }
        };
        fetchData();
    }, []);
    function onSubmit(values: z.infer<typeof formSchema>) {
        let data: {
            product: Product;
            category: number;
        } = {
            product: {
                ...values,
                sold: 0,
                rating: 0,
                category: null,
                price: parseFloat(values.price),
                tags: values.tags!,
                stock: parseInt(values.stock),
            },
            category: parseInt(values.category),
        };
        console.log(data);
        const fetchData = async () => {
            const response = await fetch(apiUrl + "/u/models/product/update", {
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
                                                        <SelectItem key={category.categoryID} value={category.categoryID + ""}>
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
function ModalUpdateProduct({product, onProductAdded}: {product: Product, onProductAdded: () => void}){
    return (
        <EditProductForm onProductAdded={onProductAdded} product={product}/>
    );
}

export default ModalUpdateProduct;
