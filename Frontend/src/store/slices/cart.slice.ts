import { toast } from "@/components/ui/use-toast";
import { Product } from "@/Interfaces/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductInCart {
    product: Product;
    quantity: number;
}
interface CartState {
    products: ProductInCart[];
}

const initialState: CartState = {
    products: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem(state, action: PayloadAction<ProductInCart>) {
        const newItem = action.payload;
        const existingItem = state.products.find(
          (item) => item.product.id === newItem.product.id
        );
        if (existingItem) {
            existingItem.quantity = newItem.quantity;
            toast({
                title: newItem.product.name +" modificado",
                description: "Se modifico la cantidad del producto en el carrito.",
                variant: "success",
              });
        } else {
          state.products.push(newItem);
          toast({
            title: newItem.product.name +" añadido",
            description: "El producto se ha añadido al carrito.",
            variant: "success",
          });
        }
      },
      removeItem(state, action: PayloadAction<string>) {
        const id = action.payload;
        console.log(id);
        state.products = state.products.filter(
          (item) => item.product.id!.toString() !== id
        );
        console.log(state.products);
      },
      clearCart(state) {
        state.products = [];
      },
    },
  });
  
  export const { addItem, removeItem, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;