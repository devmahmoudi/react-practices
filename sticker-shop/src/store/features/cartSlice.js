
import {
  createEntityAdapter,
  createListenerMiddleware,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

/**
 * Create entity adapter
 */
const cartAdapter = createEntityAdapter();

/**
 * Create the cart slice middlewares
 */

export const cartMiddleware = createListenerMiddleware();

/**
 * Inital state of the cart
 *
 * loads items from storage if exists
 */
const storedCart = localStorage.getItem("cart") ?? null;

const initialState = cartAdapter.getInitialState(
  storedCart
    ? JSON.parse(storedCart)
    : {
        total: 0, // total amout
      }
);

/**
 * Create cart slice
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // add new item to the cart
    addItem: (state, action) => {
      // define default quent = 1 if there is no in the action payload
      if(!action.payload.quent)
        action.payload.quent = 1

      // updating item quent if it is already added
      if(state.ids.includes(action.payload.id)){
        cartAdapter.updateOne(state, {id: action.payload.id, changes: {quent: (state.entities[action.payload.id].quent + action.payload.quent)}})

        return
      }

      cartAdapter.addOne(state, action.payload)
    },
    // update item
    updateItem: cartAdapter.updateOne,
    // remove item from the cart
    removeItem: cartAdapter.removeOne,
    // update cart total
    updateTotal: (state, action) => {
      state.total = Object.values(state.entities)
        .map((item) => item.price * item.quent)
        .reduce((a, b) => a + b, 0);
    },
  },
});

/**
 * Export the cart slice actions
 */
export const { addItem, updateItem, removeItem, updateTotal } =
  cartSlice.actions;

/**
 * Listen for add/remove item actions in order to re-calculate
 * any fields that depend on the cart items list.
 */
cartMiddleware.startListening({
  matcher: isAnyOf(addItem, removeItem),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();

    const items = Object.values(state.cart.entities);

    const newTotal = items.length ?
      items.map((item) => item.price * item.quent)
      .reduce((a, b) => a + b) : 0;

    listenerApi.dispatch(updateTotal(newTotal));
  },
});

/**
 * store cart to local storage in every changes to make it persist
 */
cartMiddleware.startListening({
  matcher: (action) => action.type.startsWith("cart/"),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState().cart;

    localStorage.setItem("cart", JSON.stringify(state));
  },
});

/**
 * Export all middlewares in an array
 */
export const cartMiddlewares = [
  cartMiddleware.middleware
];

/**
 * The cart slice reducers
 *
 * Exports as default
 */
export default cartSlice;