export interface Product {
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    tags: string;
    stock: number;
    sold: number;
    rating: number;
    category: number | null;
}