import "./App.css";
import Homepage from "./app/homePage/homepage.jsx";
import Product_detail from "./app/productDetail/Product_detail";
import Cart from "./app/cart/cart.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartProvider from "./context/Cart/CartProvider.jsx";
import Faqs from "./app/faq/faq.jsx";
import Contact_us from "./app/contactUs/contact_us.jsx";
import Allproducts from "./app/allProducts/allProducts.jsx";
import PrivacyPolicy from "./app/privacyPolicy/privacyPolicy.jsx";
import TermsOfUse from "./app/termOfUse/termOfUse.jsx";
import CasualShirts from "./app/casualShirts/casualShirts.jsx";
import DressShirts from "./app/dressShirts/dressShirts.jsx";

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "/product/:productId", element: <Product_detail /> },
    { path: "/cart", element: <Cart /> },
    { path: "/faq", element: <Faqs /> },
    { path: "/contact_us", element: <Contact_us /> },
    { path: "/products", element: <Allproducts /> },
    { path: "/Casual-Shirt", element: <CasualShirts /> },
    { path: "/Dress-Shirt", element: <DressShirts /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/term-of-use", element: <TermsOfUse /> },
    { path: "/products/Men-Casual-Shirt", element: <Allproducts /> },
    { path: "/products/Men-Dress-Shirt", element: <Allproducts /> },
    { path: "/products/Kid-Casual-Shirt", element: <Allproducts /> },
    { path: "/products/Kid-Dress-Shirt", element: <Allproducts /> },
  ]);

  return (
    <CartProvider>
        <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;