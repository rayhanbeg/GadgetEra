import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-auto">
        <Outlet /> {/* Renders nested child routes */}
      </div>
    </div>
  );
};

export default Dashboard;
