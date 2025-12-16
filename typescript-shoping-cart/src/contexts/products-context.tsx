import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
} from "react";
import type { ProductType } from "../types";

/**
 * Product context type
 */
export type ProductContextType = {
  products: ProductType[];
};

/**
 * Product context
 */
const ProductsContext = createContext<ProductContextType>({ products: [] });

/**
 * Product context provider
 */
export const ProductsProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  /**
   * Products state
   */
  const [products, setProducts] = useState<ProductType[]>([]);

  /**
   * Fetcing products from server
   */
  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      return await axios
        .get("http://localhost:3000/products")
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error(error);

          return [];
        });
    };

    fetchProducts().then((res) => setProducts(res));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

/**
 * Products context hook
 */
export function useProducts(): ProductContextType {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}