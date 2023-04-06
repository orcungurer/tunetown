import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  productDetails: null,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
    showProductDetails(state, action) {
      state.productDetails = action.payload;
    },
    hideProductDetails(state) {
      state.productDetails = null;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification(state) {
      state.notification = null;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
