import Marquee from "react-fast-marquee";

const AnimatedText = () => {
  return (
    <section>
      <Marquee gradient={false} speed={20} pauseOnHover>
        <div className="overflow-hidden bg-gray-100 py-6">
          <div className="flex justify-start items-center space-x-2">
            <div className="text-5xl max-sm:text-3xl font-extrabold text-indigo-600 flex-shrink-0">
              <span className="mx-4">
                Discover Your Style:{" "}
                <span className="text-emerald-500">Dress to Impress</span>
              </span>
              <span className="">
                or <span className="text-blue-500">Keep It Casual!</span>
              </span>
            </div>
            <div className="text-5xl max-sm:text-3xl font-extrabold text-indigo-600 flex-shrink-0">
              <span className="mx-4">
                Explore New Trends:{" "}
                <span className="text-red-500">Find Your Perfect Fit</span>
              </span>
              <span className="">
                in <span className="text-purple-500">Every Style!</span>
              </span>
            </div>
          </div>
        </div>
      </Marquee>
    </section>
  );
};

export default AnimatedText;
