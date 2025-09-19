import { useState } from "react";
import productApi from "../../api/productApi";
import { Paginator } from "../ui/Paginator";
import ProductCard from "./ProductCard";
import { useEffect } from "react";

const ProductList = () => {
  /**
   * RTK Query fetching list
   */
  const { data, isLoading, isSuccess, isError, error } =
    productApi.useGetProductsQuery();

  /**
   * Paginator par page items length
   */
  const [perPage, setPerPage] = useState(12);

  /**
   * Paginator current page items
   */
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if (!currentItems.length && isSuccess && data)
      setCurrentItems(data.slice(0, perPage));
  }, [data]);

  /**
   * Paginator on page change handler
   *
   * @param {number} offset
   * @param {number} end
   */
  const handlePageChange = (offset, end) => {
    setCurrentItems(data.slice(offset, end));
  };

  const content = () => {
    if (isLoading) return <span>در حال بارگزاری ...</span>;
    else {
      if (isError) return <span>{error}</span>;
      else if (isSuccess && !data && data.length)
        return <span>در حال حاضر هیچ استیکری موجود نیست !</span>;
      else
        return (
          <>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-primary">
              {currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <>
      {content()}
      {data && data.length > perPage && (
        <Paginator
          total={data.length}
          onPageChange={handlePageChange}
          perPage={perPage}
        />
      )}
    </>
  );
};

export default ProductList;
