import { useState, useEffect } from "react";
import useCartState from "../../context/Cart/useCartState";
import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import { LiaOpencart } from "react-icons/lia";
import { LiaArrowRightSolid } from "react-icons/lia";
import { ImBin2 } from "react-icons/im";
import gsap from "gsap";
import "./cart.css";
import Loader from "../../components/loader/loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery"); 

  // loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease", // Easing function
      once: true, // Animation happens only once
    });
  }, []);

  const { cart, removeFromCart, updateQuantity, clearCart } = useCartState();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [shippingOption, setShippingOption] = useState("standard"); // default to 'standard'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };
      setIsFormValid(
        Object.values(updatedForm).every((field) => field.trim() !== "")
      );
      return updatedForm;
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  
  const handleIncreaseQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    const newTotal = item.price * newQuantity;
    updateQuantity(item.id, newQuantity, newTotal);

    // Animate price increase
    gsap.fromTo(
      `#item-price-${item.id}`,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5 }
    );
  };

  const handleDecreaseQuantity = (item) => {
    const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
    const newTotal = item.price * newQuantity;
    updateQuantity(item.id, newQuantity, newTotal);

    // Animate price decrease
    gsap.fromTo(
      `#item-price-${item.id}`,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5 }
    );
  };

  const handleShippingChange = (e) => {
    setShippingOption(e.target.value);
  };

  const handleCheckout = async () => {
    setButtonLoading(true); // Start loading
    const orderData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      country: form.country,
      cartItems: cart,
      orderTotal: orderTotal,
      shippingOption: shippingOption,
      paymentMethod: paymentMethod,
    };

    try {
      const ordersubmitApi = `${
        import.meta.env.VITE_FETCH_ORDER_SUBMIT_BACKEND
      }`;
      const response = await fetch(ordersubmitApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        toast(`Order placed successfully! Your Order ID is ${data.orderId}`);
        clearCart(); 
        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          country: "",
        });
      } else {
        alert(`Error placing order: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setButtonLoading(false); // Stop loading
    }
  };

  const merchandiseTotal = cart.reduce((acc, item) => acc + item.total, 0);

  // Set the shipping cost based on the selected option
  const shippingCost = shippingOption === "standard" ? 300 : 800;

  const orderTotal = merchandiseTotal + shippingCost;

  return (
    <>
      <Header />
      <Banner />
      {loading ? (
        <section>
          <Loader />
        </section>
      ) : (
        <main data-aos="fade-up" className="cart flex justify-between p-5 max-sm:flex max-sm:flex-col">
          <section className="cart-left bg-white p-5 w-3/5 flex flex-col">
            <h2 className="cart-header text-3xl font-semibold">
              Shopping Cart
            </h2>
            {cart.length === 0 ? (
              <p className="empty-cart-message flex flex-col gap-1 text-2xl items-center mt-4 max-md:text-lg">
                Your cart is empty! <LiaOpencart className="text-8xl" />
              </p>
            ) : (
              <ul className="cart-items">
                {cart.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="cart-item flex justify-between items-center py-4 border-b-2 border-gray-300 max-[600px]:flex-col max-[600px]:items-start max-[600px]:py-4"
                    >
                      <div className="item-details flex flex-row items-center justify-between font-semibold">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="item-image w-16 h-16 mr-2"
                        />
                        <div>
                          <h3 className="item-name">
                            Name:{" "}
                            <span className="font-normal max-sm:text-sm">
                              {item.name}
                            </span>
                          </h3>
                          <p className="item-size">
                            Size:{" "}
                            <span className="font-normal max-sm:text-sm">
                              {item.size}
                            </span>
                          </p>
                          <p className="item-total-price">
                            Price:{" "}
                            <span
                              id={`item-price-${item.id}`}
                              className="font-normal max-sm:text-sm"
                            >
                              {item.total} Rupees
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-10 max-[600px]:flex-row max-[600px]:w-full max-[600px]:justify-between max-[600px]:mt-3 ">
                        <div className="quantity-control justify-center rounded-lg gap-2 flex items-center">
                          <button
                            className="w-9 h-9 cursor-pointer text-xl font-semibold bg-slate-700 text-white rounded transition-colors"
                            onClick={() => handleDecreaseQuantity(item)}
                          >
                            -
                          </button>
                          <span className="font-normal">{item.quantity}</span>
                          <button
                            className="w-9 h-9 cursor-pointer text-xl font-semibold bg-slate-700 text-white rounded transition-colors"
                            onClick={() => handleIncreaseQuantity(item)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="remove-button text-blue-600 text-sm font-semibold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <button
              onClick={clearCart}
              disabled={cart.length === 0} // Disable the button if the cart is empty
              className="back-to-shop-button mt-6 border border-blue-600 bg-blue-700 hover:bg-blue-500 text-white p-2 cursor-pointer flex justify-center items-center gap-2 hover:gap-3 transition-all w-full text-center font-bold"
            >
              Clear Cart <ImBin2 />
            </button>
          </section>

          <section className="cart-right bg-white px-5 py-7">
            <h3 className="summary-header text-3xl font-semibold">Summary</h3>
            <p className="summary-item flex justify-between items-center gap-2 font-medium my-5">
              Items: {cart.length} {cart.length > 1 ? "items" : "item"}{" "}
              <span className="font-normal">
                {merchandiseTotal.toFixed(2)} RS
              </span>
            </p>
            <p className="summary-item flex justify-between items-center gap-2 font-medium my-5">
              Shipping:
              <select
                className="shipping-select w-full text-right font-normal"
                value={shippingOption}
                onChange={handleShippingChange}
              >
                <option value="standard">Standard Delivery - 300 RS</option>
                <option value="express">Express Delivery - 800 RS</option>
              </select>
            </p>
            <p className="summary-item flex justify-between items-center gap-2 font-medium my-5">
              Payment Method:
              <select
                className="shipping-select w-auto text-right font-normal"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                {/* <option value="Credit Card">Credit Card</option> */}
              </select>
            </p>
            <p className="summary-total flex justify-between items-center gap-2 font-medium my-5">
              Total Price:{" "}
              <span className="font-normal">{orderTotal.toFixed(2)} RS</span>
            </p>
            <hr className="m-auto w-4/5 border-dashed border-zinc-600" />

            <section className="checkout-form flex flex-col gap-2 mt-5">
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleInputChange}
                className="checkout-input focus:outline-none focus:border-blue-600 border p-2 rounded-sm text-sm border-gray-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleInputChange}
                className="checkout-input focus:outline-none focus:border-blue-600 border p-2 rounded-sm text-sm border-gray-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleInputChange}
                className="checkout-input focus:outline-none focus:border-blue-600 border p-2 rounded-sm text-sm border-gray-500"
              />
              <input
                type="text"
                name="country"
                placeholder="Enter your country"
                value={form.country}
                onChange={handleInputChange}
                className="checkout-input focus:outline-none focus:border-blue-600 border p-2 rounded-sm text-sm border-gray-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleInputChange}
                className="checkout-input focus:outline-none focus:border-blue-600 border p-2 rounded-sm text-sm border-gray-500"
              />
            </section>

            <button
              className={`checkout-button mt-5 border border-blue-600 bg-blue-700 hover:bg-blue-500 text-white p-2 cursor-pointer flex justify-center items-center gap-2 hover:gap-3 w-full transition-all text-center font-bold ${
                buttonLoading
                  ? "disabled:bg-slate-300 disabled:cursor-not-allowed"
                  : ""
              }`}
              disabled={!isFormValid || buttonLoading}
              onClick={handleCheckout}
            >
              {buttonLoading ? (
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
              ) : (
                <>
                  Proceed to checkout <LiaArrowRightSolid />
                </>
              )}
            </button>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{
                  fontSize: "14px", 
                }}
              />
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Cart;