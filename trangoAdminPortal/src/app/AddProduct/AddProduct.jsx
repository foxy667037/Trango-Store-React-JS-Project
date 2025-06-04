import { useState, useRef } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const ProductUpload = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [category, setCategory] = useState(""); 

  const handleUpload = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("auth-token");
  
    if (!image || !productName || !price || !discount || !category) {
      alert("Please fill out all fields!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", image); // File field matches multer's 'file'
    formData.append("product_name", productName);
    formData.append("product_price", price);
    formData.append("discount", discount);
    formData.append("category", category); 
  
    try {
      setIsLoading(true); 
      const productAddApi = `${import.meta.env.VITE_ADD_PRODUCT_API}`;
      const response = await axios.post(productAddApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": token,
        },
      });
  
      alert("Product uploaded successfully!");
      console.log("Response:", response.data);
      setImage(null);
      setCategory(""); 
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setProductName("");
      setPrice("");
      setDiscount("");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };  

  return (
    <>
      <Header />
      <main className="h-screen flex items-center justify-center">
        <div
          className="w-5/6 mx-auto p-6 mt-4 bg-white shadow-lg rounded-lg justify-center items-center mb-6"
          style={{ border: "1px solid rgba(0,0,0,0.2)" }}
        >
          <h1 className="text-2xl font-semibold font-snas text-gray-900 mb-4">
            Upload Product
          </h1>
          <form onSubmit={handleUpload} className="space-y-4 h-auto">
            <div>
              <label
                htmlFor="product_name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="product_name"
                placeholder="Enter product name"
                value={productName}
                name="product_name"
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 block py-3 w-full rounded-md border-gray-300 outline-none shadow-sm focus:outline-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="product_price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="product_price"
                placeholder="Enter price"
                name="product_price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block py-3 w-full rounded-md border-gray-300 outline-none shadow-sm focus:outline-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                placeholder="Enter discount"
                value={discount}
                name="discount"
                onChange={(e) => setDiscount(e.target.value)}
                className="mt-1 block py-3 w-full rounded-md border-gray-300 outline-none shadow-sm focus:outline-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block py-3 w-full rounded-md border-gray-300 outline-none shadow-sm focus:outline-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Select a category">Select a category</option>
                <option value="Dress Shirt">Dress Shirt</option>
                <option value="Casual Shirt">Casual Shirt</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Product Image
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                name="file"
                ref={fileInputRef}
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                ) : (
                  "Upload Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductUpload;
