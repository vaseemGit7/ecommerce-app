import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSearchQuery } from "../actions/filterActions";
import { useRef } from "react";
import { logOut } from "../actions/userActions";
import { IonIcon } from "@ionic/react";
import {
  bagOutline,
  exitOutline,
  personOutline,
  searchOutline,
} from "ionicons/icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef("");

  const handleSeachQuery = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchQuery(searchRef.current.value));
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
    alert("Logged out");
  };

  return (
    <div className="grid grid-cols-3 justify-between items-center px-4 py-3 bg-neutral-50 drop-shadow rounded-lg">
      <div className="flex items-center gap-3 justify-self-start">
        <NavLink
          to="/dashboard/menu"
          state={{ categoryCode: "men_all" }}
          className=" text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
        >
          <p>Men</p>
        </NavLink>
        <NavLink
          to="/dashboard/menu"
          state={{ categoryCode: "ladies_all" }}
          className=" text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
        >
          <p>Women</p>
        </NavLink>
        <NavLink
          to="/dashboard/menu"
          state={{ categoryCode: "kids_newbornbaby_viewall" }}
          className=" text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
        >
          <p>Baby</p>
        </NavLink>
        <NavLink
          to="/dashboard/menu"
          state={{ categoryCode: "kids_all" }}
          className=" text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
        >
          <p>Kids</p>
        </NavLink>
      </div>
      <NavLink to="/dashboard/home" className="place-self-center">
        <img className="h-9" src="../src/assets/logo.svg" />
      </NavLink>
      <div className="flex gap-4 justify-self-end">
        <div className="relative">
          <input
            ref={searchRef}
            className="py-1 px-2 rounded-md bg-neutral-100 outline-neutral-400 hover:outline-2 focus:outline-2"
            type="text"
            placeholder="Search..."
            onKeyDown={handleSeachQuery}
          ></input>
          <IonIcon
            icon={searchOutline}
            className="absolute right-1 top-1 text-2xl"
          ></IonIcon>
        </div>
        <div className="flex gap-2">
          <NavLink
            to="/dashboard/cart"
            className="flex items-center text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
          >
            <IonIcon icon={bagOutline} className="text-xl"></IonIcon>
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className="flex items-center text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
          >
            <IonIcon icon={personOutline} className="text-xl"></IonIcon>
          </NavLink>
          <NavLink
            to="/"
            className="flex items-center text-neutral-900 font-medium text-lg hover:border-b-2 border-neutral-600  cursor-pointer"
          >
            <IonIcon
              icon={exitOutline}
              className="text-xl"
              onClick={handleLogOut}
            ></IonIcon>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
