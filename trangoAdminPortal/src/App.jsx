import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./app/SignUpForm/SignUpForm";
import LoginForm from "./app/LoginForm/LoginForm";
import VerifyEmail from "./app/VerifyEmail/VerifyEmail";
import ResetPasswordForm from "./app/ResetPasswordForm/ResetPasswordForm";
import Dashboard from "./app/Dashboard/Dashboard";
import VerifyCode from "./app/VerifyCode/VerifyCode";
import SetNewPassword from "./app/SetNewPassword/SetNewPassword";
import UserDetails from "./app/UserDetails/UserDetails";
import UserProvider from "./context/User/UserProvider";
import AddProduct from "./app/AddProduct/AddProduct";
import BannerForm from "./app/AddBanner/AddBanner";
import AllProducts from "./app/AllProducts/AllProducts";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/verify-account" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ResetPasswordForm />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/new-password" element={<SetNewPassword />} />
          <Route path="/user-detail" element={<UserDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-banner" element={<BannerForm />} />
          <Route path="/all-products" element={<AllProducts />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;