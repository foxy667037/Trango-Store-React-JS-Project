import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Carditems = ({ productsApi, text }) => {
  const [bestproducts, setbestproducts] = useState([]);
  const api = productsApi;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setbestproducts(data);
      } catch (error) {
        console.error("Error Products:", error);
      }
    };

    fetchProducts();
  }, [api]);
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 bg-white">
      {bestproducts.length > 0 ? (
        bestproducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
              key={product._id}
              className="bg-white overflow-hidden hover:shadow-lg transition-shadow product_cards"
          >
            <div className="bg-white overflow-hidden hover:shadow-lg transition-shadow relative">
              <span className="absolute top-2 left-2 bg-white text-black text-xs sm:text-sm p-1 rounded-md newtext">
                {text}
              </span>

              <img
                src={product.product_image_path}
                alt={product.product_name}
                className="w-full h-auto border-none"
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
            </div>
          </Link>
        ))
      ) : (
        <p>No new best products available.</p>
      )}
    </div>
  );
};

Carditems.propTypes = {
  productsApi: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Carditems;