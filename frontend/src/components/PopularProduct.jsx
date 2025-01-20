import { useContext, useEffect, useState } from "react";
import Item from "./Item";
import { ShopContext } from "../context/ShopContext";

const PopularProduct = () => {
const [popularProducts, setPopularProducts] = useState([])
const {products} = useContext(ShopContext)

useEffect(() => {
const data = products.filter(item =>item?.popular === true)
setPopularProducts(data.slice(0, 4))
}, [products])


  return (
    <section className="max-padd-container mt-12">
      <div className="">
        {/* Titile */}
        <h2 className="text-3xl">
          <span className="font-bold">Popular</span>
          <span className="underline ml-2">Products</span>
        </h2>
        <p className="mt-2">
          Discover the best deals on top-quality products, Crafted to elevate
          your everyday experience.
        </p>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {popularProducts.map((product) => (
          <div key={product._id}>
            <Item product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProduct;
