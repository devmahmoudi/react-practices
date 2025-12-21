import { useCart } from "../contexts/cart-context";
import type { ProductType } from "../types";

/**
 * Props for ProductCard component
 */
interface ProductCardProps {
  product: ProductType
}

/**
 * ProductCard Component
 * @returns 
 */
const ProductCard = ({product} : ProductCardProps) => {
  /**
   * Use product context hook
   */
  const {dispatch, actions} = useCart()

  /**
   * Add to cart handler
   */
  const addToCartHandler = () => {
    if(actions?.ADD && dispatch)
      dispatch({type: actions.ADD, payload: product})
  }

  return <div className="card">
    <img src={product.img} alt={product.name} className="card-image"/>
    <h2 className="card-title">{product.name}</h2>
    <p>Price: ${product.price.toFixed(2)}</p>
    <div className="card-actions">
      <button onClick={addToCartHandler}>Add to cart</button>
    </div>
  </div>;
}

export default ProductCard;