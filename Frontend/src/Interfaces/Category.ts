import { Product } from "./Product";

export interface Category {
    id: number;
    name: string;
    description: string;
    adminID: number;
    modified: Date;
    products: Product[];
}