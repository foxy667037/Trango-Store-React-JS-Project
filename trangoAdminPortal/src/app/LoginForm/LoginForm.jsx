import { useState, useEffect } from "react";
import { LuArrowRight } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../../firebaseConfig.js";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [googleloading, setgoogleLoading] = useState(false); 

  const loginApi = `${import.meta.env.VITE_LOGIN_FORM_API}`;
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(loginApi, {
        method: "POST",
        body: JSON.stringify(loginFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.token) {
        localStorage.setItem("auth-token", result.token);
        setMessage("Login successful! Redirecting...");
        setError(null);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (result.errors) {
        setError(result.errors[0]?.msg || "An error occurred.");
        setMessage(null);
      } else if (result.message) {
        setError(result.message);
        setMessage(null);
      } else {
        setError("Unexpected error occurred.");
        setMessage(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  // handle login with google
  const handleLoginWithGoogle = async (res) => {
    try {
      setgoogleLoading(true);
      const loginWithGoogleApi = `${
        import.meta.env.VITE_LOGIN_WITH_GOOGLE_API
      }`;

      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const token = await result.user.getIdToken();

      const response = await fetch(loginWithGoogleApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const userdata = await response.json();
      // console.log("User Data: ", userdata);
      if (response.ok) {
        setMessage("Google login successful!");
        localStorage.setItem("auth-token", userdata.data.token);
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError(result.error || "Google login failed.");
      }
    } catch (error) {
      res.status(500).json({ error: error });
      console.error("Google Login Error:", error);
      setError("Failed to fetch. Please check your server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <section className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm shadow-2xl transition-all max-sm:w-11/12">
        <div className="bg-white p-6 sm:w-96 w-full rounded-sm">
          <h2 className="text-3xl mb-7 font-sans font-semibold tracking-tighter text-center relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
            Login
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-[16%] h-[2px] bg-gradient-to-r from-blue-300 to-red-300"></div>
          </h2>

          {error && (
            <div className="text-red-500 bg-red-200 p-3 border border-red-500 rounded-sm mb-4">
              {error}
            </div>
          )}

          {message && (
            <div className="text-green-500 bg-green-200 p-3 border border-green-500 rounded-sm mb-4">
              {message}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="e.g username@123"
                value={loginFormData.username}
                className="w-full focus:outline-none font-sans border-none p-2 rounded-sm text-sm text-blue-400 focus:placeholder:text-blue-400"
              />
            </div>
            <div className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="e.g Password@123"
                value={loginFormData.password}
                className="w-full focus:outline-none font-sans border-none p-2 rounded-sm text-sm text-blue-400 focus:placeholder:text-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-1 hover:gap-2 bg-blue-100 text-blue-500 py-3 rounded-sm border border-blue-500 hover:bg-blue-200 font-semibold transition-all max-sm:text-sm sm:py-2"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <>
                  Login <LuArrowRight />
                </>
              )}
            </button>

            <div className="my-4 w-3/4 mx-auto h-[1px] bg-gradient-to-r from-blue-400 to-red-400"></div>

            <button
              type="button"
              onClick={handleLoginWithGoogle}
              disabled={googleloading}
              className="w-full flex justify-center items-center gap-2 hover:gap-3 bg-gray-950 text-white py-3 rounded-sm border  hover:bg-gray-700 font-semibold transition-all mt-4 max-sm:text-sm sm:py-2"
            >
              {googleloading ? (
               <div className="w-5 h-5 border-2 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <>
                   <FcGoogle className="text-2xl"/> Login With Google
                </>
              )}
            </button>

            <div className="flex justify-between items-center">
              <Link
                to="/sign-up"
                className="font-sans cursor-pointer text-center underline text-purple-600 font-semibold transition-all hover:text-purple-400 text-sm mt-2"
              >
                Create account?
              </Link>
              <Link
                to="/forgot-password"
                className="font-sans cursor-pointer text-center underline text-purple-600 font-semibold transition-all hover:text-purple-400 text-sm mt-2"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginForm;