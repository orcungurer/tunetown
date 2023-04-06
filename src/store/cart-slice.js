import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      if (state.totalQuantity === 9) {
        return;
      }
      const newItem = action.payload;
      state.totalQuantity++;
      state.totalPrice = state.totalPrice + newItem.price;
      state.changed = true;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          band: newItem.band,
          album: newItem.album,
          price: newItem.price,
          total: newItem.price,
          quantity: 1
        });
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + existingItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      state.changed = true;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalPrice = state.totalPrice - existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
    },
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.changed = true;
    },
  },
});

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://react-http-abb38-default-rtdb.europe-west1.firebasedatabase.app/music.json");
  
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
  
      const data = await response.json();
  
      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
        totalPrice: cartData.totalPrice,
      }));
    } catch (error) {
      // todo: dispatch notification error
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    // todo: dispatch notification pending

    const sendRequest = async () => {
      const response = await fetch("https://react-http-abb38-default-rtdb.europe-west1.firebasedatabase.app/music.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      
      if (!response.ok) {
        throw new Error("Could not send cart data.");
      }
    };

    try {
      await sendRequest();
      // todo: dispatch notification success
    } catch (error) {
      // todo: dispatch notification error
    }
  };
};

export const sendOrderData = (order) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: "pending",
      title: "Pending...",
      message: "Sending order data...",  
    }));

    const sendOrder = async () => {
      const response = await fetch("https://react-http-abb38-default-rtdb.europe-west1.firebasedatabase.app/musicOrders.json", {
        method: "POST",
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Could not send order data.");
      }
    };
    
    try {
      await sendOrder();
      dispatch(uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent order data successfully. Though, you will never receive the items.",
      }))
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending order data failed!",
      }));
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;