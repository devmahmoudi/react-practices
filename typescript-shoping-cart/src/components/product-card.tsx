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
  return <div className="card">
    <img src={product.img} alt={product.name} className="card-image"/>
    <h2 className="card-title">{product.name}</h2>
    <p>Price: ${product.price.toFixed(2)}</p>
    <div className="card-actions">
      <button>Add to cart</button>
    </div>
  </div>;
}

export default ProductCard;