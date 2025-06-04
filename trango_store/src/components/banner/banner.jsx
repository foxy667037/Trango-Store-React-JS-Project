import { useState, useEffect } from "react";
import "./banner.css";

const Banner = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const bannerApi = `${import.meta.env.VITE_FETCH_BEST_BANNER_BACKEND}`
        const response = await fetch(bannerApi); 
        const data = await response.json();

        if (response.ok) {
          setBannerData(data);
        } else {
          console.error("Failed to fetch banner data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!bannerData || bannerData.display !== "Yes") {
    return null; 
  }

  return (
    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-center text-white px-5 py-4 relative">
      <span className="heading text-base font-semibold max-sm:text-sm">
       {bannerData.title}:{" "}
        <span className="text-base font-normal max-sm:text-sm">
          {bannerData.description}
        </span>{" "}
      </span>
    </div>
  );
};

export default Banner;