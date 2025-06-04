import { useState, useRef, useEffect } from "react";
import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import { GrSend } from "react-icons/gr";
import { FcSmartphoneTablet } from "react-icons/fc";
import { FcVoicemail } from "react-icons/fc";
import { FcAddressBook } from "react-icons/fc";
import Loader from "../../components/loader/loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact_us = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease", 
      once: true, 
    });
  }, []);

  const FORM_SUBMIT_API = `${import.meta.env.VITE_FORM_SUBMIT_API}`;

  const [formData, setFormData] = useState({
    subject: "",
    order_number: "",
    name: "",
    email: "",
    number: "",
    description: "",
  });
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //  submit data
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true); 

    const FormData = { ...formData };

    fetch(FORM_SUBMIT_API, {
      method: "POST",
      body: JSON.stringify(FormData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submitted successfully", data);
        toast("Sent Form Successfully!");

        setFormData({
          subject: "",
          order_number: "",
          name: "",
          email: "",
          number: "",
          description: "",
        });

        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting form", error);
        setIsSubmitting(false); 
      });
  };

  return (
    <>
      <Header />
      <Banner />
      {loading ? (
        <section>
          <Loader />
        </section>
      ) : (
        <main data-aos="fade-up" className="py-4 px-6 mt-4">
          <section className="flex flex-col rounded-xl max-w-7xl gap-8 mx-auto bg-white border border-gray-300 p-6 shadow-lg">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 heading">
                Contact Us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="group flex items-center gap-2 py-2 w-auto cursor-pointer relative">
                  <span className="text-blue-500 text-3xl">
                    <FcSmartphoneTablet />
                  </span>
                  <p className="text-orange-600 font-medium contact_us_pTag">
                    +92 300-421-0514
                  </p>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 w-full"></div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-orange-600 w-0 group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="group flex items-center gap-2 py-2 w-auto cursor-pointer relative">
                  <span className="text-blue-500 text-3xl">
                    <FcVoicemail />
                  </span>
                  <p className="text-green-600 font-medium contact_us_pTag">
                    mf667037@gmail.com
                  </p>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 w-full"></div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-green-600 w-0 group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="group flex items-center gap-2 py-2 w-auto cursor-pointer relative">
                  <span className="text-blue-500 text-3xl">
                    <FcAddressBook />
                  </span>
                  <p className="text-purple-700 font-medium contact_us_pTag">
                  Pace Center Main Bulavord Road, Lahore, Pakistan 54000
                  </p>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 w-full"></div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-purple-700 w-0 group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 heading mb-3">
                Send Us a Message
              </h2>
              <form
                ref={form}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 contact_form"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <label
                      htmlFor="subject"
                      className="input_labels block text-sm font-bold text-gray-600 mb-1"
                    >
                      Subject:
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-2 py-3 text-xs text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Select Subject">Select Subject</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Shipping Details">Shipping Details</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="orderNumber"
                      className="input_labels block text-sm font-bold text-gray-600 mb-1"
                    >
                      Order Number:
                    </label>
                    <input
                      type="number"
                      id="orderNumber"
                      name="order_number"
                      placeholder="e.g 67546372"
                      value={formData.order_number}
                      onChange={handleChange}
                      className="w-full px-2 py-3 text-xs text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="input_labels block text-sm font-bold text-gray-600 mb-1"
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="e.g Muhammad Ali"
                      value={formData.name}
                      onChange={handleChange}
                      required
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
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-2 py-3 text-xs text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="input_labels block text-sm font-bold text-gray-600 mb-1"
                  >
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="number"
                    placeholder="e.g +00 1234-567-890"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    className="w-full px-2 py-3 text-xs text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="input_labels block text-sm font-bold text-gray-600 mb-1"
                  >
                    What’s on your mind?
                  </label>
                  <textarea
                    id="message"
                    name="description"
                    placeholder="e.g I am interested in your services"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-2 py-3 text-xs text-blue-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-32"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn flex justify-center items-center gap-2 w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Submit <GrSend />
                    </>
                  )}
                </button>
              </form>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{
                  fontSize: "14px", 
                }}
              />
            </div>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Contact_us;