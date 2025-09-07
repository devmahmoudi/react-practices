import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-gray-400 rounded-lg text-white">
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
            <FaCartShopping size={25}/>
            {/* {cartItems.length === 0 ? null : ( */}
            <div className="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full p-1 transform translate-x-6 -translate-y-3 text-[10px]">
              {/* <CustomNumeralNumericFormat
                                    value={cartItems.length}
                                    thousandSeparator=","
                                /> */}
              10
            </div>
            {/* )} */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
