import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import Loader from "../../components/loader/loader.jsx";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PrivacyPolicy = () => {
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
        <Loader />
      ) : (
        <main data-aos="fade-up" className="container mx-auto px-4 py-8">
          <section className="mb-4 border-l-4 border-blue-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-blue-500">
              1. Information We Collect
            </h2>
            <p className="mb-2 font-medium text-sm sm:text-base text-left">
              We may collect personal and non-personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-1 marker:text-blue-500 text-sm sm:text-base text-left">
              <li>
                <span className="font-semibold text-blue-500">
                  Personal Information:
                </span>{" "}
                Name, email address, phone number, shipping address, payment
                details.
              </li>
              <li>
                <span className="font-semibold text-blue-500">
                  Non-Personal Information:
                </span>{" "}
                Browser type, IP address, operating system, and website usage
                data.
              </li>
            </ul>
          </section>

          <section className="mb-4 border-l-4 border-purple-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-purple-500">
              2. How We Use Your Information
            </h2>
            <p className="mb-2 font-medium text-sm sm:text-base text-left">
              Your information is used to:
            </p>
            <ul className="list-disc list-inside space-y-1 marker:text-purple-500 text-sm sm:text-base text-left">
              <li>Process and deliver your orders.</li>
              <li>Provide customer support.</li>
              <li>Send updates, promotional offers, and newsletters.</li>
              <li>Improve our services and website experience.</li>
            </ul>
          </section>

          <section className="mb-4 border-l-4 border-green-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-green-500">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="text-sm sm:text-base text-left">
              We use cookies to enhance your browsing experience by tracking
              preferences, analytics, and displaying relevant ads. You can
              manage cookies through your browser settings.
            </p>
          </section>

          <section className="mb-4 border-l-4 border-red-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-red-500">
              4. Sharing of Information
            </h2>
            <p className="mb-2 font-medium text-sm sm:text-base text-left">
              We do not sell your personal information. However, we may share it
              with:
            </p>
            <ul className="list-disc list-inside space-y-1 marker:text-red-500 text-sm sm:text-base text-left">
              <li>
                <span className="font-semibold text-red-500">
                  Service Providers:
                </span>{" "}
                Payment processors, shipping companies, and email platforms.
              </li>
              <li>
                <span className="font-semibold text-red-500">
                  Legal Authorities:
                </span>{" "}
                When required by law.
              </li>
              <li>
                <span className="font-semibold text-red-500">
                  Business Transfers:
                </span>{" "}
                In case of mergers or acquisitions.
              </li>
            </ul>
          </section>

          <section className="mb-4 border-l-4 border-yellow-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-yellow-500">
              5. Your Rights
            </h2>
            <p className="text-sm sm:text-base text-left">
              You have the right to access, correct, or delete your information.
              To exercise your rights, contact us at{" "}
              <span className="text-yellow-600 underline">
                example@gmail.com
              </span>
              .
            </p>
          </section>

          <section className="mb-4 border-l-4 border-orange-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-orange-500">
              6. Changes to This Policy
            </h2>
            <p className="text-sm sm:text-base text-left">
              We may update this policy periodically. Any changes will be posted
              here with an updated effective date.
            </p>
          </section>

          <section className="border-l-4 border-rose-700 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-rose-700">
              Contact Us
            </h2>
            <p className="mb-2 font-medium text-sm sm:text-base text-left">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <ul className="list-disc list-inside space-y-1 marker:text-rose-700 text-sm sm:text-base text-left">
              <li>
                <span className="font-semibold text-rose-700">Email:</span>{" "}
                example@gmail.com
              </li>
              <li>
                <span className="font-semibold text-rose-700">Phone:</span> +00
                123-4567-890
              </li>
              <li>
                <span className="font-semibold text-rose-700">Address:</span>{" "}
                Pakistan
              </li>
            </ul>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default PrivacyPolicy;