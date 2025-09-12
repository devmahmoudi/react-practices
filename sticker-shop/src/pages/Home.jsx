import { Helmet } from "react-helmet";
import ProductList from "../components/product/ProductList";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Sticker Shop</title>
      </Helmet>
      <ProductList />
    </>
  );
};

export default Home;
