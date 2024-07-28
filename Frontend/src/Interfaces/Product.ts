export interface Product {
    id: number | null; 
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    tags: string;
    stock: number;
    sold: number;
    rating: number;
    categoryId: number | null;
    reviews: number | null;
    modified: Date | null; 
    created: Date | null; 
}
