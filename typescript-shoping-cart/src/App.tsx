import { useState } from "react";
import Cart from "./components/cart";
import ProductList from "./components/product-list";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';

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
    <div className="container">
        <Header viewCart={viewCart} setViewCart={setViewCart}/>
        <div className="container body-content">
          {body}
        </div>
        <Footer viewCart={viewCart}/>
    </div>
  )

  return content;
}

export default App;
