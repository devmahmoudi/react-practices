import { useEffect } from "react";
import { useSelector } from "react-redux";
import Price from "../components/ui/Price";
import Table from "../components/ui/Table";

const Cart = () => {

  const items = Object.values(useSelector((state) => state.cart.entities)) ?? [];

  const cartTotalPrice = useSelector((state) => state.cart.total)

  const cartTotalQuent = items.length ? items.reduce((a, b) => a.quent + b.quent) : 0

  const tableHeaders = ["محصول", "تعداد", "قیمت", "حذف"];

  const tableRows = Object.values(items).map((item) => [
    item.title,
    item.quent,
    item.price,
    "",
  ]);

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

  useEffect(() => {}, []);

  return (
    <div className="font-primary">
      <h3 className="text-3xl text-palette-primary mb-5">سبد خرید شما</h3>

      <Table headers={tableHeaders} rows={tableRows} footer={tableFooter} />
    </div>
  );
};

export default Cart;
