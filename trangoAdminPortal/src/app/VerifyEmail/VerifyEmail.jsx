import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [statusMessage, setStatusMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      emailVerification(token); 
    } else {
      setError("Verification token is missing.");
      setIsLoading(false);
    }
  }, [location.search]);

  const emailVerification = async (token) => {
    const verifyEmail = `${import.meta.env.VITE_EMAIL_VERIFY_API}?token=${token}`;

    try {
      const response = await fetch(verifyEmail, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Verification failed.");
        setIsLoading(false);
        return;
      }

      if (data.status === "already_verified") {
        setStatusMessage("Your email is already verified.");
      } else if (data.status === "verified") {
        setStatusMessage("Your account is successfully verified.");
      }

      setIsLoading(false);

      setTimeout(() => {
        navigate("/"); // Redirect to home page
      }, 0);

    } catch (error) {
      setError("Internal Server Error: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
      <div className="text-center border-2 border-gray-300 bg-white rounded-2xl shadow-lg p-8">
        {isLoading ? (
          <div className="animate-updown mx-auto text-green-400 text-6xl">
            <BsCheckCircle className="mx-auto"/>
          </div>
        ) : error ? (
          <BsExclamationCircle className="text-red-500 text-7xl mx-auto" />
        ) : (
          <BsCheckCircle className="text-green-400 text-7xl mx-auto" />
        )}
        <h1
          className={`font-sans text-2xl font-bold mt-4 ${
            error ? "text-red-500" : "text-green-400"
          }`}
        >
          {error ? error : statusMessage || "Verifying your email..."}
        </h1>
        <p className="text-gray-700 font-sans text-lg mt-2">
          {error || statusMessage || "Verifying your email..."}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;