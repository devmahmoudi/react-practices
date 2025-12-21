import { useState, type ReactElement } from "react";
import Cart from "./components/cart";
import ProductList from "./components/product-list";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.css";
import { CartProvider } from "./contexts/cart-context";
import { ProductsProvider } from "./contexts/products-context";

function App() {
  /**
   * Define state of show cart
   */
  const [showCart, setShowCart] = useState<boolean>(false);

  /**
   * Body content
   */
  const body: ReactElement = showCart ? <Cart /> : <ProductList />;

  /**
   * Main content
   */
  const content: ReactElement = (
    <div className="container">
      <CartProvider>
        <ProductsProvider>
          <Header showCart={showCart} setShowCart={setShowCart} />
          <div className="container body-content">{body}</div>
        </ProductsProvider>
      </CartProvider>

      <Footer />
    </div>
  );

  return content;
}

export default App;
