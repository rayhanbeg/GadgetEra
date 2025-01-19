import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Blog from "./pages/Blog";
import Product from "./pages/Product";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Dashboard from "./admin/Dashboard";
import Order from "./admin/pages/Order";
import MainLayout from "./MainLayout/MainLayout";
import AddItem from "./admin/pages/AddItem";
import ListPage from "./admin/pages/ListPage";
import ProtectedRoute from "./admin/ProtectedRoute";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <main className="overflow-hidden text-tertiary">
        <ToastContainer />
        <Routes>
          {/* User routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="collection" element={<Collection />} />
            <Route path="blog" element={<Blog />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          {/* Admin routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }>
            <Route path="order" element={<Order />} />
            <Route path="add-item" element={<AddItem />} />
            <Route path="list" element={<ListPage />} />
            
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
