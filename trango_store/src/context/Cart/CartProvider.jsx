import { useState } from "react";
import PropTypes from "prop-types"; 
import CartContext from "./CartContext"; 

// CartProvider component to provide the context to child components
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); 

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to remve item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId)); 
  };
  
  // Function to update the quantity of an item in the cart
  const updateQuantity = (id, quantity, total) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity, total } : item
      )
    );
  };
  
  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]); 
  };

  return (
    <CartContext.Provider
      value={{
        cart, 
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Prop validation using PropTypes
CartProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default CartProvider;