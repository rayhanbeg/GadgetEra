import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import Item from "../components/Item";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPage = 10;

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchProducts = async () => {
    setLoading(true);
    const url = new URL("http://localhost:5000/api/product/listProducts");
    url.searchParams.set("sort", sortType);
    
    // Update to search by both name and description
    if (search) {
      url.searchParams.set("search", search); // Assumes your backend is searching by name and description
    }

    if (category.length) {
      category.forEach((cat) => url.searchParams.append("category", cat));
    }

    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const categoryParam = searchParams.getAll("category");
    const sortTypeParam = searchParams.get("sort");
    const searchParam = searchParams.get("search");

    if (categoryParam.length) setCategory(categoryParam);
    if (sortTypeParam) setSortType(sortTypeParam);
    if (searchParam) setSearch(searchParam);
  }, [searchParams]);

  useEffect(() => {
    setSearchParams((params) => {
      params.delete("category");
      category.forEach((cat) => params.append("category", cat));
      params.set("sort", sortType);
      if (search) params.set("search", search);
      return params;
    });
  }, [category, sortType, search, setSearchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category, sortType, search]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    setSearchParams((params) => {
      // Only update search param if there is a query
      if (query.trim()) {
        params.set("search", query);
      } else {
        params.delete("search"); // Remove search param if query is empty
      }
      return params;
    });
  };

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemPage;
    return products.slice(startIndex, startIndex + itemPage);
  };

  const totalPages = Math.ceil(products.length / itemPage);

  return (
    <div className="mx-auto max-w-[1440px] lg:px-12 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
        {/* Filters Section */}
        <aside className="sm:col-span-1 space-y-6">
          {/* Search Bar - Moved to the top */}
          <div className="bg-white p-4 rounded-lg shadow">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Categories Filter */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h5 className="text-lg font-semibold mb-4">Categories</h5>
            <div className="space-y-2">
              {[
                "Headphones",
                "Cameras",
                "Speakers",
                "Earphones",
                "Watches",
                "Mouse",
                "Mobile",
              ].map((cat) => (
                <label key={cat} className="flex items-center space-x-3 text-sm">
                  <input
                    type="checkbox"
                    checked={category.includes(cat)}
                    onChange={() =>
                      setCategory((prev) =>
                        prev.includes(cat)
                          ? prev.filter((c) => c !== cat)
                          : [...prev, cat]
                      )
                    }
                    className="accent-blue-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h5 className="text-lg font-semibold mb-4">Sort By</h5>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="relevant">Relevant</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Products Section */}
        <main className="sm:col-span-3">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getPaginatedProducts().length ? (
                getPaginatedProducts().map((product) => (
                  <Item key={product._id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No products found.
                </p>
              )}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
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
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
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
        </main>
      </div>
    </div>
  );
};

export default Shop;
