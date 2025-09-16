import { useEffect } from "react";
import { useSelector } from "react-redux";
import Price from "../components/ui/Price";
import Table from "../components/ui/Table";

const Cart = () => {
  /**
   * Select cart items from the cartSlice
   */
  const items =
    Object.values(useSelector((state) => state.cart.entities)) ?? [];

  /**
   * Select cart total price from the cartSlice
   */
  const cartTotalPrice = useSelector((state) => state.cart.total);

  /**
   * Calculate total quent of all cart items
   */
  const cartTotalQuent = items.length
    ? items.reduce((a, b) => a + b.quent, 0)
    : 0;

  /**
   * Cart table headers object
   */
  const tableHeaders = ["محصول", "تعداد", "قیمت", "حذف"];

  /**
   * Cart table rows object
   */
  const tableRows = Object.values(items).map((item) => [
    item.title,
    item.quent,
    <Price
      value={item.price}
      displayType="text"
      thousandSeparator=","
      suffix=" تومان"
    />,
    "",
  ]);

  /**
   * Cart table footer object
   */
  const tableFooter = [
    "مجموع",
    cartTotalQuent,
    <Price
      value={cartTotalPrice}
      displayType="text"
      thousandSeparator=","
      suffix=" تومان"
    />,
  ];

  return (
    <div className="font-primary">
      <h3 className="text-3xl text-palette-primary mb-5">سبد خرید شما</h3>

      <Table headers={tableHeaders} rows={tableRows} footer={tableFooter} />
    </div>
  );
};

export default Cart;
