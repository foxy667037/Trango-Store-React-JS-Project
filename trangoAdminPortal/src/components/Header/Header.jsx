import { useEffect, useState } from "react";
import { gsap } from "gsap";
import "boxicons";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./Header.css"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(".text");

    elements.forEach((element) => {
      const innerText = element.innerText;
      element.setAttribute("data-original", innerText);
      element.innerHTML = "";

      const textContainerBlack = document.createElement("div");
      textContainerBlack.classList.add("block");

      const textContainerOrange = document.createElement("div");
      textContainerOrange.classList.add("block", "orange");

      for (const letter of innerText) {
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
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    gsap.to(".menu-overlay", {
      x: isOpen ? "-100%" : 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="bg-white p-4 flex justify-between items-center sticky top-0 z-50 transition-shadow duration-300 ease-in-out">
        <nav
          aria-label="Primary navigation"
          className="flex justify-between items-center w-full"
        >
          <div className="hidden max-[900px]:block">
            <div
              className={`hamburger w-8 h-6 flex flex-col justify-between cursor-pointer relative ${isOpen ? "active" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span className="block h-[1px] bg-black transition-all rounded-sm"></span>
              <span className="block h-[1px] bg-black transition-all rounded-sm"></span>
              <span className="block h-[1px] bg-black transition-all rounded-sm"></span>
            </div>
          </div>
          <div>
            <Link
              to="/"
              aria-label="Shirt Store Homepage"
              className="flex border relative border-t-1 text-[rgba(0,0,0,0.8)] border-b-1 px-1 pb-3 text-xl font-bold non-italic logoText max-lg:text-base max-lg:pb-[0.6rem]"
              style={{
                borderImage:
                  "linear-gradient(to right, rgba(0,0,0,0.8) 60% 30%, transparent 0%) 100% 1",
              }}
            >
              Trango
              <span className="absolute top-0 -left-[1px] bottom-0 w-[1px] bg-black text-[rgba(0,0,0,0.8)] font-medium non-italic text-base logoTextSpan max-lg:text-sm"></span>
              <span className="absolute -bottom-[10px] -right-[38px] text-sm text-[rgba(0,0,0,0.85)] font-bold non-italic logoTextSpan max-lg:text-xs max-lg:-right-[34px] max-lg:-bottom-[8px]">
                Garments
              </span>
            </Link>
          </div>
          <ul className="flex gap-9 text-lg cursor-pointer justify-center items-center p-1 text-zinc-900 font-semibold non-italic tracking-wide links max-lg:text-base max-[900px]:hidden">
            <li>
              <Link to="/" aria-label="Home" className="overflow-hidden text">
                Home
              </Link>
            </li>
            <li>
              <Link to="/user-detail" aria-label="Setting" className="overflow-hidden text">
                Setting
              </Link>
            </li>
            <li>
              <a href="https://trango.vercel.app" aria-label="Shop" className="overflow-hidden text">
                Shop
              </a>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 flex items-center gap-2"
          >
            <FaSignOutAlt className="text-lg" /> Logout
          </button>
        </nav>
      </header>

      {/* Menu Overlay */}
      <div
        className={`menu-overlay fixed top-0 left-0 w-full h-full bg-white p-8 z-50 -translate-x-full transition-transform ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <button
          className="close-btn absolute top-6 right-6 w-8 h-8 flex justify-center items-center cursor-pointer"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <span className="absolute w-full h-[2px] bg-black transition-all"></span>
          <span className="absolute w-full h-[2px] bg-black transition-all"></span>
        </button>
        <div className="w-full border-b relative top-8"></div>
        <h2 className="menu-heading mt-8">Menu</h2>
        <ul className="menu-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user-detail">Setting</Link>
          </li>
          <li>
            <a href="trango.vercel.app">Shop</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;