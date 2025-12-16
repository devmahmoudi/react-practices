import { useState, type ReactElement } from "react";
import Cart from "./components/cart";
import ProductList from "./components/product-list";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';

function App() {
  /**
   * Define state of show cart
   */
  const [showCart, setShowCart] = useState<boolean>(false);

  /**
   * Body content
   */
  const body: ReactElement = showCart ? <Cart/> : <ProductList />;

  /**
   * Main content
   */
  const content: ReactElement = (
    <div className="container">
        <Header showCart={showCart} setShowCart={setShowCart}/>
        <div className="container body-content">
          {body}
        </div>
        <Footer/>
    </div>
  )

  return content;
}

export default App;
