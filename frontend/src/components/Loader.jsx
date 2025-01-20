import React from "react";

const Loader = ({ message, size, color }) => {
  const spinnerSize = size ? `w-${size} h-${size}` : "w-10 h-10";
  const spinnerColor = color ? `border-${color}` : "border-blue-500";

  return (
    <div className="text-center py-4">
      {/* Spinner */}
      <div
        className={`${spinnerSize} border-4 ${spinnerColor} border-t-transparent rounded-full animate-spin mx-auto`}
      ></div>
      {/* Message */}
      {message && <p className="mt-4 text-gray-500 text-sm">{message}</p>}
    </div>
  );
};

export default Loader;
