import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [SignUpFormData, setSignUpFormData] = useState({
    first_name: "",
    second_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const signUpApi = `${import.meta.env.VITE_FORM_SUBMIT_API}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData({ ...SignUpFormData, [name]: value });
  };

  const navigate = useNavigate();

  const handlebacktologin = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when the form is being submitted

    const signUpFormData = { ...SignUpFormData };
    try {
      const response = await fetch(signUpApi, {
        method: "POST",
        body: JSON.stringify(signUpFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.errors) {
        setError(result.errors[0].msg);
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setSignUpFormData({
          first_name: "",
          second_name: "",
          username: "",
          email: "",
          password: "",
        });
        setError("");
        alert("A verification link has been sent to your email.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state when the submission is complete (success or failure)
    }
  };

  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <section className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm shadow-2xl transition-all max-sm:w-11/12">
        <div className="bg-white p-6 sm:w-96 w-full rounded-sm">
          <h2 className="text-3xl mb-7 font-sans font-semibold tracking-tighter text-center relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
            Sign Up
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-[24%] h-[2px] bg-gradient-to-r from-blue-300 to-red-300"></div>
          </h2>

          {error && (
            <div className="text-red-500 bg-red-200 p-3 border border-red-500 rounded-sm mb-4">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm">
              <input
                type="text"
                name="first_name"
                onChange={handleChange}
                placeholder="e.g Muhammad"
                value={SignUpFormData.first_name}
                className="w-full focus:outline-none font-sans border-none p-2 rounded-sm text-sm text-blue-400 focus:placeholder:text-blue-400"
              />
            </div>
            <div className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm">
              <input
                type="text"
                name="second_name"
                onChange={handleChange}
                placeholder="e.g Ali"
                value={SignUpFormData.second_name}
                className="w-full focus:outline-none font-sans border-none p-2 rounded-sm text-sm text-blue-400 focus:placeholder:text-blue-400"
              />
            </div>
            <div className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="e.g username@123"
                value={SignUpFormData.username}
                className="w-full focus:outline-none font-sans border-none p-2 rounded-sm text-sm text-blue-400 focus:placeholder:text-blue-400"
              />
            </div>
            <div className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="e.g example@gmail.com"
                value={SignUpFormData.email}
                className="w-full focus:outline-none font-sans border-none p-2 rounded-sm text-sm text-blue-400 focus:placeholder:text-blue-400"
              />
            </div>
            <div className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="e.g Password@123"
                value={SignUpFormData.password}
                className="w-full focus:outline-none font-sans border-none p-2 rounded-sm text-sm text-blue-400 focus:placeholder:text-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-1 hover:gap-2 bg-blue-100 text-blue-500 py-3 rounded-sm border border-blue-500 hover:bg-blue-200 font-semibold transition-all max-sm:text-sm sm:py-2"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div> // Tailwind loading spinner
              ) : (
                <>
                  Create Account <LuArrowRight />
                </>
              )}
            </button>

            <div className="my-4 w-3/4 mx-auto h-[1px] bg-gradient-to-r from-blue-400 to-red-400"></div>

            <button
              type="button"
              onClick={handlebacktologin}
              className="w-full flex justify-center items-center gap-1 hover:gap-2 bg-green-100 text-green-500 py-3 rounded-sm border border-green-500 hover:bg-green-200 font-semibold transition-all mt-4 max-sm:text-sm sm:py-2"
            >
              <LuArrowLeft /> Back to login
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignUpForm;
