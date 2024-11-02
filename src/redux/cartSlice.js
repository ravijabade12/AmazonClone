import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsNumber: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //check if the product is already in the cart
      const addProductExists = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (addProductExists) {
        addProductExists.quantity += parseInt(action.payload.quantity);
      } else {
        state.products.push(action.payload);
      }
      state.productsNumber += parseInt(action.payload.quantity);
    },
    removeFromCart: (state, action) => {
      //find the product removing from the array
      const productToRemove = state.products.find(
        (product) => product.id === action.payload
      );

      //remove the quantity from the product number
      state.productsNumber = state.productsNumber - productToRemove.quantity;

      //find the index of the product to removing
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products.splice(index, 1);
    },

    incrementInCart: (state, action) => {
      const itemInc = state.products.find((item) => item.id === action.payload);
      if (itemInc) {
        itemInc.quantity = Number(itemInc.quantity) + 1; // Force number conversion
        state.productsNumber = Number(state.productsNumber) + 1; // Force number conversion
      }
    },
    decrementInCart: (state, action) => {
      const itemDec = state.products.find((item) => item.id === action.payload);
      if (itemDec.quantity === 1) {
        const index = state.products.findIndex(
          (item) => item.id === action.payload
        );
        state.products.splice(index, 1);
      } else {
        itemDec.quantity--;
      }
      state.productsNumber -= 1;
    },
  },
});

export const { addToCart, removeFromCart, incrementInCart, decrementInCart } =
  cartSlice.actions;
export default cartSlice.reducer;
