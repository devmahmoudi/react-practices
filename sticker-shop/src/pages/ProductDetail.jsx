import { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import NumberInput from "../components/ui/NumberInput";
import PriceFormat from "../components/ui/Price";
import { addItem as addCartItem } from "../store/features/cartSlice";
import NotFound from "./NotFound";


const ProductDetail = () => {
  const dispatch = useDispatch()
  const { productId } = useParams();
  const [count, setCount] = useState(1);

  const product = useSelector((state) => state.products.entities[productId]);

  if (!product) return <NotFound />;

  const { id, title, price, description, sticker } = product;

  /**
   * Count input change handler
   */
  const handleCountChange = (e) => {
    if(e.target.value < 1){
      setCount(1)
      return
    }

    setCount(e.target.value);
  };

  /**
   * Add to cart button on click handler
   */
  const addToCart = () => {
    dispatch(addCartItem({...product, quent: parseInt(count)}))
  };

  return (
    <div className="sm:flex font-primary shadow-lg shadow-green-300 border-2 border-gray-100 rounded-lg">
      {/* Product Image  */}
      <img
        src={`http://localhost:3000/images/${sticker}`}
        alt={title}
        className="rounded-r-lg max-w-full sm:max-w-[300px]"
      />

      {/* Product Detail  */}
      <div className="flex flex-col justify-between w-full">
        <div className="p-3 text-start">
          <h4 className="text-2xl mb-3 text-palette-primary">{title}</h4>
          <p>{description}</p>
        </div>

        {/* Price and add to card actions */}
        <div className="self-end m-3 flex flex-row gap-3">
          {/* Price */}
          <div className="flex items-center justify-center">
            <Badge className="bg-blue-500 border-none text-white w-full h-full flex items-center justify-center">
              <PriceFormat
                value={price}
                displayType="text"
                thousandSeparator=","
                suffix=" تومان"
              />
            </Badge>
          </div>

          {/* Add to card */}
          <div className="flex flex-row gap-3">
            <Button className="m-0" onClick={addToCart}>
              <FaCartPlus className="inline ml-3" />
              <span>اضافه کردن به سبد خرید</span>
              <NumberInput
                className="w-[80px] inline py-1 mr-3 bg-blue-500 text-white"
                placeholder=""
                value={count}
                onChange={handleCountChange}
                onClick={(e) => e.stopPropagation()}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
