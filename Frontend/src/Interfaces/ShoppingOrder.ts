import { Product } from "./Product";

export interface ShoppingOrder {
    id:          number;
    sellerIds:   number[];
    customerId:  number;
    orderProducts:    ProductOrder[];
    finalAmount: number;
    created:     Date;
    modified:    Date;
}

export interface ProductOrder {
    product: Product;
    quantity: number;
}