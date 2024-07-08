import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/Interfaces/Product";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";

function ProductCard({ product, onProductAdded}: {product: Product, onProductAdded: () => void}) {
    const { name, description, price, imgUrl, tags, stock} = product;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="w-72 cursor-pointer transition hover:-translate-y-1 hover:shadow-2xl">
                    <CardHeader>
                        <CardTitle>
                            <img className="w-72 " src={imgUrl} />
                        </CardTitle>
                        <CardDescription>S/. {price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h1 className="font-bold text-xl mb-2">{name}</h1>
                        <h1>{description}</h1>
                        <p className="mt-2 font-semibold">Disponible: {stock}</p>
                    </CardContent>
                    <CardFooter className="flex gap-3">
                        {tags?.split(",").map((e, i) => {
                            return (
                                <Badge key={i} variant="outline">
                                    {e}
                                </Badge>
                            );
                        })}
                    </CardFooter>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[435px]">
                <DialogHeader>
                    <DialogTitle>Editar el producto</DialogTitle>
                </DialogHeader>
                <ModalUpdateProduct product={product}  onProductAdded={onProductAdded}/>
            </DialogContent>
        </Dialog>
    );
}

export default ProductCard;
