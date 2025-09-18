import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  /**
   * Select cart items count ( sum of all itesm quent )
   */
  const cartItemsCount = useSelector((state) => state.cart.count);

  return (
    <nav className="border-b border-palette-lighter sticky top-0 z-20 bg-gray-400 rounded-lg text-palette-primary">
      <div className="flex items-center justify-between w-full p-5">
        <Link to="/" className="cursor-pointer pb-2">
          <h1 className="flex no-underline">
            <span className="text-xl font-primary font-bold tracking-tight pt-1">
              فروشگاه استیکر
            </span>
          </h1>
        </Link>
        <div>
          <Link to="/cart" className="relative">
            <FaCartShopping size={25} className="text-pallete-primary" />
            {cartItemsCount > 0 && (
              <div className="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full p-1 transform translate-x-6 -translate-y-3 text-[10px]">
                {cartItemsCount}
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
