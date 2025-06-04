import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import CartState from "../../context/Cart/useCartState";
import { MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Product_detail.css";
import Loader from "../../components/loader/loader.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const Product_detail = () => {
  const { productId } = useParams(); // get id from url
  const { addToCart } = CartState(); // add data to cart state

  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // Store the total price to animate
  const [prevTotalPrice, setPrevTotalPrice] = useState(0); // Store the previous price for animation

  // fetch the product data using product id:
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const VITE_FETCH_PRODUCTS_DETAILS_BACKEND = `${
          import.meta.env.VITE_FETCH_PRODUCTS_DETAILS_BACKEND
        }/${productId}`;
        const response = await fetch(`${VITE_FETCH_PRODUCTS_DETAILS_BACKEND}`);
        const data = await response.json();

        if (response.ok) {
          setProductData(data);
        } else {
          toast.error("Product not found!");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Failed to load product data!");
      }
    };

    fetchProductData();
  }, [productId]);

  // animate the total price:
  useEffect(() => {
    if (productData) {
      const price = productData.discounted_price * quantity;
      setTotalPrice(price);

      gsap.fromTo(
        "#total-price", // ID of the element to animate
        { innerText: prevTotalPrice.toFixed(2) },
        {
          innerText: price.toFixed(2),
          duration: 2, // Adjust duration for animation speed
          ease: "power1.out",
          snap: { innerText: 1 },
        }
      );

      setPrevTotalPrice(price);
    }
  }, [productData, quantity, prevTotalPrice]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease", // Easing function
      once: true, // Animation happens only once
    });
  }, []);

  const {
    product_name,
    product_price,
    discount,
    discounted_price,
    product_image_path,
  } = productData || {};

  // sizes of the shirts:
  const sizeOptions = ["S", "M", "L", "XL"];

  // quantity function controls:
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Add to cart function:
  const handleAddToCart = () => {
    const sizeLabel =
      selectedSize === "S"
        ? "small"
        : selectedSize === "M"
        ? "medium"
        : selectedSize === "L"
        ? "large"
        : "extra-large";

    addToCart({
      id: productId,
      name: product_name,
      size: sizeLabel,
      quantity: quantity,
      price: discounted_price,
      total: totalPrice,
      image: product_image_path,
    });

    toast("Added to Cart Successfully!");
  };

  return (
    <>
      <Header />
      <Banner />
      {!productData ? (
        <Loader />
      ) : (
        <main data-aos="fade-up" >
          <section className="Product_detail flex gap-10 p-10 max-w-6xl h-auto w-full m-auto bg-white max-md:flex-col max-md:gap-6">
            <div className="image-gallery flex flex-1 justify-center items-center flex-col">
              <div className="main-image max-md:w-full">
                <img
                  src={product_image_path}
                  alt="Product"
                  className="w-full transition-transform cursor-zoom-in hover:scale-105"
                />
              </div>
            </div>

            <div className="product-details flex flex-1 flex-col gap-5 max-lg:gap-3">
              <h1 className="mt-2 text-2xl font-sans font-medium text-zinc-900 max-lg:text-xl max-lg:mt-0">
                {product_name}
              </h1>
              <p className="price text-2xl font-bold text-zinc-900 max-lg:text-xl">
                {Math.round(discounted_price)}{" "}
                <span className="original-price text-base line-through text-gray-500 ml-2">
                  {Math.round(product_price)}
                </span>
                <span className="discount text-base text-orange-600 ml-2">
                  ({discount} off)
                </span>
              </p>

              <div className="options flex text-2xl gap-9">
                <div className="size-options flex flex-row items-center gap-2 max-sm:flex-col max-sm:items-start">
                  <h4 className="text-base text-gray-500 font-medium">
                    Available Size:
                  </h4>
                  <div className="flex flex-row gap-2">
                    {sizeOptions.map((size) => (
                      <label
                        key={size}
                        className={`size border border-blue-600 ${
                          selectedSize === size
                            ? "selected bg-blue-600 text-white border-blue-700 border-2"
                            : "bg-slate-100 border-transparent"
                        } relative flex items-center justify-center w-9 h-9 pointer text-base rounded-full transition-colors`}
                      >
                        <input
                          type="radio" // Hidden radio button for selection
                          value={size}
                          checked={selectedSize === size}
                          onChange={() => setSelectedSize(size)}
                          className="hidden-radio opacity-0 absolute w-full h-full pointer"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="quantity-selector flex items-center gap-2">
                <motion.button
                  onClick={decreaseQuantity}
                  whileTap={{ scale: 0.9 }}
                  className="quantity-btn w-9 h-9 pointer text-lg font-bold border border-blue-600 bg-blue-700 hover:bg-blue-500 text-white rounded-md transition-all"
                >
                  -
                </motion.button>
                <motion.span
                  key={quantity} // This ensures the quantity is animated correctly when it changes
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="quantity-number text-lg font-bold text-gray-700"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  onClick={increaseQuantity}
                  whileTap={{ scale: 0.9 }}
                  className="quantity-btn  w-9 h-9 pointer text-lg font-bold border border-blue-600 bg-blue-700 hover:bg-blue-500 text-white rounded-md transition-all"
                >
                  +
                </motion.button>
              </div>

              <motion.p
                className="total-price font-sans text-xl font-medium text-gray-800 mt-2"
                animate={{ opacity: 1, scale: [0.95, 1.05, 1] }}
                initial={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Total Price:{" "}
                <motion.span id="total-price" className="total-price-number">
                  {totalPrice.toFixed(2)}
                </motion.span>
                <span className="ml-1 font-semibold">Rupees</span>
              </motion.p>

              <motion.button
                className="add-to-cart mt-2 py-3 px-5 text-lg flex justify-center items-center gap-2 font-semibold text-white border border-blue-600 bg-blue-700 hover:bg-blue-500 pointer transition-all"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Add to cart{" "}
                <motion.div
                  whileHover={{ rotate: 20 }}
                  whileTap={{ rotate: 45 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MdAddShoppingCart style={{ fontSize: "22px" }} />
                </motion.div>
              </motion.button>
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
            </div>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Product_detail;
