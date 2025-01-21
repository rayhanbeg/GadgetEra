import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ClipLoader size={50} color="blue-600" />
    </div>
  );
};

export default Loader;
