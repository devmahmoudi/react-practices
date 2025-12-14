/**
 * Product type
 */
export interface ProductType {
  id: number;
  name: string;
  img: string;
  price: number | Float32Array;
};

/**
 * Cart item type
 */
export interface CartItemType extends ProductType{
  quantity?: number;
}