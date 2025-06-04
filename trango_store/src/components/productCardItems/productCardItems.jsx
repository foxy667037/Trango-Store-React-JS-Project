import "./productCardItems.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../../components/loader/loader.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const ProductCardItems = ({ searchQuery, selectedFilter, ProductApi }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          ProductApi
        );
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log({ msg: error });
      }
    };

    fetchProducts();
  }, [ProductApi]);

  // filtered the products
  useEffect(() => {
    let filtered = [...products];

    // find products based on input value
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products based on selected filter
    if (selectedFilter === "lowest") {
      filtered = filtered.sort((a, b) => a.product_price - b.product_price);
    } else if (selectedFilter === "highest") {
      filtered = filtered.sort((a, b) => b.product_price - a.product_price);
    }

    // Update the filtered products state
    setFilteredProducts(filtered);
  }, [selectedFilter, searchQuery, products]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease", // Easing function
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <main>
      {filteredProducts.length > 0 ? (
        <div data-aos="fade-up" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-5 bg-white">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white overflow-hidden hover:shadow-lg transition-shadow product_cards"
            >
              <img
                src={product.product_image_path}
                alt={product.product_name}
                className="w-full border-none"
              />
              <div className="p-4">
                <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 truncate title">
                  {product.product_name}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1 product_price">
                  Price:{" "}
                  <span className="font-medium text-sm sm:text-base lg:text-base">
                    {product.product_price} Rupees
                  </span>
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1 product_discount">
                  Discount:{" "}
                  <span className="font-medium text-sm sm:text-base lg:text-base text-blue-600">
                    -{product.discount}
                  </span>
                </p>
                <p className="text-sm sm:text-base lg:text-xl font-semibold text-gray-800 mt-2 main_price">
                  {Math.round(product.discounted_price)} Rupees
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

// check that props contain only string
ProductCardItems.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  ProductApi: PropTypes.string.isRequired,
};

export default ProductCardItems;