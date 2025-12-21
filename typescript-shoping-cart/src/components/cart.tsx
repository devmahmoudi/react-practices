import { useCart } from "../contexts/cart-context";

/**
 * Cart Component
 */
const Cart = () => {
  const { items, totalItems, formatedTotalPrice, dispatch, actions } = useCart();

  /**
   * Remove item from cart handler
   */
  const removeFromCartHandler = (id: string) => {
    if (dispatch && actions?.REMOVE) {
      const itemToRemove = items.find(item => item.id === id);
      if (itemToRemove) {
        dispatch({ type: actions.REMOVE, payload: itemToRemove });
      }
    }
  };

  /**
   * Update quantity handler
   */
  const updateQuantityHandler = (id: string, newQuantity: number) => {
    if (dispatch && actions?.QUANTITY) {
      const item = items.find(item => item.id === id);
      if (item && newQuantity > 0) {
        dispatch({ 
          type: actions.QUANTITY, 
          payload: { ...item, quantity: newQuantity } 
        });
      }
    }
  };

  /**
   * Submit cart handler
   */
  const submitCartHandler = () => {
    if (dispatch && actions?.SUBMIT) {
      dispatch({ type: actions.SUBMIT });
      alert("Order placed successfully!");
    }
  };

  /**
   * Calculate item total price
   */
  const getItemTotalPrice = (price: number, quantity: number) => {
    return (price * quantity).toFixed(2);
  };

  if (items.length === 0) {
    return (
      <div className="body-content">
        <div className="card" style={{ width: "300px", alignItems: "center" }}>
          <h3 className="card-title" style={{ marginBottom: "20px" }}>
            Your Cart
          </h3>
          <p style={{ textAlign: "center", color: "#aaa" }}>
            Your cart is empty
          </p>
          <p style={{ textAlign: "center", fontSize: "1rem", marginTop: "10px" }}>
            Add some products to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="body-content">
      <div style={{ width: "100%", maxWidth: "800px" }}>
        {/* Cart Header */}
        <div 
          className="card" 
          style={{ 
            width: "100%", 
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >
          <h3 className="card-title" style={{ margin: 0 }}>
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Total: {formatedTotalPrice}
            </span>
            <button 
              onClick={submitCartHandler}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Checkout
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div 
          className="product-list-container" 
          style={{ 
            flexDirection: "column", 
            alignItems: "stretch",
            gap: "10px"
          }}
        >
          {items.map((item) => (
            <div 
              key={item.id} 
              className="card"
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px"
              }}
            >
              {/* Product Image and Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="card-image"
                  style={{ width: "80px", height: "80px" }}
                />
                <div>
                  <h4 
                    className="card-title" 
                    style={{ 
                      margin: "0 0 5px 0",
                      fontSize: "1.1rem"
                    }}
                  >
                    {item.name}
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "10px",
                    backgroundColor: "#282c34",
                    padding: "5px 15px",
                    borderRadius: "4px"
                  }}
                >
                  <button 
                    onClick={() => updateQuantityHandler(item.id, (item.quantity ?? 1) - 1)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "transparent",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.2rem"
                    }}
                    disabled={(item.quantity ?? 1) <= 1}
                  >
                    −
                  </button>
                  <span style={{ minWidth: "30px", textAlign: "center" }}>
                    {item.quantity ?? 1}
                  </span>
                  <button 
                    onClick={() => updateQuantityHandler(item.id, (item.quantity ?? 1) + 1)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "transparent",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.2rem"
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Item Total and Remove */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                    ${getItemTotalPrice(item.price, item.quantity ?? 1)}
                  </span>
                  <button 
                    onClick={() => removeFromCartHandler(item.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "transparent",
                      color: "#ff6b6b",
                      border: "1px solid #ff6b6b",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.9rem"
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div 
          className="card" 
          style={{ 
            width: "100%", 
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            backgroundColor: "#282c34"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "0.9rem", color: "#aaa" }}>Items total:</span>
            <span style={{ fontSize: "0.9rem", color: "#aaa" }}>Shipping:</span>
            <span style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "5px" }}>
              Order total:
            </span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
            <span style={{ fontSize: "0.9rem" }}>{formatedTotalPrice}</span>
            <span style={{ fontSize: "0.9rem" }}>$0.00</span>
            <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#007bff" }}>
              {formatedTotalPrice}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          marginTop: "20px" 
        }}>
          <button
            onClick={() => {
              if (dispatch && actions?.SUBMIT) {
                dispatch({ type: actions.SUBMIT });
              }
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: "#ff6b6b",
              border: "1px solid #ff6b6b",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Clear Cart
          </button>
          
          <button 
            onClick={submitCartHandler}
            style={{
              padding: "10px 30px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1.1rem"
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;