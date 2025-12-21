import { createContext, useContext, useEffect, useReducer } from "react";
import type { CartItemType } from "../types";

/**
 * Cart context type
 */
type CartStateType = {
  items: CartItemType[];
  dispatch?: React.Dispatch<CartAction>;
  actions?: CartActionType;
  totalItems?: number;
  totalPrice?: number;
  formatedTotalPrice?: string;
};

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

  var product: CartItemType
  var item: any

  switch (action.type) {
    case ACTION_TYPE.ADD:
      product = action.payload as CartItemType;
      item = state.items.find((i) => i.id === product.id) ?? null;
      if (item)
        // Increment item quentity if already added into the cart items
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...item, quantity: (item.quantity ?? 1) + 1 }
              : i
          ),
        };
      // add new product into the cart items when the product wasn't added
      else
        return {
          ...state,
          items: [...state.items, { ...product, quantity: 1 }],
        };
    case ACTION_TYPE.QUANTITY:
      product = action.payload as CartItemType;
      item = state.items.find(i => i.id === product.id)
      if(!item)
        throw Error(`Increment of have not been added product with ${product.id} id`)
      if(!product.quantity)
        throw Error(`Quantity wasn't defined !`)
      return {
        ...state, 
        items: state.items.map(i => i.id === item.id ? {...item, quantity: product.quantity} : i)
      }
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

/**
 * Cart provider
 */
export const CartProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  /**
   * Cart state
   */
  const [state, dispatch] = useReducer(reducer, { items: [] });

  /**
   * Reducer actions
   */
  const actions: CartActionType = ACTION_TYPE;

  /**
   * Total items in cart
   */
  const totalItems = state.items.reduce(
    (total, item) => total + (item.quantity ?? 1),
    0
  );

  /**
   * Total price of items in cart
   */
  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

  /**
   * Formatted total price
   */
  const formatedTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  /**
   * Render
   */
  return (
    <CartContext.Provider
      value={{
        ...state,
        dispatch,
        actions,
        totalItems,
        totalPrice,
        formatedTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * useCart hook
 */
export function useCart(): CartStateType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
