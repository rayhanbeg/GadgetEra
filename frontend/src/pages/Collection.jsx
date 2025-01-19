import { useContext, useEffect, useState } from "react";
import Search from "../components/Search";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPage = 10;

  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }
    return filtered;
  };

  const applySorting = (productList) => {
    switch (sortType) {
      case "low":
        return productList.sort((a, b) => a.price - b.price);
      case "high":
        return productList.sort((a, b) => b.price - a.price);
      default:
        return productList;
    }
  };

  useEffect(() => {
    let filtered = applyFilter();
    let stored = applySorting(filtered);
    setFilteredProducts(stored);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [category, sortType, products, search]);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemPage;
    const endIndex = startIndex + itemPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemPage);

  return (
    <div className="max-padd-container !px-0">
      <div className="flex flex-col sm:flex-row gap-8 mb-16">
        {/* Filter option */}

        <div className="min-w-72 bg-primary p-4 mt-8 pl-4 lg:pl-4">
          <Search />
          <div className="pl-5 py-3 mt-4 bg-white rounded-xl">
            <h5 className="text-[14px] md:text-[15px] font-bold mb-4">
              Categories
            </h5>
            <div className="flex flex-col gap-2 text-sm font-light">
              {[
                "Headphones",
                "Cameras",
                "Speakers",
                "Earphones",
                "Watches",
                "Mouse",
                "Mobile",
              ].map((cat, index) => (
                <label
                  key={index}
                  className="flex gap-2 medium-14 text-gray-30"
                >
                  <input
                    onChange={(e) => toggleFilter(e.target.value, setCategory)}
                    type="checkbox"
                    name="category"
                    value={cat}
                    className="w-3"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 mt-6 bg-white rounded-xl">
            <h5 className="text-[14px] md:text-[15px]font-bold mb-4">
              Sort By
            </h5>
            <select
              name=""
              id=""
              onChange={(e) => setSortType(e.target.value)}
              className="border border-slate-900/5 outline-none text-gray-30 medium-14 h-8 w-full rounded px-2"
            >
              <option value="relevant">relevant</option>
              <option value="low">low</option>
              <option value="high">high</option>
            </select>
          </div>
        </div>
        {/* Right Side */}
        <div className="pr-5 rounded-l-xl">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
            {getPaginatedProducts().length > 0
              ? getPaginatedProducts().map((product) => (
                  <Item product={product} key={product._id} />
                ))
              : <p className="">No products found</p>}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center flex-wrap gap-4 mt-14 mb-10">
            <button disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
            className={`${currentPage === 1 && "opacity-50 cursor-not-allowed"} btn-secondary !py-1 !px-3`}
            >Previous</button>
            {Array.from({length: totalPages}, (_, index) => (
              <button key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`${currentPage === index + 1 && "!bg-tertiary text-white"}  btn-light !py-1 !px-3`}
              >
                {index + 1}
              </button>
            ) )}
            <button disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className={`${currentPage === totalPages && "opacity-50 cursor-not-allowed"} btn-secondary !py-1 !px-3`}
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
