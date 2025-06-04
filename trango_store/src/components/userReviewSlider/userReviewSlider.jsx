import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { BsArrowRightShort } from "react-icons/bs";

const Carousel = () => {
  const slides = [
    {
      name: "Muhammad ALi",
      review:
        "I recently bought this casual shirt, and I couldn’t be happier with it. The price was great, especially for the quality. It’s super comfortable, and the fabric feels premium. I’ve worn it a few times already, and it’s quickly become one of my favorites.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      name: "Aiza Malik",
      review:
        "I bought a casual shirt for my husband, and I’m so happy with it! The price was really reasonable, and the shirt is incredibly comfortable. The material feels top-notch, and the quality is excellent. It’s definitely a great deal for the price. My husband loves it!",
      image:
        "data:image/jpeg;base64,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",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay]} 
      spaceBetween={30}
      slidesPerView={1}
      loop={true} 
      autoplay={{
        delay: 3000, // Delay in milliseconds between slide transitions
        disableOnInteraction: false, 
      }}
      className="w-full max-w-3xl mx-auto"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col max-sm:text-center sm:flex-row items-center sm:items-start border bg-gradient-to-br from-gray-100 via-white to-gray-50 border-gray-300 p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Profile Picture */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shadow-md flex-shrink-0">
              <img
                src={slide.image}
                alt={`${slide.name} Profile`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Text Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {slide.name}
              </h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {slide.review}
              </p>
              <a
                href="#"
                className="mt-4 max-sm:flex max-sm:justify-center max-sm:items-center flex gap-1 hover:gap-2 transition-all items-center text-gray-800 hover:text-gray-900 font-medium text-sm"
              >
                View & Reply <BsArrowRightShort className="text-xl" />
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;