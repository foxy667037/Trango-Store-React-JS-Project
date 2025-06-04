import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import "./homepage.css";
import { FaArrowRight } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader.jsx";
import AnimatedText from "../../components/animatedText/animatedText.jsx";
import Carditems from "../../components/CardItems/Carditems.jsx";
import Carousel from "../../components/userReviewSlider/userReviewSlider.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);

  // loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // homepage pic animation
  const images = [
    "/images/positive-confident-young-caucasian-male-office-worker-wearing-white-formal-shirt-classic-trousers-with-belt-having-happy-facial-expression-keeping-hands-pockets-smiling-joyfully_343059-4600.avif",
    "/images/young-male-holding-hands-pockets-white-shirt-pants-looking-elegant.jpg",
  ];

  // homepage description animation
  const contentData = [
    {
      title: "Dress Shirt",
      description:
        "A cozy staple that originated as athletic wear and has evolved into a popular choice for casual elegance. This piece combines comfort with style, making it a go-to favorite for any occasion. Crafted from soft, breathable fabric, it’s perfect for layering or wearing alone.",
      price: "1400",
    },
    {
      title: "Casual Shirt",
      description:
        "Stylish and warm, ideal for braving cold weather with a touch of flair. Originally an athletic essential, it has transformed into a cozy must-have, blending casual comfort with timeless style. Perfect for layering or as a solo statement piece in any casual outing.",
      price: "1200",
    },
  ];

  // change the homepage image every 5 seconds:
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease", // Easing function
      once: true, // Animation happens only once
    });
  }, []);

  // Scroll to Top Button Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <Banner />
      {loading ? (
        <section>
          <Loader />
        </section>
      ) : (
        <main>
          <AnimatePresence>
            {showScrollButton && (
              <motion.button
                className="scroll-to-top-button bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500"
                onClick={scrollToTop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaArrowUp />
              </motion.button>
            )}
          </AnimatePresence>
          <section data-aos="fade-up" className="flex p-4 gap-12 mt-2 h-auto content_Section">
            <section className="h-auto w-[50%] p-3 content_section">
              <h1 className="w-auto text-gray-900 mt-7 max-sm:-mb-2 max-sm:text-3xl flex text-[80px] font-extralight flex-col content_heading">
                Trending
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500">
                  Outfits
                </span>
              </h1>
              <AnimatePresence>
                <motion.div
                  key={currentIndex}
                  initial={{ y: 20, opacity: 0 }} // Start down
                  animate={{ y: 0, opacity: 1 }} // Slide up and fade in
                  exit={{ y: 20, opacity: 0 }} // Slide down and fade out
                  transition={{ duration: 0.5 }}
                  style={{ position: "absolute" }} // Prevent layout shift
                >
                  <div className="content">
                    <h5 className="outfit_name text-zinc-900">
                      {contentData[currentIndex].title}
                    </h5>
                    <p className="description text-zinc-900 text-wrap">
                      {contentData[currentIndex].description}
                    </p>
                    <h6 className="price text-black">
                      {contentData[currentIndex].price} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500">RS</span>
                    </h6>
                    <Link to="/products">
                      <button className="btn bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-out text-white py-2 px-4 rounded-md">
                        See More
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>
            <section className="image_section">
              <AnimatePresence>
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={contentData[currentIndex].title}
                  title={contentData[currentIndex].title}
                  initial={{ x: "100%", opacity: 0 }} // Start off-screen to the right
                  animate={{ x: 0, opacity: 1 }} // Slide into view
                  exit={{ x: "-100%", opacity: 0 }} // Exit off-screen to the left
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </section>
          </section>

          <section className="flex flex-col p-4 h-auto product_section categories">
            <section className="px-3 py-2 flex justify-between items-center max-sm:ml-0 max-sm:-mt-2 max-md:ml-1">
              <h1 className="heading font-semibold text-[32px] max-sm:text-2xl max-sm:m-auto">
                Product Categories
              </h1>
            </section>
            <section className="m-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-white">
                <Link to={`/products/Men-Casual-Shirt`}>
                  <div
                    title="Mens Casual Shirts"
                    className="flex flex-col gap-2 product_card"
                  >
                    <img
                      src="/images/close-up-young-man-blue-denim-shirt.jpg"
                      alt="Mens Casual Shirts"
                      className=" w-full"
                    />
                    <div className="">
                      <a className="mb-2 ml-2 flex items-center gap-2 transition-all hover:gap-3 arrivalsHeading">
                        Mens Casual Shirts <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </Link>
                <Link to={`/products/Men-Dress-Shirt`}>
                  <div
                    title="Mens Dress Shirts"
                    className="flex flex-col gap-2 product_card"
                  >
                    <img
                      src="/images/portrait-handsome-smiling-model-sexy-stylish-man-dressed-shirt-trousers-fashion-hipster-male-posing-near-blue-wall-studio-isolated.jpg"
                      alt="Mens Dress Shirts"
                      className=" w-full"
                    />
                    <div className="">
                      <a className="mb-2 ml-2 flex items-center gap-2 transition-all hover:gap-3 arrivalsHeading">
                        Mens Dress Shirts <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </Link>
                <Link to={`/products/Kid-Casual-Shirt`}>
                  <div
                    title="Kids Casual Shirts"
                    className="flex flex-col gap-2 product_card"
                  >
                    <img
                      src="/images/portrait-young-cool-smiling-boy-blue-polo-posing-with-skate-shoulder-hand-pocket.jpg"
                      alt="Kids Casual Shirts"
                      className=" w-full"
                    />
                    <div className="">
                      <a className="mb-2 ml-2 flex items-center gap-2 transition-all hover:gap-3 arrivalsHeading">
                        Kids Casual Shirts <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </Link>
                <Link to={`/products/Kid-Dress-Shirt`}>
                  <div
                    title="Kids Dress Shirts"
                    className="flex flex-col gap-2 product_card"
                  >
                    <img
                      src="/images/beautiful-little-boy-with-ginger-hair-freckles-holding-hands-pocket.jpg"
                      alt="Kids Dress Shirts"
                      className=" w-full"
                    />
                    <div className="">
                      <a className="mb-2 ml-2 flex items-center gap-2 transition-all hover:gap-3 arrivalsHeading">
                        Kids Dress Shirts <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          </section>

          <section>
            <AnimatedText />
          </section>

          <section className="flex flex-col p-4 h-auto product_section">
            <section className="px-3 mb-2 py-2 flex justify-between items-center max-md:ml-4">
              <h1 className="heading text-[32px] font-semibold max-sm:text-center max-lg:text-center max-sm:text-3xl max-sm:m-auto">
                New Arrivals
              </h1>
              <Link
                to="/products"
                className="text-center see_more_link underline text-purple-800 max-sm:hidden max-lg:hidden"
              >
                See More Products...
              </Link>
            </section>
            <section className="py-2  px-4 flex flex-col">
              <Carditems
                productsApi={import.meta.env.VITE_FETCH_PRODUCTS_BACKEND}
                text="New"
              />
            </section>
            <section className="h-auto mt-3 -mb-2 px-4 py-3 see_more_link hidden max-sm:text-center max-lg:text-center max-sm:block max-lg:block">
              <Link to="/products">
                <button className="bg-gradient-to-r px-5 py-3 text-white from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-out flex gap-1 no-underline max-sm:m-auto max-md:m-auto max-lg:m-auto">
                  See More <FiArrowUpRight className="text-xl" />
                </button>
              </Link>
            </section>
          </section>

          <section className="subscribe_newsletter mt-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-8">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-lg mb-6">
                Get the latest updates, news, and exclusive offers directly in
                your inbox.
              </p>
              <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full sm:w-80 px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </section>

          <section className="flex flex-col p-4 h-auto product_section">
            <section className="px-3 py-2 flex justify-between items-center max-md:ml-4">
              <h1 className="heading text-[32px] font-semibold max-sm:text-center max-lg:text-center max-sm:mb-2 max-sm:text-2xl max-sm:m-auto">
                Best Selling Products
              </h1>
              <Link
                to="/products"
                className="text-center see_more_link underline text-purple-800 max-sm:hidden max-lg:hidden"
              >
                See More Products...
              </Link>
            </section>
            <section className="py-2  px-4 flex flex-col">
              <Carditems
                productsApi={
                  import.meta.env.VITE_FETCH_BEST_SELLER_PRODUCTS_BACKEND
                }
                text="Best"
              />
            </section>
            <section className="h-auto mt-4 max-sm:-mb-4 px-4 py-3 see_more_link hidden max-sm:text-center max-lg:text-center max-sm:block max-lg:block">
              <Link to="/products">
                <button className="bg-gradient-to-r px-5 py-3 text-white from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-out flex gap-1 no-underline max-sm:m-auto max-md:m-auto max-lg:m-auto">
                  See More <FiArrowUpRight className="text-xl" />
                </button>
              </Link>
            </section>
          </section>

          <section className="flex flex-col p-4 h-auto user_review ">
            <h1 className="heading text-center text-[32px] font-semibold max-sm:text-center max-lg:text-center max-sm:text-2xl">
              Customer Reviews
            </h1>
            <section className="ml-4 mt-2 mr-4 px-3 py-2 flex h-auto relative overflow-hidden">
              <Carousel />
            </section>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Homepage;