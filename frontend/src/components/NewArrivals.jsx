import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Item from "./Item";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const NewArrivals = () => {
  const {products} = useContext(ShopContext)
  const [PopularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const data = products.slice(0, 7);
    setPopularProducts(data);
  }, [products]);

  return (
    <section className="mt-12 max-padd-container">
      {/* Title Section */}
    <Title/>

      {/* Swiper Carousel */}
      <div className="relative container mx-auto mt-4">
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1300: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay]}
          className="h-auto"
        >
          {PopularProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Item product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrivals;
