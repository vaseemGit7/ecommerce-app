import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSearchQuery } from "../actions/filterActions";
import { useRef } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef("");

  const handleSeachQuery = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchQuery(searchRef.current.value));
    }
  };

  return (
    <div className="flex justify-between px-4 py-3 bg-neutral-50 drop-shadow rounded-lg">
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
          ref={searchRef}
          className="py-1 px-2 rounded-md bg-neutral-100 outline-neutral-400 hover:outline-2 focus:outline-2"
          type="text"
          placeholder="Search..."
          onKeyDown={handleSeachQuery}
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
