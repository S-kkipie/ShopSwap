import { toast, useToast } from "@/components/ui/use-toast";
import { Product } from "@/Interfaces/Product";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { useAppSelector } from "@/store/hooks";
import User from "@/Interfaces/User";
import CarouselProducts from "@/components/CarouselProducts";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/cart.slice";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
function MyForm({ maxValue, product }: { maxValue: number; product: Product }) {
    const { isAuth } = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const formSchema = z.object({
        value: z
            .number()
            .max(maxValue, { message: "La cantidad no puede ser mayor a " + maxValue })
            .min(1, { message: "La cantidad no puede ser menor a 0" }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: 0,
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (isAuth) {
            const data = {
                product: product,
                quantity: values.value,
            };
            dispatch(addItem(data));
            console.log(data);
        } else {
            toast({
                title: "Inicia sesion para continuar",
                description: "Debes iniciar sesión para poder comprar",
                variant: "destructive",
            });
        }
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
    const { accessToken } = useAppSelector((state) => state.authReducer);
    const [isRated, setIsRated] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const { toast } = useToast();
    const { isAuth, userData } = useAppSelector((state) => state.authReducer);
    const [categoria, setCategoria] = useState<Category>();
    const [productUser, setProductUser] = useState<User>();
    const [productsOfCategory, setProductsOfCategory] = useState<Product[]>([]);
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
                        const fetchProducts = async function () {
                            const response = await fetch(apiUrl + "/public/models/product/findByCategory/" + data.id);
                            if (!response.ok) {
                                toast({
                                    title: "Error",
                                    description: "Ocurrió un error al cargar los productos",
                                    variant: "destructive",
                                });
                            } else {
                                const data = await response.json();
                                setProductsOfCategory(data);
                            }
                        };
                        fetchProducts();
                        setCategoria(data);
                    }
                };
                const fetchUser = async function () {
                    const response = await fetch(apiUrl + "/public/models/user/" + data.userId);
                    if (!response.ok) {
                        toast({
                            title: "Error",
                            description: "Ocurrió un error al cargar el producto.",
                            variant: "destructive",
                        });
                        navigate("/");
                    } else {
                        const data = await response.json();
                        setProductUser(data);
                        window.scrollTo(0, 0);
                    }
                };
                fetchUser();
                fetchCategory();
            }
        };
        fetchProduct();
    }, [param]);
    function onRatingChange(value: number) {
        console.log(isRated);
        if (!isAuth) {
            toast({
                title: "Inicia sesion para continuar",
                description: "Debes iniciar sesión para poder calificar el producto",
                variant: "destructive",
            });
            return;
        }
        if (isRated) {
            toast({
                title: "Ya has calificado este producto",
                description: "No puedes calificar el producto dos veces",
                variant: "destructive",
            });
            return;
        }
        const fetchRating = async function () {
            const response = await fetch(apiUrl + "/u/models/product/addReview", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    productId: product?.id,
                    rating: value,
                }),
            });
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Ocurrió un error al calificar el producto.",
                    variant: "destructive",
                });
            } else {
                const data = await response.json();
                setProduct(data);
                console.log(data);
                toast({
                    title: "Calificacion exitosa",
                    description: "Gracias por calificar el producto",
                    variant: "success",
                });
                setIsRated(true);
            }
        };
        fetchRating();
        console.log(value);
    }
    return (
        <div className="p-6">
            <Breadcrumb className="mx-12 mb-12">
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
                <div className="flex lg:mx-48  justify-between">
                    <div className=" w-5/12 min-w-[500px] shadow-md">
                        <img className="" src={product.imgUrl} alt={product.name} />
                    </div>
                    <div className="w-5/12 min-w-[500px]">
                        <h1 className="text-3xl font-semibold">{product.name}</h1>
                        <Link to={"/user/" + product.userId} className="transition-all textlgl hover:text-primary ">
                            Vendedor: {productUser?.username}
                        </Link>
                        <div className="flex mt-5">
                            <Rating style={{ maxWidth: 150 }} value={Math.round(product.rating)} onChange={onRatingChange} />
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
                                <MyForm maxValue={product.stock} product={product!} />
                            </div>
                            <div className="mt-10">
                                <div className="border rounded-md p-4  flex flex-col gap-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h12l3 3h6v11a2 2 0 01-2 2H5a2 2 0 01-2-2V3z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-bold">Delivery</h3>
                                            <p>{isAuth && userData?.city === productUser?.city ? "Delivery gratis para usuarios de la misma zona" : userData?.country === productUser?.country ? "Delivery a 50$ para usuarios del mismo país" : "Delivery a 300$ para usuarios de todo el mundo"}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6h4M9 12h6M5 18h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-bold">Devoluciones</h3>
                                            <p>
                                                {isAuth && userData?.city === productUser?.city ? "Devolucion sin problemas para usuarios de la misma zona" : userData?.country === productUser?.country ? "Devolucion legal para usuarios del mismo pais" : "No se aceptan devoluciones en productos internacionales"}
                                                <Link to="/devoluciones" className="ml-2 text-blue-500 underline">
                                                    Details
                                                </Link>
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
            <Separator className="my-12" />
            <div className="mx-12">
                <h1 className="text-2xl mb-8 text-primary font-bold flex items-center">
                    <div className="bg-primary w-3 h-10 rounded mr-3"></div>Productos Relacionados
                </h1>
                <div className="flex gap-8">
                    <CarouselProducts products={productsOfCategory} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
