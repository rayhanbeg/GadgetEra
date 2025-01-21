import { Link } from 'react-router-dom';
import banner1 from '../assets/ban1.jpg';
import banner2 from '../assets/ban2.jpg';

const Banner = () => {
    return (
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                {/* Left Banner */}
                <div className="relative rounded-lg overflow-hidden">
                    <img src={banner1} alt="Banner 1" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 space-y-6 bg-black bg-opacity-50">
                        <h2 className="text-3xl sm:text-4xl font-bold text-center">Electronics Sale</h2>
                        <p className="text-base sm:text-xl text-center text-white">Up to 50% off on selected items</p>
                        <Link to={"/shop"} className="px-8 py-3 bg-blue-600 text-white rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-blue-700">Shop Now</Link>
                    </div>
                </div>

                {/* Right Banner */}
                <div className="relative rounded-lg overflow-hidden">
                    <img src={banner2} alt="Banner 2" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 space-y-6 bg-black bg-opacity-50">
                        <h2 className="text-3xl sm:text-4xl font-bold text-center">New Arrivals</h2>
                        <p className="text-base sm:text-xl text-center text-white">Fresh electronics, just for you</p>
                        <Link to={"/shop"} className="px-8 py-3 bg-blue-600 text-white rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-blue-700">Shop Now</Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Banner;
