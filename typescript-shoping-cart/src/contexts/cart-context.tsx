import { createContext } from "react";
import type { CartItemType, ProductType } from "../types";

/**
 * Cart context type
 */
type CartStateType = { items: CartItemType[] };

/**
 * Cart context
 */
export const CartContext = createContext<CartStateType>({ items: [] });

/**
 * Cart action types
 */
const ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

/**
 * Cart action type
 */
export type CartActionType = typeof ACTION_TYPE;

/**
 * Cart action
 */
export type CartAction = {
  type: string;
  payload?: CartItemType;
};

/**
 * reducer function
 * @param state cart state
 * @param action
 */
const reducer = (state: CartStateType, action: CartAction): CartStateType => {
  if (action.type !== ACTION_TYPE.SUBMIT && !action.payload) {
    throw new Error(
      `Cart action payload is missing. Action type: ${action.type}`
    );
  }

  switch (action.type) {
    case ACTION_TYPE.ADD || ACTION_TYPE.QUANTITY:
      const product = action.payload as CartItemType;
      const quantity =
        product.quantity ??
        ((state.items.find((item) => item.id === product.id)?.quantity ?? 0) +
          1 ||
          1);
      return {
        ...state,
        items: [...state.items, { ...product, quantity }],
      };
    case ACTION_TYPE.REMOVE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload?.id),
      };
    case ACTION_TYPE.SUBMIT:
      return { ...state, items: [] };
    default:
      throw new Error(`Undefined action type: ${action.type}`);
  }
};
