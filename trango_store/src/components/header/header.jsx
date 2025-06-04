import { useEffect, useState } from "react";
import { gsap } from "gsap";
import "boxicons";
import { CiShoppingCart } from "react-icons/ci";
import "./header.css";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import useCartState from "../../context/Cart/useCartState"; 

const Header = () => {
  const { cart } = useCartState(); // Get cart from context
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      gsap.to(".menu-overlay", {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(".menu-overlay", {
        x: "-100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".text");
    elements.forEach((element) => {
      let innerText = element.innerText;
      element.setAttribute("data-original", innerText);
      element.innerHTML = "";

      const textContainerBlack = document.createElement("div");
      textContainerBlack.classList.add("block");

      const textContainerOrange = document.createElement("div");
      textContainerOrange.classList.add("block", "orange");

      for (let letter of innerText) {
        const spanBlack = document.createElement("span");
        spanBlack.innerText = letter.trim() === "" ? "\xa0" : letter;
        spanBlack.classList.add("letter");

        const spanOrange = document.createElement("span");
        spanOrange.innerText = letter.trim() === "" ? "\xa0" : letter;
        spanOrange.classList.add("letter");

        textContainerBlack.appendChild(spanBlack);
        textContainerOrange.appendChild(spanOrange);
      }

      element.appendChild(textContainerBlack);
      element.appendChild(textContainerOrange);
    });

    return () => {
      elements.forEach((element) => {
        element.innerHTML = element.getAttribute("data-original");
      });
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");
    const handleScroll = () => {
      if (window.scrollY > 0) {
        header.classList.add("shadow-lg");
      } else {
        header.classList.remove("shadow-lg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className="bg-white p-4 flex justify-between items-center sticky top-0 z-50 transition-shadow duration-300 ease-in-out">
        <nav
          aria-label="Primary navigation"
          className="flex justify-between items-center w-full"
        >
          <div className="hidden max-[900px]:block">
            <div
              className={`hamburger ${isOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div>
            <a
              to="/"
              aria-label="Shirt Store Homepage"
              className="flex border relative border-t-1 text-[rgba(0,0,0,0.8)] border-b-1 px-1 pb-2 text-2xl font-medium font-sans non-italic logoText max-lg:text-base max-lg:pb-[0.5rem]"
              style={{
                borderImage:
                  "linear-gradient(to right, rgba(0,0,0,0.8) 60% 30%, transparent 0%) 100% 1",
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600">
                Trango
              </span>
              <span className="absolute top-0 -left-[1px] bottom-0 w-[1px] bg-black text-[rgba(0,0,0,0.8)] font-medium non-italic text-base logoTextSpan max-lg:text-sm"></span>
              <span className="absolute -bottom-[10px] -right-[38px] text-sm text-[rgba(0,0,0,0.85)] font-bold non-italic logoTextSpan max-lg:text-xs max-lg:-right-[36px] max-lg:-bottom-[8px]">
                Garments
              </span>
            </a>
          </div>
          <ul className="flex gap-9 text-lg cursor-pointer justify-center items-center p-1 text-zinc-900 font-semibold non-italic tracking-wide links max-lg:text-base max-[900px]:hidden">
            <li>
              <Link to="/" aria-label="Home" className=" overflow-hidden text">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                aria-label="Product Catalog"
                className=" overflow-hidden text"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/Casual-Shirt"
                aria-label="Casual Shirt"
                className=" overflow-hidden text"
              >
                Casual Shirts
              </Link>
            </li>
            <li>
              <Link
                to="/Dress-Shirt"
                aria-label="Dress Shirt"
                className=" overflow-hidden text"
              >
                Dress Shirts
              </Link>
            </li>
            <li>
              <Link
                to="/contact_us"
                aria-label="Contact Us"
                className=" overflow-hidden text"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                aria-label="FAQs"
                className=" overflow-hidden text"
              >
                FAQs
              </Link>
            </li>
          </ul>
          <Link to="/cart">
            <div className="flex gap-3 cart-icon-wrapper">
              <a
                href="/"
                className="flex p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all hover:scale-110 transform"
              >
                <CiShoppingCart className="text-white text-[26px] cursor-pointer" />
              </a>
              {cart.length > 0 && (
                <div className="cart-count bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1">
                  {cart.length}
                </div>
              )}
            </div>
          </Link>
        </nav>
      </header>

      {/* Menu Overlay */}
      <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>
          <span></span>
          <span></span>
        </button>
        <div className="w-full border-b relative top-8"></div>
        <h2 className="menu-heading mt-8">Menu</h2>
        <ul className="menu-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/Casual-Shirt" className="flex gap-2 items-center">
              Casual Shirts <FiArrowRight className="mt-1" />
            </Link>
          </li>
          <li>
            <Link to="/Dress-Shirt" className="flex gap-2 items-center">
              Dress Shirts <FiArrowRight className="mt-1" />
            </Link>
          </li>
          <li>
            <Link to="/contact_us">Contact Us</Link>
          </li>
          <li>
            <Link to="/faq">FAQs</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;