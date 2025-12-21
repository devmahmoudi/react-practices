import {
  useProducts,
  type ProductContextType,
} from "../contexts/products-context";
import ProductCard from "./product-card";

/**
 * ProductList Component
 * @returns
 */
const ProductList = () => {
  /**
   * Getting products from context
   */
  const { products }: ProductContextType = useProducts();

  return (
    <div className="product-list-container">
      {products.map((product) => (
        <ProductCard product={product} key={product.id}/>
      ))}
    </div>
  );
};

export default ProductList;
