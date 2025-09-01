import productApi from "../api/productApi";

import { createSlice, createEntityAdapter, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

/**
 * Create entity adapter
 */
const cartAdapter = createEntityAdapter();

/**
 * Create the cart slice middlewares
 */

export const cartMiddleware = createListenerMiddleware()

/**
 * Inital state of the cart
 *
 * loads items from storage if exists
 */
const initialState = cartAdapter.getInitialState({
  items: localStorage.getItem("cart") ?? [],
  total: 0, // total amout
  quent: 0,
});

/**
 * Create cart slice
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // add new item to the cart
    addItem: (state, action) => {
      if (state.items[action.payload.id])
        state.items[action.payload.id].quent += action.payload.quent ?? 1;
      else state.items.push(action.payload);
    },
    // remove item from the cart
    removeItem: (state, action) => {

    },
    updateTotal: (state, action) => {state.total = action.payload}
  } 
});

/**
 * Export the cart slice actions
 */
export const {addItem, removeItem, updateTotal} = cartSlice.actions

/**
 * Listen for add/remove item actions in order to re-calculate
 * any fields that depend on the cart items list.
 */
cartMiddleware.startListening({
  matcher: isAnyOf(addItem, removeItem),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()

    const items = state.cart.items

    const newTotal = Object.values(items).map(item => item.price).reduce((a, b) => a + b)

    listenerApi.dispatch(updateTotal(newTotal))
  }
})

/**
 * The cart slice reducers
 * 
 * Exports as default
 */
export default cartSlice;