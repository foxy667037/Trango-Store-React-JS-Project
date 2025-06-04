import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import Loader from "../../components/loader/loader.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";

const TermsOfUse = () => {
  const [loading, setLoading] = useState(true);

  // Loader
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
          {/* Introduction */}
          <section className="mb-4 border-l-4 border-blue-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-blue-500">
              Introduction
            </h2>
            <p className="text-sm sm:text-base text-left">
              Welcome to our website. By accessing or using this website, you
              agree to be bound by these Terms of Use. Please read them
              carefully before proceeding.
            </p>
          </section>

          {/* Use of Website */}
          <section className="mb-4 border-l-4 border-purple-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-purple-500">
              Use of Website
            </h2>
            <p className="text-sm sm:text-base text-left">
              You agree to use the website only for lawful purposes and in a
              manner that does not infringe the rights of, restrict, or inhibit
              anyone else’s use and enjoyment of the website. Prohibited
              behavior includes, but is not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 marker:text-purple-500 text-sm sm:text-base text-left">
              <li>Harassing or causing distress to others.</li>
              <li>Disrupting the normal flow of dialogue within the website.</li>
              <li>Transmitting obscene or offensive content.</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-4 border-l-4 border-green-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-green-500">
              Intellectual Property
            </h2>
            <p className="text-sm sm:text-base text-left">
              All content on this website, including text, graphics, logos,
              icons, and images, is the property of [Your Company Name] or its
              content suppliers. Unauthorized use of any material is strictly
              prohibited.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-4 border-l-4 border-red-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-red-500">
              Limitation of Liability
            </h2>
            <p className="text-sm sm:text-base text-left">
              We shall not be held liable for any direct, indirect, incidental,
              or consequential damages resulting from the use of this website or
              the inability to use this website.
            </p>
          </section>

          {/* Links to Other Websites */}
          <section className="mb-4 border-l-4 border-yellow-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-yellow-500">
              Links to Other Websites
            </h2>
            <p className="text-sm sm:text-base text-left">
              This website may contain links to third-party websites. We are not
              responsible for the content, accuracy, or opinions expressed on
              such websites. Use these links at your own discretion.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-4 border-l-4 border-orange-500 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-orange-500">
              Changes to Terms
            </h2>
            <p className="text-sm sm:text-base text-left">
              We reserve the right to update or change these Terms of Use at any
              time. Continued use of the website after any changes constitutes
              acceptance of those changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-l-4 border-rose-700 pl-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-rose-700">
              Contact Information
            </h2>
            <p className="text-sm sm:text-base text-left">
              If you have any questions or concerns about these Terms of Use,
              please contact us:
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

export default TermsOfUse;