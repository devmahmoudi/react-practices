/**
 * Product type
 */
export interface ProductType {
  id: number;
  name: string;
  img: string;
  price: number;
};

/**
 * Cart item type
 */
export interface CartItemType extends ProductType{
  quantity?: number;
}