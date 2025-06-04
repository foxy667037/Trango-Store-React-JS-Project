import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const [ResetPasswordFormData, setResetPasswordFormData] = useState({
    email: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const resetpasswordApi = `${import.meta.env.VITE_RESET_PASSWORD_API}`;
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is being submitted

    try {
      const response = await fetch(resetpasswordApi, {
        method: "POST",
        body: JSON.stringify(ResetPasswordFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.token) {
        localStorage.setItem("code-token", result.token);

        setTimeout(() => {
          localStorage.removeItem("code-token");
        }, 600000);

        setMessage("Reset Link Send Successfully...");
        setError(null);

        setTimeout(() => {
          navigate("/verify-code");
        }, 2000);
      } else if (result.errors) {
        setError(result.errors[0]?.msg || "An error occurred.");
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
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <section className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm shadow-2xl transition-all max-sm:w-11/12">
        <div className="bg-white p-6 sm:w-96 w-full rounded-sm">
          <h2 className="text-3xl mb-7 font-sans font-semibold tracking-tighter text-center relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
            Forgot Password
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-[50%] h-[2px] bg-gradient-to-r from-blue-300 to-red-300"></div>
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
                name="email"
                onChange={handleChange}
                placeholder="e.g example@gmail.com"
                value={ResetPasswordFormData.email}
                className="w-full focus:outline-none font-sans border-none p-2 rounded-sm text-sm text-blue-400 focus:placeholder:text-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-1 hover:gap-2 bg-blue-100 text-blue-500 py-3 rounded-sm border border-blue-500 hover:bg-blue-200 font-semibold transition-all max-sm:text-sm sm:py-2"
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div> // Tailwind loading spinner
              ) : (
                <>
                  Send OTP <LuArrowRight />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordForm;
