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
    addItem: cartAdapter.addOne,
    // update item
    updateItem: cartAdapter.updateOne,
    // remove item from the cart
    removeItem: cartAdapter.removeOne,
    // update cart total
    updateTotal: (state, action) => {state.total = action.payload}
  } 
});

/**
 * Export the cart slice actions
 */
export const {addItem, updateItem, removeItem, updateTotal} = cartSlice.actions

/**
 * Listen for add/remove item actions in order to re-calculate
 * any fields that depend on the cart items list.
 */
cartMiddleware.startListening({
  matcher: isAnyOf(addItem, removeItem),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()

    const items = state.cart.entities

    const newTotal = Object.values(items).map(item => item.price).reduce((a, b) => a + b)

    listenerApi.dispatch(updateTotal(newTotal))
  }
})

/**
 * Enrichment item when adds to the cart
 * 
 * Add some extra fileds which aren't exists in the original item
 * for example 'quent'
 */
cartMiddleware.startListening({
  matcher: isAnyOf(addItem),
  effect: (action, listenerApi) => {
    let item = {...action.payload}

    item.quent = 1

    listenerApi.dispatch(updateItem({id: item.id, changes: item}))
  }
})

/**
 * The cart slice reducers
 * 
 * Exports as default
 */
export default cartSlice;