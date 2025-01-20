import { Link } from "react-router-dom";
import headphones from "../assets/headphones.png";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="relative bg-gray-900 text-white py-10 lg:py-16">
      <div className="container mx-auto px-6 lg:px-[75px] flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Experience the <span className="text-blue-500">Best Audio</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6">
            Discover the latest in sound technology with our premium headphones.
            Designed for audiophiles, crafted for perfection.
          </p>
          <div className="flex justify-center lg:justify-start gap-3">
            <Link
              to="/shop"
              className="px-5 flex gap-2 items-center py-2.5 bg-blue-500 rounded-lg text-sm sm:text-base font-medium shadow-lg hover:bg-blue-600 transition"
            >
              Shop Now <FaArrowRightLong />
            </Link>
            <button className="px-5 py-2.5 bg-transparent border border-gray-500 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          <img
            src={headphones}
            alt="Premium Headphones"
            className="w-[80%] sm:w-[70%] lg:w-[60%] object-contain rounded-2xl shadow-lg"
          />
          {/* Background Accents */}
          <div className="absolute top-[-20px] left-[-20px] w-60 h-60 bg-blue-600/30 rounded-full blur-3xl z-[-1]"></div>
          <div className="absolute bottom-[-20px] right-[-20px] w-48 h-48 bg-purple-500/30 rounded-full blur-3xl z-[-1]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
