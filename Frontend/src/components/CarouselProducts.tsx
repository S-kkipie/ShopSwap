import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Product } from "@/Interfaces/Product";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
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
                                    {
                                        //TODO add rating
                                    }
                                    <div className="flex ">
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
                                    </div>
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
