import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; // Adjust path as per your project structure
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [currState, setCurrState] = useState("Sign In");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currState === "Sign In") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/login`,
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );

        // Dispatch the login action
        dispatch(login({ user: response.data.user, token: response.data.token }));
        toast.success("Login successful!");

        // Save token to localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to the previous location or default to home
        const from = location.state?.from || "/"; // Use the stored route or fallback to "/"
        navigate(from);
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Registration successful! Please log in.");
        setCurrState("Sign In");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          {currState === "Sign In" ? "Welcome Back!" : "Create an Account"}
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          {currState === "Sign In"
            ? "Please log in to your account"
            : "Sign up to get started"}
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {currState === "Sign Up" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            {currState}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          {currState === "Sign In" ? (
            <>
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-500 hover:underline"
                onClick={() => setCurrState("Sign Up")}
              >
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                href="#"
                className="text-blue-500 hover:underline"
                onClick={() => setCurrState("Sign In")}
              >
                Sign In
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
