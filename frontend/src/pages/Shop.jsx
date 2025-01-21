import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams to manipulate URL params
import Search from "../components/Search";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";
import Loader from "../components/Loader"; // Import the custom Loader

const Shop = () => {
  const { products, search } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // State for loader
  const itemPage = 10;

  const [searchParams, setSearchParams] = useSearchParams();

  // Sync filters with URL params
  useEffect(() => {
    // Get filters from search params (URL)
    const categoryParam = searchParams.getAll("category");
    const sortTypeParam = searchParams.get("sort");
    
    if (categoryParam.length) setCategory(categoryParam);
    if (sortTypeParam) setSortType(sortTypeParam);
  }, [searchParams]);

  // Update search params when filters change (this part moved to the useEffect hook)
  useEffect(() => {
    // Update URL search params based on category and sortType state
    setSearchParams((params) => {
      params.delete("category");
      category.forEach((cat) => params.append("category", cat));
      if (sortType) {
        params.set("sort", sortType);
      }
      return params;
    });
  }, [category, sortType, setSearchParams]);

  const toggleFilter = (value, setState) => {
    setState((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      return updated;
    });
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

  // Update filtered products when filters or products change
  useEffect(() => {
    setLoading(true);
    let filtered = applyFilter();
    let sorted = applySorting(filtered);
    setFilteredProducts(sorted);
    setCurrentPage(1); // Reset to the first page when filters change
    setLoading(false);
  }, [category, sortType, products, search]);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemPage;
    const endIndex = startIndex + itemPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemPage);

  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 mt-12">
      <div className="flex flex-col sm:flex-row gap-8 mb-16">
        {/* Filter Options */}
        <div className="min-w-[200px] sm:border-l sm:pl-6 bg-primary/10">
          <div className="flex items-center border-2 rounded-xl max-h-16">
            <Search />
          </div>
          <div className="mt-4 border p-4 rounded-md bg-white">
            <h5 className="text-lg font-semibold mb-3">Categories</h5>
            <div className="flex flex-col gap-2">
              {["Headphones", "Cameras", "Speakers", "Earphones", "Watches", "Mouse", "Mobile"].map((cat, index) => (
                <label key={index} className="flex gap-2 text-sm">
                  <input
                    onChange={(e) => toggleFilter(e.target.value, setCategory)}
                    type="checkbox"
                    name="category"
                    value={cat}
                    checked={category.includes(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <div className="mt-6 border p-4 rounded-md">
            <h5 className="text-lg font-semibold mb-3">Sort By</h5>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border w-full rounded px-2 py-1"
              value={sortType}
            >
              <option value="relevant">Relevant</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Display */}
        <div className="flex-1">
          {loading ? (
            <Loader message="Loading products..." size="12" color="blue-500" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getPaginatedProducts().length > 0 ? (
                getPaginatedProducts().map((product) => (
                  <Item product={product} key={product._id} />
                ))
              ) : (
                <p className="text-center col-span-full">
                  No products found matching your filters.
                </p>
              )}
            </div>
          )}

          {/* Pagination */}
          {!loading && (
            <div className="flex justify-center items-center mt-10 gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === index + 1 ? "font-semibold border-black" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
