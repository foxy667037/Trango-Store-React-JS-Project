import "./footer.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="footer mt-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-10 px-5 w-full flex flex-wrap justify-between items-start gap-8">
        {/* Shop Section */}
        <div className="footer-section flex-1 min-w-[200px]">
          <h3 className="text-white font-bold text-xl mb-4">Shop</h3>
          <ul className="list-none space-y-3">
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/products/Men-Dress-Shirt"
              >
                Men's Dress-Shirts
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/products/Men-Casual-Shirt"
              >
                Men's Casual-Shirts
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/products/Kid-Casual-Shirt"
              >
                Kids Casual-Shirts
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/products/Kid-Dress-Shirt"
              >
                Kids Dress-Shirts
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/"
              >
                New Arrivals
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="footer-section flex-1 min-w-[200px]">
          <h3 className="text-white font-bold text-xl mb-4">
            Customer Service
          </h3>
          <ul className="list-none space-y-3">
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/contact_us"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/faq"
              >
                Shipping & Delivery
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/faq"
              >
                Returns & Exchanges
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/faq"
              >
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-100 text-sm hover:text-white transition relative group"
                to="/faq"
              >
                Size Guide
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect With Us Section */}
        <div className="footer-section flex-1 min-w-[200px]">
          <h3 className="text-white font-bold text-xl mb-4">Connect with Us</h3>
          <ul className="list-none space-y-3">
            <li>
              <a
                className="text-blue-100 text-sm hover:text-white transition relative group"
                href="#"
              >
                Facebook
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                className="text-blue-100 text-sm hover:text-white transition relative group"
                href="#"
              >
                Instagram
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                className="text-blue-100 text-sm hover:text-white transition relative group"
                href="#"
              >
                Twitter
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                className="text-blue-100 text-sm hover:text-white transition relative group"
                href="#"
              >
                Pinterest
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-100 transition-all duration-500 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section flex-1 min-w-[200px]">
          <h3 className="text-white font-bold text-xl mb-4">Contact</h3>
          <p className="text-blue-100 text-sm mb-4">
            Pace Center Main Bulavord Road, Lahore, Pakistan 54000
          </p>
          <div className="flex gap-4 mb-4">
            {/* Social Media Icons with hover animation */}
            <a
              href="mailto:mf667037@gmail.com"
              className="text-blue-100 text-2xl hover:text-white transition transform hover:scale-110"
            >
              <FaEnvelope />
            </a>
            <a
              href="#"
              className="text-blue-100 text-2xl hover:text-white transition transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-blue-100 text-2xl hover:text-white transition transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-blue-100 text-2xl hover:text-white transition transform hover:scale-110"
            >
              <FaWhatsapp />
            </a>
          </div>
          <a
            href="mailto:mf667037@gmail.com"
            className="inline-block border border-blue-600 bg-blue-700 text-white py-2 px-5 rounded-md text-sm font-semibold hover:bg-blue-500 transition"
          >
            Email Us
          </a>
        </div>
      </footer>

      {/* Footer Bottom */}
      <div className="footer-bottom max-md:flex-col max-md:gap-4 flex justify-between px-4 bg-white text-center py-4 text-sm font-medium border-t">
        <p className="text-gray-700">
          &copy; 2024 Trango Garments. All Rights Reserved.{" "}
          <Link to="/privacy-policy" className="text-blue-700 hover:underline">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/term-of-use" className="text-blue-700 hover:underline">
            Terms of Use
          </Link>
        </p>
        <p className="text-gray-700 font-semibold">
          Created By:{" "}
          <span className="text-red-600 font-bold">
            Ahmad Software Solution
          </span>
        </p>
      </div>
    </>
  );
};

export default Footer;
