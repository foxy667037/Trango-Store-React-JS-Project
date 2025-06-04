import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // To show a loader while fetching products
  const [error, setError] = useState(null);
  const [removalLoading, setRemovalLoading] = useState(false); 
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const getallproductsApi = `${import.meta.env.VITE_GET_ALL_PRODUCTS_API}`;
      const token = localStorage.getItem("auth-token");
      const headers = {
        "Content-Type": "application/json",
        "auth-token": token,
      };

      const response = await axios.get(getallproductsApi, { headers });
      setProducts(response.data || []);
      console.log("Products State:", response.data || []);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setCurrentProduct({ ...productToEdit });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const { product_name, product_price, discount } = currentProduct;
      const updatedData = {
        product_name,
        product_price,
        discount,
      };

      // Filter out empty fields and keep existing values if blank
      Object.keys(updatedData).forEach((key) => {
        if (!updatedData[key]) {
          updatedData[key] = currentProduct[key]; 
        }
      });

      const token = localStorage.getItem("auth-token");
      const headers = {
        "Content-Type": "application/json",
        "auth-token": token,
      };

      const updateApi = `${import.meta.env.VITE_UPDATE_PRODUCT_API}/${
        currentProduct._id
      }`;
      const response = await axios.put(updateApi, updatedData, { headers });

      // Update the products state with the new values
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === currentProduct._id ? response.data.product : product
        )
      );

      setModalOpen(false); // Close the modal
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to update the product.");
    }
  };

  const handleRemove = async (productId) => {
    try {
      setRemovalLoading(true);

      const token = localStorage.getItem("auth-token");
      const headers = {
        "Content-Type": "application/json",
        "auth-token": token,
      };

      const deleteApi = `${
        import.meta.env.VITE_DELETE_PRODUCT_API
      }/${productId}`;

      await axios.delete(deleteApi, { headers });

      alert("Product removed successfully!");

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.error("Error removing product:", err);
      setProducts((prev) => [...prev, productId]);

      alert("Failed to remove the product.");
    } finally {
      setRemovalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-blue-600 text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto p-8 mb-8 mt-2 justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          All Products
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-600 text-center">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-lg shadow-lg p-4 flex flex-col"
              >
                <img
                  src={
                    product.product_image_path ||
                    "https://via.placeholder.com/150"
                  }
                  alt={product.product_name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.product_name}
                </h3>
                <p className="text-black font-semibold">
                  {product.product_price} {" "}<span className="ml-1 text-blue-500 font-sans text-base">{product.discount}</span>
                </p>
                <p className="text-black font-semibold mb-2">
                  ${product.discounted_price.toFixed(2)}
                </p>
                <div className="mt-auto flex justify-between space-x-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className={`px-4 py-2 ${
                      removalLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 text-white"
                    } text-sm font-medium rounded-md shadow-md hover:bg-red-600 transition`}
                    disabled={removalLoading}
                  >
                    {removalLoading ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Edit Product
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={currentProduct.product_name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      product_name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Product Price</label>
                <input
                  type="number"
                  value={currentProduct.product_price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      product_price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Discount</label>
                <input
                  type="number"
                  value={currentProduct.discount}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      discount: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between space-x-2 mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white text-sm font-medium rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AllProducts;