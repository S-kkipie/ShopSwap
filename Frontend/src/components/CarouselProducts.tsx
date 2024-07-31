import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Product } from "@/Interfaces/Product";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function CarouselProducts({ products }: { products: Product[] }) {
    return (
        <Carousel className="w-full">
            <div className="absolute left-14 w-12">
                <CarouselPrevious className="  " />
                <CarouselNext className="" />
            </div>
            <CarouselContent className="-ml-4 w-96 my-5  py-3 ">
                {products.map((product, i) => (
                    <CarouselItem className="ml-3 " key={i}>
                        <Card className="transition-all h-full hover:shadow-xl flex flex-col justify-between">
                            <CardHeader>
                                <img src={product.imgUrl} alt={product.name} className="object-cover" />
                            </CardHeader>
                            <CardContent className="mt-auto flex flex-col gap-2">
                                <p className="text-3xl font-semibold">{product.name}</p>
                                <div className="flex items-center justify-between">
                                    <Rating style={{ maxWidth: 150 }} value={product.rating} readOnly />
                                    <span className="text-sm ml-2 text-gray-400">({product.reviews}) reviews</span>
                                    <span className="text-primary text-xl font-bold">${product.price}</span>
                                </div>
                                <CardDescription>
                                    <h1>{product.description}</h1>
                                    <div className="flex gap-3 mt-5">
                                        {product.tags?.split(",").map((e, i) => {
                                            return (
                                                <Badge key={i} variant="outline">
                                                    {e}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardDescription>
                                <Link to={"/product/" + product.id} className="flex transition-all duration-200 items-center justify-center py-2 rounded bg-primary mt-5 text-white w-full font-semibold hover:-translate-y-1">
                                    View Details
                                </Link>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

export default CarouselProducts;
