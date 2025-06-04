import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import "./faq.css";
import Loader from "../../components/loader/loader.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [loading, setLoading] = useState(true);

  // loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease", // Easing function
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <>
      <Header />
      <Banner />
      {loading ? (
        <section>
          <Loader />
        </section>
      ) : (
        <section className="flex flex-col items-center p-6 h-auto bg-white mb-5">
          <h1 className="faq_heading text-center font-semibold text-3xl md:text-4xl text-gray-900 mt-3 mb-4">
            FAQ
          </h1>
          <p className="faq_sub_heading text-gray-600 text-center text-lg md:text-base mb-6 px-4">
            General information about our products, shipping, and policies.
          </p>

          <div data-aos="fade-up" className="w-full max-w-6xl space-y-6">
            <div className="faq-item relative border-b border-gray-300">
              <div
                className="faq-question flex justify-between items-center cursor-pointer py-3 rounded-md"
                onClick={() => toggleDropdown(0)}
              >
                <p className="faq_question text-lg max-sm:text-sm max-sm:w-5/6 font-semibold text-gray-800">
                  What sizes do you offer, and how can I choose the right one?
                </p>
                <span
                  className={`transition-transform ${
                    activeIndex === 0 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </div>
              <p
                className={`faq-answer text-gray-700 text-sm md:text-base leading-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === 0
                    ? "max-h-screen opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                We offer sizes from XS to 3XL. If you're unsure, reach out to
                our support, and we'll help you pick the best fit!
              </p>
            </div>

            <div className="faq-item relative border-b border-gray-300">
              <div
                className="faq-question flex justify-between items-center cursor-pointer py-3 rounded-md"
                onClick={() => toggleDropdown(1)}
              >
                <p className="faq_question text-lg max-sm:text-sm max-sm:w-5/6 font-semibold text-gray-800">
                  What materials do you use for your T-shirts, and are they
                  comfortable?
                </p>
                <span
                  className={`transition-transform ${
                    activeIndex === 1 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </div>
              <p
                className={`faq-answer text-gray-700 text-sm md:text-base leading-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === 1
                    ? "max-h-screen opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                Our shirts are made with 100% cotton or a cotton-poly blend,
                offering comfort, breathability, and a bit of stretch.
              </p>
            </div>

            <div className="faq-item relative border-b border-gray-300">
              <div
                className="faq-question flex justify-between items-center cursor-pointer py-3 rounded-md"
                onClick={() => toggleDropdown(2)}
              >
                <p className="faq-question text-lg max-sm:text-sm max-sm:w-5/6 font-semibold text-gray-800">
                  How does shipping work, and how long will it take to receive
                  my order?
                </p>
                <span
                  className={`transition-transform ${
                    activeIndex === 2 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </div>
              <p
                className={`faq-answer text-gray-700 text-sm md:text-base leading-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === 2
                    ? "max-h-screen opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                Shipping typically takes 5–7 days in the U.S. and 7–14 days
                internationally. You'll get a tracking number once your order
                ships.
              </p>
            </div>

            <div className="faq-item relative border-b border-gray-300">
              <div
                className="faq-question flex justify-between items-center cursor-pointer py-3 rounded-md"
                onClick={() => toggleDropdown(3)}
              >
                <p className="faq_question text-lg max-sm:text-sm max-sm:w-5/6 font-semibold text-gray-800">
                  What is your return policy, and how do I return an item?
                </p>
                <span
                  className={`transition-transform ${
                    activeIndex === 3 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </div>
              <p
                className={`faq-answer text-gray-700 text-sm md:text-base leading-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === 3
                    ? "max-h-screen opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                Our return policy allows you to return items within 30 days of
                purchase. Returns are accepted if the item is unused, unworn,
                and in its original condition with the tags attached. To
                initiate a return, follow these steps:
                <ul className="list-inside list-disc ml-4">
                  <li>
                    1. Log into your account and go to the "Orders" section.
                  </li>
                  <li>
                    2. Select the item(s) you wish to return and choose "Request
                    a Return."
                  </li>
                  <li>
                    3. Fill out the return form with the reason for the return
                    and submit it.
                  </li>
                  <li>
                    4. You'll receive an email with a prepaid shipping label.
                  </li>
                  <li>
                    5. Pack the items securely, attach the return label, and
                    send it back to us.
                  </li>
                </ul>
                Once your return is received, we will process your refund to the
                original payment method. Please note that it may take 7–10
                business days for the refund to appear in your account.
              </p>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Faq;