import { useState } from "react";
import PropTypes from "prop-types";
import UserContext from "./UserContext";

// CartProvider component to provide the context to child components
const UserProvider = ({ children }) => {
  const [userdata, setUserData] = useState([]);

  // Function to get User Details:
  const getUserData = async () => {
    const FetchUserDataApi = `${import.meta.env.VITE_GET_USER_DATA_API}`;

    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(FetchUserDataApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const fetchedUserData = await response.json();
      setUserData(fetchedUserData);
    } catch (error) {
      console.log({ errors: error });
    }
  };

  return (
    <UserContext.Provider
      value={{
        userdata,
        getUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Prop validation using PropTypes
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;