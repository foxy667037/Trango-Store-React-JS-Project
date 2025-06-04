import { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const BannerForm = () => {
  const [banner_title, setbanner_title] = useState("");
  const [banner_description, setbanner_description] = useState("");
  const [display_banner, setDisplayBanner] = useState(true); 
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const addorupdatebannerApi = `${
        import.meta.env.VITE_ADD_AND_UPDATE_BANNER_API
      }`;

      const token = localStorage.getItem("auth-token");

      const headers = {
        "Content-Type": "application/json",
        "auth-token": token,
      };

      const response = await axios.post(
        addorupdatebannerApi,
        { banner_title, banner_description, display_banner },
        { headers }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error updating banner. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  };

  const toggleDisplayBanner = () => {
    setDisplayBanner((prev) => !prev); 
  };

  return (
    <>
      <Header />

      <div className="max-w-xl mx-auto flex flex-col bg-white p-8 rounded-lg shadow-xl h-screen">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Manage Banner
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="banner_title"
              value={banner_title}
              onChange={(e) => setbanner_title(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter banner title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={banner_description}
              name="banner_description"
              onChange={(e) => setbanner_description(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="5"
              placeholder="Enter banner description"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">
              Display Banner: {display_banner ? "On" : "Off"}
            </label>
            <div
              className={`relative w-14 h-8 rounded-full cursor-pointer ${
                display_banner ? "bg-blue-600" : "bg-gray-400"
              }`}
              onClick={toggleDisplayBanner}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  display_banner ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-semibold rounded-md shadow-md transition-colors duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save Banner"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BannerForm;