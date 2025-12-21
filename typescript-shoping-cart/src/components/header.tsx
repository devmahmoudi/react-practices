/**
 * The header component props interface
 */
interface HeaderProps {
  showCart: boolean,
  setShowCart: (show: boolean) => void
}

/**
 * Header component
 * @returns 
 */
const Header = ({showCart, setShowCart} : HeaderProps) => {
  return (
    <header>
        <h1>Shop</h1>
        <div>
            <button onClick={() => setShowCart(!showCart)}>
                {showCart ? 'Show Products' : 'Show Cart'}
            </button>
        </div>
    </header>
  );
}   

export default Header;