import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TbTrash } from "react-icons/tb";

const ListPage = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/product/list`
      );

      if (response.data.success) {
        setList(response.data.products);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const removeProduct = async (id) => {
    try {
       const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/product/remove/${id}`)
       console.log(response);
       if(response?.data?.success) {
           toast.success(response.data.message);
          await fetchList();
       } else {
           toast.error(response.data.message);
       }
    } catch (error) {
       console.log(error);
       toast.error("Something went wrong");
    }
 }

  useEffect(() => {
    fetchList();
  }, []);


  



  return (
    <div className="min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Product List
        </h1>
        <div className=" overflow-hidden">
          <div className="grid grid-cols-5 gap-4 bg-gray-100 text-gray-600 font-semibold text-sm px-6 py-3">
            <div>Image</div>
            <div>Name</div>
            <div>Category</div>
            <div>Price</div>
            <div className="text-center">Actions</div>
          </div>
          <div className="divide-y divide-gray-200">
            {list.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-5 items-center gap-4 px-6 py-4"
              >
                <img
                  src={item.image[0]}
                  alt="Product"
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div className="text-gray-800 font-medium">{item.name}</div>
                <div className="text-gray-500">{item.category}</div>
                <div className="text-green-600 font-semibold">
                  ${item.price.toFixed(2)}
                </div>
                <div className="flex justify-center">
                  <button
                    className="p-2 hover:bg-red-100 rounded-full"
                   
                    onClick={() => removeProduct(item._id)}
                  >
                    <TbTrash className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
