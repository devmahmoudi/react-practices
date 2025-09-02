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
 * Merge new item with existance if its id exists in the slice
 */
const mergeCartItemListener = store => next => action => {
  if(addItem.match(action)){
    const state = store.getState().cart

    if(state.ids.includes(action.payload.id)){
      // console.log(state.entities);
      

      let quent = state.entities[action.payload.id]?.quent ?? 1

      quent += 1

      console.log(quent);

      store.dispatch(updateItem({id:action.payload.id, changes: {...action.payload, quent}}))

      return
    }
  }

  action.payload = {...action.payload, quent: 1}

  return next(action)
}

/**
 * Export all middlewares in an array
 */
export const cartMiddlewares = [cartMiddleware.middleware, mergeCartItemListener]

/**
 * The cart slice reducers
 * 
 * Exports as default
 */
export default cartSlice;