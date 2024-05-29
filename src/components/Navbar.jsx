import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between px-4 py-3 bg-neutral-200 drop-shadow-md rounded-lg">
      <div className="flex">
        <p className="text-xl font-semibold mr-3">AppName</p>
        <NavLink
          to="/dashboard/home"
          className=" text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
        >
          <p>Home</p>
        </NavLink>
      </div>
      <div className="flex gap-4">
        <input
          className="py-1 px-2 rounded-md bg-neutral-100 hover:drop-shadow-md focus:drop-shadow-md focus:outline-none"
          type="text"
          placeholder="Search..."
        ></input>
        <div className="flex gap-2">
          <NavLink
            to="/dashboard/cart"
            className=" text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
          >
            <p>Cart</p>
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className=" text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
          >
            <p>Profile</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
