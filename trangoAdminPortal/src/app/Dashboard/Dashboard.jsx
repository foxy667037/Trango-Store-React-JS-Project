import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaList, FaImage } from "react-icons/fa"; // Importing icons
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useUserState from "../../context/User/useUserState";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userdata, getUserData } = useUserState();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/");
    }
    getUserData();
  }, [navigate, getUserData]);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-4 h-screen mb-10 justify-center">
        <h1 className="text-3xl flex font-bold bg-clip-text text-center text-transparent bg-gradient-to-r from-blue-500 to-purple-600 max-sm:flex-col">
          Welcome <spna className="text-lg ml-2 flex justify-center items-center">{`${userdata.first_name} ${userdata.second_name}`}</spna><span className="text-sm flex justify-center items-center text-gray-600">({userdata.username})</span>
        </h1>
        <div className="text-gray-800 font-medium text-3xl">User Actions</div>
        <div className="flex flex-col gap-4 w-3/5 ">
          <button
            onClick={() => navigate("/add-product")}
            className="py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-md hover:bg-gradient-to-l hover:from-blue-800 hover:to-blue-600 transition flex items-center justify-center w-full"
          >
            <FaPlus className="mr-2" /> Add Product
          </button>
          <button
            onClick={() => navigate("/all-products")}
            className="py-3 px-6 bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold rounded-md hover:bg-gradient-to-l hover:from-green-800 hover:to-green-600 transition flex items-center justify-center w-full"
          >
            <FaList className="mr-2" /> See All Products
          </button>
          <button
            onClick={() => navigate("/manage-banner")}
            className="py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-md hover:bg-gradient-to-l hover:from-purple-800 hover:to-purple-600 transition flex items-center justify-center w-full"
          >
            <FaImage className="mr-2" /> Add/Update Banner
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;