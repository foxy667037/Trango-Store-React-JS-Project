import { useContext } from "react";
import UserContext from "./UserContext.jsx"; // Import the CartContext

// Custom hook to use CartContext
const useUserState = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserState must be used within a CartProvider");
  }

  return context;
};

export default useUserState;