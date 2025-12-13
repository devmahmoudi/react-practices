import { useProducts } from "./contexts/products-context";

function App() {
  const { products } = useProducts();

  return (
    <div className="text-center">
      <h1>Typescript Practice Project</h1>
      <h3>Shoping Cart</h3>
      <div>
        {products.map((prod) => (
          <div key={prod.id}>
            <h2>{prod.name}</h2>
            <small>{prod.price}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
