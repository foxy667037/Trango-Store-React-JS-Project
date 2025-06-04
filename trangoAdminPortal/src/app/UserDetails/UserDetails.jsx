import useUserState from "../../context/User/useUserState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const UserDetails = () => {
  const { userdata, getUserData } = useUserState();
  console.log(userdata);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    console.log(userdata.first_name);
    if (!token) {
      navigate("/");
    }

    getUserData();
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <>
      <Header />
      <main className="py-4 px-6 mb-2 mt-2">
        <section className="flex flex-col max-w-7xl gap-8 mx-auto bg-white border border-gray-300 p-6 shadow-lg">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-gray-800 heading mb-4">
              Account Details
            </h2>
            <form className="flex flex-col gap-4 contact_form">
              <div className="flex md:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="input_labels block text-sm font-bold text-gray-600 mb-1"
                  >
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="e.g 67546372"
                    readOnly
                    value={userdata.first_name}
                    className="w-full px-2 py-3 text-xs mb-2 text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <label
                    htmlFor="second_name"
                    className="input_labels block text-sm font-bold text-gray-600 mb-1"
                  >
                    Second Name:
                  </label>
                  <input
                    type="text"
                    id="second_name"
                    name="second_name"
                    placeholder="e.g 67546372"
                    readOnly
                    value={userdata.second_name}
                    className="w-full px-2 py-3 text-xs text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="input_labels block text-sm font-bold text-gray-600 mb-1"
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="e.g Muhammad Ali"
                    readOnly
                    value={userdata.username}
                    className="w-full px-2 py-3 text-xs text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="input_labels block text-sm font-bold text-gray-600 mb-1"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g example@gmail.com"
                    readOnly
                    value={userdata.email}
                    className="w-full px-2 py-3 text-xs text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="signinwith"
                  className="input_labels block text-sm font-bold text-gray-600 mb-1"
                >
                  Sign In With:
                </label>
                <input
                  type="text"
                  id="signinwith"
                  name="signinwith"
                  placeholder="e.g +00 1234-567-890"
                  readOnly
                  value={userdata.SignInWith}
                  className="w-full px-2 py-3 text-xs mb-2 text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <label
                  htmlFor="lastloginat"
                  className="input_labels block text-sm font-bold text-gray-600 mb-1"
                >
                  Last Login At:
                </label>
                <input
                  type="lastloginat"
                  id="lastloginat"
                  name="lastloginat"
                  placeholder="e.g +00 1234-567-890"
                  readOnly
                  value={userdata.login_at}
                  className="w-full px-2 py-3 text-xs text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>{" "}
              <button
                type="submit"
                className="submit-btn flex justify-center items-center gap-2 w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800 transition"
              >
                Delete Account
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default UserDetails;
