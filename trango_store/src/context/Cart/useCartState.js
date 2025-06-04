import { useContext } from "react";
import CartContext from "./CartContext"; 

// Custom hook to use CartContext
const useCartState = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartState must be used within a CartProvider");
  }

  return context;
};

export default useCartState;