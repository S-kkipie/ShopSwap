import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/Interfaces/Product";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_URL;
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Category } from "@/Interfaces/Category";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function MyForm({ maxValue }: { maxValue: number }) {
    const formSchema = z.object({
        value: z
            .number()
            .max(maxValue, { message: "La cantidad no puede ser mayor a " + maxValue })
            .min(0, { message: "La cantidad no puede ser menor a 0" }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: 0,
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-8">
                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                                <div className="flex  gap-4 w-8/12">
                                    <Button className="bg-white shadow-none border rounded-sm  font-bold hover:text-white flex items-center justify-center border-primary text-black" type="button" onClick={() => field.onChange(Math.max(0, field.value - 1))}>
                                        -
                                    </Button>
                                    <Input
                                        type="number"
                                        readOnly
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            field.onChange(value === "" ? undefined : e.target.valueAsNumber);
                                        }}
                                    />
                                    <Button className="bg-white shadow-none border rounded-sm  font-bold hover:text-white flex items-center justify-center border-primary text-black" type="button" onClick={() => field.onChange(Math.min(maxValue, field.value + 1))}>
                                        +
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Add to Cart</Button>
            </form>
        </Form>
    );
}
function ProductDetails() {
    const param = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const { toast } = useToast();
    const [categoria, setCategoria] = useState<Category>();

    useEffect(() => {
        const fetchProduct = async function () {
            const response = await fetch(apiUrl + "/public/models/product/" + param.id);
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al cargar el producto.",
                    variant: "destructive",
                });
                navigate("/");
            } else {
                const data = await response.json();
                setProduct(data);
                const fetchCategory = async function () {
                    const response = await fetch(apiUrl + "/public/models/category/" + data.categoryId);
                    if (!response.ok) {
                        toast({
                            title: "Error",
                            description: "Ocurrió un error al cargar el producto.",
                            variant: "destructive",
                        });
                        navigate("/");
                    } else {
                        const data = await response.json();
                        setCategoria(data);
                    }
                };
                fetchCategory();
            }
        };
        fetchProduct();
    }, []);
    return (
        <div className="p-6">
            <Breadcrumb className="m-12">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={"/category/" + product?.categoryId}>{categoria?.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product ? product.name : "Producto"}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {product ? (
                <div className="flex mx-48 justify-between">
                    <div className=" w-5/12 shadow-md">
                        <img className="" src={product.imgUrl} alt={product.name} />
                    </div>
                    <div className="w-5/12">
                        <h1 className="text-3xl font-semibold">{product.name}</h1>
                        <div className="flex mt-5">
                            {Array.from({ length: product.rating }).map((_, i) => {
                                return (
                                    <span key={i}>
                                        <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="gold" stroke="gold" strokeWidth="1" />
                                        </svg>
                                    </span>
                                );
                            })}
                            {Array.from({ length: 5 - product.rating }).map((_, i) => {
                                return (
                                    <span key={i}>
                                        <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="black" fill="none" strokeWidth="1" />
                                        </svg>
                                    </span>
                                );
                            })}
                            {
                                //TODO add reviews
                            }
                            <span className="text-sm ml-2 text-gray-400">({product.reviews}) reviews</span>
                            <Separator className="h-auto ml-12" orientation="vertical" />
                            <div className="ml-12">
                                <span className="text-primary text-xl font-bold">{product.stock > 0 ? "In stock: " + product.stock : "Out of Stock"}</span>
                            </div>
                        </div>
                        <div className="mt-5">
                            <span className="text-3xl font-semibold ">${product.price}</span>
                        </div>
                        <div className="mt-5">
                            <span className="text-sm">{product.description}</span>
                            <div className="flex gap-3 my-5">
                                {product.tags?.split(",").map((e, i) => {
                                    return (
                                        <Badge key={i} variant="outline">
                                            {e}
                                        </Badge>
                                    );
                                })}
                            </div>
                            <Separator />
                            <div className="mt-8">
                                <MyForm maxValue={product.stock} />
                            </div>
                            <div className="mt-10">
                                <div className="border rounded-md p-4  flex flex-col gap-4">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h12l3 3h6v11a2 2 0 01-2 2H5a2 2 0 01-2-2V3z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-bold">Free Delivery</h3>
                                            <p>
                                                <a href="#" className="text-blue-500 underline">
                                                    Enter your postal code for Delivery Availability
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6h4M9 12h6M5 18h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-bold">Return Delivery</h3>
                                            <p>
                                                Free 30 Days Delivery Returns.{" "}
                                                <a href="#" className="text-blue-500 underline">
                                                    Details
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">Cargando...</div>
            )}
        </div>
    );
}

export default ProductDetails;