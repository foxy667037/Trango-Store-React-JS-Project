import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const [VerifyCodeFormData, setVerifyCodeFormData] = useState({
    code: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const verifycode = `${import.meta.env.VITE_VERIFY_CODE_API}`;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerifyCodeFormData((prevState) => ({ ...prevState, [name]: value }));
    setError(null);
    setMessage(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!VerifyCodeFormData.code.trim()) {
      setError("Code field cannot be empty.");
      setMessage(null);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(verifycode, {
        method: "POST",
        body: JSON.stringify(VerifyCodeFormData),
        headers: {
          "Content-Type": "application/json",
          "code-token": localStorage.getItem("code-token"),
        },
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        setMessage(result.message || "Verify Code Successfully...");
        setError(null);
        setTimeout(() => {
          navigate("/new-password");
        }, 2000);
      } else {
        const errorMessage =
          result.errors?.[0]?.msg || "An unexpected error occurred.";
        setError(errorMessage);
        setMessage(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
      setMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <section className="p-[1px] bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm shadow-2xl transition-all max-sm:w-11/12">
        <div className="bg-white p-6 sm:w-96 w-full rounded-sm">
          <h2 className="text-3xl mb-7 font-sans font-semibold tracking-tighter text-center relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
            Verify Code
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-[30%] h-[2px] bg-gradient-to-r from-blue-300 to-red-300"></div>
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
                type="number"
                name="code"
                onChange={handleChange}
                placeholder="e.g 123456"
                value={VerifyCodeFormData.code}
                className="w-full focus:outline-none font-sans border-none p-2 rounded-sm text-sm text-blue-400 focus:placeholder:text-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-1 hover:gap-2 py-3 rounded-sm border font-semibold transition-all max-sm:text-sm sm:py-2 ${
                isLoading
                  ? "bg-gray-950 text-white cursor-not-allowed"
                  : "bg-blue-100 text-blue-500 border-blue-500 hover:bg-blue-200"
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
              ) : (
                "Verify Code"
              )}
              {!isLoading && <LuArrowRight />}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default VerifyCode;
