import { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./dressShirts.css";
import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import ProductCardItems from "../../components/productCardItems/productCardItems";

const DressShirts = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // set input value on type
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // set select value on select options
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Function to check if the device is mobile or tablet
  const checkDeviceSize = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOrTablet(true);
      setIsSearchVisible(false);
      setIsFilterVisible(false);
    } else {
      setIsMobileOrTablet(false);
      setIsSearchVisible(true);
      setIsFilterVisible(true);
    }
  };

  // Add window resize listener to check the size dynamically
  useEffect(() => {
    checkDeviceSize(); // Check initial size
    window.addEventListener("resize", checkDeviceSize);
    return () => {
      window.removeEventListener("resize", checkDeviceSize);
    };
  }, []);
  // Open search box
  const handleSearchClick = () => {
    if (!isSearchVisible && isFilterVisible) {
      setIsFilterVisible(false);
      gsap.to(".filter-dropdown", {
        width: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        boxShadow: "none",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }

    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      gsap.to(".search-input", {
        width: "150px",
        paddingLeft: "8px",
        paddingRight: "8px",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 6px 24px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(".search-input", {
        width: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        boxShadow: "none",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  };

  // Open filter box
  const handleFilterClick = () => {
    if (!isFilterVisible && isSearchVisible) {
      setIsSearchVisible(false);
      gsap.to(".search-input", {
        width: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        boxShadow: "none",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }

    setIsFilterVisible(!isFilterVisible);
    if (!isFilterVisible) {
      gsap.to(".filter-dropdown", {
        width: "150px",
        paddingLeft: "8px",
        paddingRight: "8px",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 6px 24px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(".filter-dropdown", {
        width: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        boxShadow: "none",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <>
      <Header />
      <Banner />
      <section>
        <div className="bg-white text-black-800 px-5 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-md flex gap-2 items-center input_section">
              <span
                className="text-zinc-800 cursor-pointer font-semibold text-base"
                onClick={handleSearchClick}
              >
                Search:
              </span>
              <input
                type="text"
                value={searchQuery}
                placeholder="Product.."
                onChange={handleSearchChange}
                className="bg-white text-sm rounded-sm py-2 w-0 search-input focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-500"
                style={{
                  width: isSearchVisible && !isMobileOrTablet ? "250px" : "0px",
                  paddingLeft:
                    isSearchVisible && !isMobileOrTablet ? "8px" : "0px",
                  paddingRight:
                    isSearchVisible && !isMobileOrTablet ? "8px" : "0px",
                  boxShadow:
                    isSearchVisible && !isMobileOrTablet
                      ? "rgba(0, 0, 0, 0.1) 0px 6px 24px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px"
                      : "none",
                }}
              />
            </div>
            <div className="flex items-center w-auto ml-4 filter_section">
              <span
                className="text-zinc-800 cursor-pointer font-semibold text-base"
                onClick={handleFilterClick}
              >
                Sort:
              </span>
              <select
                id="filter"
                value={selectedFilter}
                onChange={handleFilterChange}
                className="bg-white text-black text-sm rounded-sm py-2 focus:outline-none focus:ring-2 focus:ring-gray-600 filter-dropdown ml-2 transition-all duration-500"
                style={{
                  width: isFilterVisible && !isMobileOrTablet ? "150px" : "0px",
                  paddingLeft:
                    isFilterVisible && !isMobileOrTablet ? "8px" : "0px",
                  paddingRight:
                    isFilterVisible && !isMobileOrTablet ? "8px" : "0px",
                  boxShadow:
                    isFilterVisible && !isMobileOrTablet
                      ? "rgba(0, 0, 0, 0.1) 0px 6px 24px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px"
                      : "none",
                }}
              >
                <option value="all">All</option>
                <option value="lowest">Lowest Price</option>
                <option value="highest">Highest Price</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <ProductCardItems
        searchQuery={searchQuery}
        selectedFilter={selectedFilter}
        ProductApi={import.meta.env.VITE_FETCH_ALL_DRESS_SHIRTS_BACKEND}
      />
      <Footer />
    </>
  );
};

export default DressShirts;