import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div className="relative p-2 grid grid-rows-[max-content_5fr]  grid-cols-1 gap-2">
      <Navbar />
      <div className="px-2 py-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
