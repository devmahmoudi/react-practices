import productApi from "../../api/productApi";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { data, isLoading, isSuccess, isError, error } =
    productApi.useGetProductsQuery();

  const content = () => {
    if (isLoading) return <span>در حال بارگزاری ...</span>;
    else {
      if (isError) return <span>{error}</span>;
      else if (isSuccess && !data && data.length)
        return <span>در حال حاضر هیچ استیکری موجود نیست !</span>;
      else
        return (
          <>
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        );
    }
  };

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-primary">
        {content()}
    </div>
  );
};

export default ProductList;
