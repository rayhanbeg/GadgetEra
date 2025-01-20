import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Dashboard from "./admin/Dashboard";
import Order from "./admin/pages/Order";
import MainLayout from "./mainLayout/MainLayout";
import AddItem from "./admin/pages/AddItem";
import ListPage from "./admin/pages/ListPage";
import Orders from "./pages/Orders";
import AdminProtectedRoute from "./protectedRoutes/AdminProtectedRoute";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";

function App() {
  return (
    <>
      <main className="overflow-hidden text-tertiary">
        <Toaster />
        <Routes>
          {/* User routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="Shop" element={<Shop />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<ProtectedRoute>
              <Cart />
            </ProtectedRoute>} />
            <Route path="place-order" element={<ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute>
              <Orders />
            </ProtectedRoute>} />
          </Route>
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          {/* Admin routes */}
          <Route path="/dashboard" element={
            <AdminProtectedRoute>
              <Dashboard/>
            </AdminProtectedRoute>
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
