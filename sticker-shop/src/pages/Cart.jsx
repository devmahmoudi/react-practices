import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/ui/Button";
import { confirm } from "../components/ui/Confirm";
import Price from "../components/ui/Price";
import Table from "../components/ui/Table";
import NumberInput from "../components/ui/NumberInput";
import { removeItem, updateItem } from "../store/features/cartSlice";
import { QuentitySelector } from "../components/ui/QuentitySelector";
import toast from "react-hot-toast";

const Cart = () => {
  /**
   * Use dispatch
   */
  const dispatch = useDispatch();

  /**
   * Select cart items from the cartSlice
   */
  const items = useSelector((state) => state.cart.entities);

  /**
   * Select cart total price from the cartSlice
   */
  const cartTotalPrice = useSelector((state) => state.cart.total);

  /**
   * Select cart items count ( sum of all itesm quent )
   */
  const cartItemsCount = useSelector((state) => state.cart.count);

  /**
   * Cart table headers object
   */
  const tableHeaders = ["محصول", "تعداد", "قیمت", "حذف"];

  /**
   * Increment item quent
   */
  const incrementItemQuent = (id) => {
    dispatch(updateItem({ id, changes: { quent: items[id].quent + 1 } }));
  };

  /**
   * Decrement item quent
   */
  const decrementItemQuent = (id) => {
    if (items[id].quent > 1)
      dispatch(updateItem({ id, changes: { quent: items[id].quent - 1 } }));
  };

  /**
   * Cart table rows object
   */
  const tableRows = Object.values(items).map((item) => [
    item.title,
    <QuentitySelector
      value={item.quent}
      onDecrement={() => decrementItemQuent(item.id)}
      onIncrement={() => incrementItemQuent(item.id)}
    />,
    <Price
      value={item.price}
      displayType="text"
      thousandSeparator=","
      suffix=" تومان"
    />,
    <Button
      className="bg-red-500 py-1 hover:bg-red-600"
      onClick={() => removeCartItem(item.id)}
    >
      حذف
    </Button>,
  ]);

  /**
   * Cart table footer object
   */
  const tableFooter = [
    "مجموع",
    cartItemsCount,
    <Price
      value={cartTotalPrice}
      displayType="text"
      thousandSeparator=","
      suffix=" تومان"
    />,
  ];

  /**
   * Add delete all items option button if items doesn't empty
   */
  if (items.length > 0)
    tableFooter.push(
      <Button
        className="bg-red-500 py-1 hover:bg-red-600"
        onClick={() => clearCart()}
      >
        حذف همه
      </Button>
    );

  /**
   * Remove cart item handler
   */
  const removeCartItem = (id) => {
    confirm({
      onConfirm: () => {
        dispatch(removeItem(id));
      },
      title: "حذف محصول",
      message: "آیا از حذف این مورد از سبد خرید مطمئن هستید ؟",
    });
  };

  /**
   * Remove all cart's items
   */
  const clearCart = () => {
    confirm({
      onConfirm: () => {
        items.forEach((item) => dispatch(removeItem(item.id)));
      },
      title: "حذف همه",
      message: "آیا از حذف تمامی محصولات موجود در سبد خرید خود مطمئن هستید ؟",
    });
  };

  return (
    <div className="font-primary">
      <h3 className="text-3xl text-palette-primary mb-5">سبد خرید شما</h3>

      <Table headers={tableHeaders} rows={tableRows} footer={tableFooter} />
    </div>
  );
};

export default Cart;
