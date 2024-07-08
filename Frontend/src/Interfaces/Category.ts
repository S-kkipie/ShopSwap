import { Product } from "./Product";

export interface Category {
    categoryID: number;
    name: string;
    description: string;
    adminID: number;
    modified: Date;
    products: Product[];
}