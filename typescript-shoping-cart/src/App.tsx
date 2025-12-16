import { useState } from "react";
import { useProducts } from "./contexts/products-context";
import Cart from "./components/cart";
import ProductList from "./components/product-list";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  /**
   * Define state of show cart
   */
  const [viewCart, setViewCart] = useState<boolean>(false);

  /**
   * Body content
   */
  const body = viewCart ? <Cart/> : <ProductList />;

  const content = (
    <div>
        <Header viewCart={viewCart} setViewCart={setViewCart}/>
        {body}
        <Footer viewCart={viewCart}/>
    </div>
  )

  return content;
}

export default App;
