import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./slice/cartSlice";

function App() {
  const dispatch = useDispatch()

  const [count, setCount] = useState(0);

  const products = useSelector((state) => state.products);

  const addToCart = (product) => {
    dispatch(addItem(product))
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Price</th>
            <th className="p-3">Add</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(products.entities).map((product) => {
            return (
              <tr key={product.id}>
                <td className="p-3">{product.title}</td>
                <td className="p-3">{product.price}</td>
                <td className="p-3">
                  <button onClick={() => addToCart(product)}>
                    Add To Cart
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
